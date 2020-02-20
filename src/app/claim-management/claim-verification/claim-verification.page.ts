import { UserManagementService } from 'src/app/services/user-management.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { ClaimService } from '../../services/claim.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { LoadingController } from '@ionic/angular';
import { MobileVerificationService } from '../../services/mobile-verification.service';
import { Network } from '@ionic-native/network/ngx';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { ValidationService } from '../../services/validation.service';
import { states } from './../../models/states';

@Component({
  selector: 'app-claim-verification',
  templateUrl: './claim-verification.page.html',
  styleUrls: ['./claim-verification.page.scss'],
})
export class ClaimVerificationPage implements OnInit {

  public claimVerificationForm: FormGroup;
  public cardTitle: string;
  public ineligible: boolean;
  public unregisteredUser: boolean;
  public allowOTP = false
  public otpflag = false;
  public resendOtpFlag = true;
  public redataEntry = false;
  public otpCountdown: number;
  public deathToggle = true;
  public ECode: string;
  public passingResponse: any;
  public JWTToken: any;

  constructor(
    private validationService: ValidationService,
    private userManagement:UserManagementService,
    private router: Router,
    private dialogs: Dialogs,
    private storage: Storage,
    private claimService: ClaimService,
    private mobileVerification: MobileVerificationService,
    private network: Network,
    private loadingController: LoadingController,
    private toast: Toast
  ) {
    this.cardTitle = 'BOCW Registration No. Verification'
    this.network.onDisconnect().subscribe(() => { });
    this.network.onConnect().subscribe(() => { });
    this.claimVerificationForm = new FormGroup({
      registrationNo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), Validators.maxLength(14)]),
      mobileNo: new FormControl('', this.validationService.createValidatorsArray('mobile'))
    });

    this.storage.get('token').then((val) => {
      if (val === null) {
        this.router.navigate(['/home']);
      } else {
        this.JWTToken = val;
      }
    });
  }

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    }
  }

  clearErrors() {
    this.ineligible = false;
  }

  deadWorker() {
    this.mobileNo.enable()
  }

  verify() {
    const tokenObj = {
      registrationNo: this.claimVerificationForm.getRawValue().registrationNo,
      mobileNo: this.claimVerificationForm.getRawValue().mobileNo,
    }
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      if (this.claimVerificationForm.valid) {
        const loading = this.loadingController.create({
          message: 'Please Wait',
          duration: 500,
          spinner: "crescent"
        }).then((res) => {
          res.present();
        });
        if(this.deathToggle){
          this.claimService.checkRegistrationAndRenewalValidity(tokenObj, this.JWTToken).subscribe(
          (res: any) => {
            this.redataEntry = false;
            if (res.subscription === 'active') {
              this.passingResponse = res;
              this.allowOTP = true;
              this.cardTitle = "Registered Worker Mobile Verification"
            } else {
              this.allowOTP = false;
              this.dialogs.alert('Worker is not eligible.')
              this.ineligible = true
            }
          }, err => {
            this.unregisteredUser = true;
            this.redataEntry = true;
            this.dialogs.alert('Your BOCW Registration Number is not registered. Please enter registered Registration Number or re-enter your data by clicking on the Re-data Entry button. आपला BOCW नोंदणी क्रमांक नोंदणीकृत नाही. कृपया नोंदणीकृत नोंदणी क्रमांक प्रविष्ट करा किंवा री-डेटा एन्ट्री बटणावर क्लिक करुन आपला डेटा पुन्हा प्रविष्ट करा.');
          }
        )
        }else{
          this.userManagement.getUserById(this.registrationNo.value,this.JWTToken).subscribe((res:any)=>{
            this.passingResponse = res[0];
            this.passingResponse['deathWorker'] = !this.deathToggle;
            this.passingResponse['JWTToken'] = this.JWTToken;
            delete this.passingResponse.agePersonal
            const userObject: NavigationExtras = {
              state: this.passingResponse
            }
            this.claimVerificationForm.reset();
            this.allowOTP = false;
            this.otpflag = false;
            this.loadingController.dismiss();
            this.cardTitle = 'BOCW Registration No. Verification'
            this.router.navigate(['/claim-management/claim-main-form'], userObject);
          },err=>console.log(err))
        }
        
      } else {
        this.dialogs.alert('Registration No. is not valid')
        this.ineligible = true;
        this.unregisteredUser = true;
        this.loadingController.dismiss();
      }
    }
  }

  

  checkFcn(event) {
    this.deathToggle = !this.deathToggle;
    if(this.deathToggle){
      this.mobileNo.setValidators([Validators.required])
    }else{
      this.mobileNo.setValidators([]);
    }
    this.mobileNo.updateValueAndValidity();
  }

  redataVerification() {
    const registrationNumber: NavigationExtras = {
      state: {
        registrationNo: this.registrationNo.value
      }
    }
    this.router.navigate(['/redata-verification'], registrationNumber)
  }

  sendOTP() {
    this.resendOtpFlag = true;
    this.otpCountdown = 32
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      if (this.claimVerificationForm.valid) {
        const mobileNo = this.claimVerificationForm.get('mobileNo').value;
        const loading = this.loadingController.create({
          message: 'Please Wait',
          duration: 500,
          spinner: "crescent"
        }).then((res) => {
          res.present();
        });
        this.mobileVerification.sendClaimOTP(this.registrationNo.value, this.mobileNo.value).subscribe(
          (res: any) => {
            this.loadingController.dismiss();
            if (res.message === 'OTP Sent') {
              this.otpflag = true;
              this.unregisteredUser = false;
              this.toast.show(`OTP sent`, '2000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              setInterval(() => {
                this.otpCountdown--;
                this.resendOtpFlag = this.otpCountdown < 1 ? false : true
              }, 1000)
            }
          },
          (err: any) => {
            this.loadingController.dismiss();
            console.log(err);
            this.unregisteredUser = true;
          }
        );
      } else {
        this.dialogs.alert('Details are not valid.');
      }
    }
  }

  async validateOTP(otp) {    // fallback, if sendotp is enabled
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      const mobileNo = this.claimVerificationForm.get('mobileNo').value;
      const loading = this.loadingController.create({
        message: 'Please Wait',
        duration: 500,
        spinner: "crescent"
      }).then((res) => {
        res.present();
      });
      this.mobileVerification.validateOTP(mobileNo, otp).subscribe(
        (res: any) => {
          if (res.message === 'OTP Verified') {
            // otp verified
            this.passingResponse['JWTToken'] = this.JWTToken;
            this.passingResponse['deathWorker'] = !this.deathToggle;
            delete this.passingResponse.agePersonal
            const userObject: NavigationExtras = {
              state: this.passingResponse
            }
            this.claimVerificationForm.reset();
            this.allowOTP = false;
            this.otpflag = false;
            this.loadingController.dismiss();
            this.cardTitle = 'BOCW Registration No. Verification'
            this.router.navigate(['/claim-management/claim-main-form'], userObject);
          }
        },
        (err: any) => {
          if(err.statusText === 'Unknown Error'){
            this.loadingController.dismiss();
            this.otpCountdown = 0;
            this.dialogs.alert('Server is unreachable at the moment. Please try again.');
          }else{
          this.resendOtpFlag = false;
          this.dialogs.alert('Invalid OTP');
        }
        });
    }
  }

  get registrationNo() { return this.claimVerificationForm.get('registrationNo'); }
  get mobileNo() { return this.claimVerificationForm.get('mobileNo'); }


}

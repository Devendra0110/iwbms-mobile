import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { MobileVerificationService } from '../services/mobile-verification.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {


  public verificationForm: FormGroup;
  public unverifiedUser = false;
  public ECode: string;
  public otpflag = false;
  public resendOtpFlag=true;
  public otpCountdown:number;
  // E0 : unregistered mobile no and aadhar
  // E1 : already registered mobile no
  // E2 : already registered aadhar
  // E3 : both already registered
  // E4 : both already registered with different users
  constructor(
    private validationService: ValidationService,
    private router: Router,
    private mobileVerification: MobileVerificationService,
    private dialogs: Dialogs,
    private network: Network,
    private loadingController:LoadingController,
    private toast: Toast) {
      this.otpCountdown=32;
      this.network.onDisconnect().subscribe(() => { });
      this.network.onConnect().subscribe(() => { });
      this.verificationForm = new FormGroup({
        mobileNo: new FormControl('', this.validationService.createValidatorsArray('mobile')),
        aadharNo: new FormControl('', this.validationService.createValidatorsArray('aadharNo'))
      });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    }
  }

  get mobileNo() {
    return this.verificationForm.get('mobileNo');
  }
  get aadharNo() {
    return this.verificationForm.get('aadharNo');
  }

  resetMobileNo(){
    this.unverifiedUser=false;
  }

   sendOTP() {
    this.resendOtpFlag = true;
    this.otpCountdown = 32
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      if (this.verificationForm.valid) {
        const mobileNo = this.verificationForm.get('mobileNo').value;
        const aadharNo = this.verificationForm.get('aadharNo').value;
        const loading = this.loadingController.create({
          message: 'Please Wait',
          duration: 500,
          spinner: "crescent"
        }).then((res)=>{
          res.present();
        });
        this.mobileVerification.sendOTP(mobileNo, aadharNo).subscribe(
          (res: any) => {
            this.loadingController.dismiss();
            if (res.message === 'OTP Sent') {
              this.toast.show(`OTP sent`, '2000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              this.otpflag = true;
              this.unverifiedUser = false;
              setInterval(()=>{
                this.otpCountdown--;
                this.resendOtpFlag = this.otpCountdown<1?false:true
              },1000)
            }
          },
          (err: any) => {
            this.loadingController.dismiss();
            console.log(err);
            this.unverifiedUser = true;
            if (err.error.message === 'Mobile No. already Registered') {
              this.ECode = 'E1';
            } else if (err.error.message === 'Aadhar No. already Registered') {
              this.ECode = 'E2';
            }
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
      const loading = this.loadingController.create({
        message: 'Please Wait',
        duration: 500,
        spinner: "crescent"
      }).then((res)=>{
        res.present();
      });
      this.mobileVerification.validateOTP(otp).subscribe(
        (res: any) => {
          if (res.message === 'OTP Verified') {
            // otp verified
            const mobileAndAadhar: NavigationExtras = {
              state: {
                mobile: this.verificationForm.get('mobileNo').value,
                aadhar: this.verificationForm.get('aadharNo').value
              }
            };
            this.verificationForm.reset();
            this.otpflag = false;
            this.router.navigate(['/registration'], mobileAndAadhar);
            this.loadingController.dismiss();
          }
        },
        (err: any) => {
          this.loadingController.dismiss();
          this.dialogs.alert('Invalid OTP');
        }
      );
    }
  }
}

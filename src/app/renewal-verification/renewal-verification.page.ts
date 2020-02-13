import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { Dialogs } from '@ionic-native/dialogs/ngx';
import { LoadingController } from '@ionic/angular';
import { MobileVerificationService } from './../services/mobile-verification.service';
import { Network } from '@ionic-native/network/ngx';
import { RenewalService } from '../services/renewal.service';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-renewal-verification',
  templateUrl: './renewal-verification.page.html',
  styleUrls: ['./renewal-verification.page.scss'],
})
export class RenewalVerificationPage implements OnInit {

  public verificationForm: FormGroup;
  public unverifiedUser = false;
  public allowOTP = false
  public cardTitle: string;
  public passingResponse: any;
  public unregisteredUser = false;
  public invalidRegNo = false;
  public JWTToken: any;
  public otpflag = false;
  public resendOtpFlag = true;
  public redataEntry = false;
  public otpCountdown: number;
  constructor(
    private router: Router,
    private network: Network,
    private dialogs: Dialogs,
    private storage: Storage,
    private loadingController: LoadingController,
    private renewalService: RenewalService,
    private mobileVerification: MobileVerificationService,
    private toast: Toast
  ) {

    this.network.onDisconnect().subscribe(() => { });
    this.network.onConnect().subscribe(() => { });
    this.verificationForm = new FormGroup({
      registrationNo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$'), Validators.maxLength(14)]),
      mobileNo: new FormControl()
    });

    this.storage.get('token').then((val) => {
      if (val === null) {
        this.router.navigate(['/home']);
      } else {
        this.JWTToken = val;
      }
    });

    this.cardTitle = "BOCW Registration No. Verification "
  }

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    }
  }

  clearErrors() {
    this.unregisteredUser = false;
    this.invalidRegNo = false;
  }

  async verify() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      const loading = await this.loadingController.create({
        message: 'Please Wait',
        spinner: "crescent"
      })
      if (this.verificationForm.valid) {
        await loading.present();
        this.renewalService.checkForRenewal(this.registrationNo.value, this.JWTToken).subscribe(async (res: any) => {
          if (res) {
            this.mobileNo.setValue(res.mobilePersonal)
            this.passingResponse = res;
            this.allowOTP = true;
            this.cardTitle = "Registered Worker Mobile Verification"
            this.redataEntry = false;
            // this.router.navigate(['/renewal'], registrationNumber);
          } else {
            this.allowOTP = false;
            this.redataEntry = true;
            this.dialogs.alert('Your BOCW Registration Number is not registered. Please enter registered Registration Number or re-enter your data by clicking on the Re-data Entry button. आपला BOCW नोंदणी क्रमांक नोंदणीकृत नाही. कृपया नोंदणीकृत नोंदणी क्रमांक प्रविष्ट करा किंवा री-डेटा एन्ट्री बटणावर क्लिक करुन आपला डेटा पुन्हा प्रविष्ट करा.')
            this.unregisteredUser = true
          }
          await loading.dismiss();
          console.log(res)
        }, err => { console.log(); this.loadingController.dismiss(); })

      } else {
        this.unregisteredUser = true;
        this.invalidRegNo = true;
        await loading.dismiss().then((result) => {
          this.dialogs.alert('Registration No. is not valid')
        });
      }
    }

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
      if (this.verificationForm.valid) {
        const mobileNo = this.verificationForm.get('mobileNo').value;
        const loading = this.loadingController.create({
          message: 'Please Wait',
          duration: 500,
          spinner: "crescent"
        }).then((res) => {
          res.present();
        });
        this.mobileVerification.sendRenewalOTP(this.registrationNo.value, this.mobileNo.value).subscribe(
          (res: any) => {
            this.loadingController.dismiss();
            if (res.message === 'OTP Sent') {
              this.toast.show(`OTP sent`, '2000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              this.otpflag = true;
              this.unregisteredUser = false;
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
      const mobileNo = this.verificationForm.get('mobileNo').value;
      const loading = await this.loadingController.create({
        message: 'Please Wait',
        spinner: "crescent"
      });
      await loading.present()
      this.mobileVerification.validateOTP(mobileNo, otp).subscribe(
        async (res: any) => {
          if (res.message === 'OTP Verified') {
            // otp verified
            const registrationNumber: NavigationExtras = {
              state: {
                registrationNo: this.registrationNo.value
              }
            }
            this.verificationForm.reset();
            this.allowOTP = false;
            this.otpflag = false;
            await loading.dismiss().then((result) => {
              this.cardTitle = 'BOCW Registration No. Verification'
              this.router.navigate(['/renewal'], registrationNumber);
            });

          }
        },
        async (err: any) => {
          this.otpCountdown = 0;
          this.resendOtpFlag = false;
          await loading.dismiss().then((result) => {
            this.dialogs.alert('Invalid OTP');
          })
        }
      );
    }
  }

  get registrationNo() { return this.verificationForm.get('registrationNo'); }
  get mobileNo() { return this.verificationForm.get('mobileNo'); }

}

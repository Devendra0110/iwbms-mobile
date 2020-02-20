import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { Dialogs } from '@ionic-native/dialogs/ngx';
import { LoadingController } from '@ionic/angular';
import { MobileVerificationService } from '../services/mobile-verification.service';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { ValidationService } from '../services/validation.service';

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

  async sendOTP() {
    this.resendOtpFlag = true;
    this.otpCountdown = 32
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      const loading = await this.loadingController.create({
        message: 'Please Wait',
        spinner: "crescent"
      })
      if (this.verificationForm.valid) {
        const mobileNo = this.verificationForm.get('mobileNo').value;
        const aadharNo = this.verificationForm.get('aadharNo').value;
        await loading.present()
        this.otpflag = true;
        this.unverifiedUser = false;
        this.mobileVerification.sendOTP(Number(mobileNo), Number(aadharNo)).subscribe(
          async (res: any) => {
            await loading.dismiss();
            if (res.message === 'OTP Sent') {
              this.toast.show(`OTP sent`, '2000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              this.unverifiedUser = false;
              setInterval(()=>{
                this.otpCountdown--;
                this.resendOtpFlag = this.otpCountdown<1?false:true
              },1000)
            }
          },
          async (err: any) => {
            await loading.dismiss();
            console.log(err);
            this.otpflag = false;
            this.unverifiedUser = true;
            if (err.error.message === 'Mobile No. already Registered') {
              this.ECode = 'E1';
            } else if (err.error.message === 'Aadhar No. already Registered') {
              this.ECode = 'E2';
            }else if(err.error.message === 'Mobile No. already Registered & Aadhar No. already Registered'){
              this.ECode = 'E3';
            }else{
              this.ECode =undefined;
              this.dialogs.alert('Server is unreachable at this moment. Please try again later.')
            }
          }
        );
      } else {
        await loading.dismiss().then((result) => { 
          this.dialogs.alert('Details are not valid.');
        })
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
      this.mobileVerification.validateOTP(mobileNo,otp).subscribe(
        async (res: any) => {
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
            await loading.dismiss().then((result)=>{
              this.router.navigate(['/registration'], mobileAndAadhar);
            });
          }
        },
        async (err: any) => {
          await loading.dismiss().then((result)=>{
            this.dialogs.alert('Invalid OTP');
          })
          this.otpCountdown=0;
          this.resendOtpFlag=false;
          
        }
      );
    }
  }
}

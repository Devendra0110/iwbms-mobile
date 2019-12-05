import { MobileVerificationService } from './../services/mobile-verification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { LoadingController } from '@ionic/angular';
import { RenewalService } from '../services/renewal.service';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-renewal-verification',
  templateUrl: './renewal-verification.page.html',
  styleUrls: ['./renewal-verification.page.scss'],
})
export class RenewalVerificationPage implements OnInit {

  public verificationForm: FormGroup;
  public unverifiedUser = false;
  public allowOTP=false
  public cardTitle:string;
  public passingResponse:any;
  public unregisteredUser = false;
  public invalidRegNo=false;
  public JWTToken: any;
  public otpflag = false;
  public resendOtpFlag=true;
  public otpCountdown:number;
  constructor(
    private router: Router,
    private network: Network,
    private dialogs: Dialogs,
    private storage: Storage,
    private loadingController:LoadingController,
    private renewalService:RenewalService,
    private mobileVerification: MobileVerificationService,
    private toast: Toast
  ) { 

    this.network.onDisconnect().subscribe(() => { });
      this.network.onConnect().subscribe(() => { });
      this.verificationForm = new FormGroup({
        registrationNo: new FormControl('', [Validators.required, Validators.pattern('^(MH)\\d{12}$')]),
         mobileNo: new FormControl()
      });

    this.storage.get('token').then((val) => {
      if (val === null) {
        this.router.navigate(['/home']);
      } else {
        this.JWTToken = val;
      }
    });
        
        this.cardTitle="BOCW Registration No. Verification "
  }

  ngOnInit() {
    
  }
  ionViewDidEnter() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    }
  }

  clearErrors(){
      this.unregisteredUser=false;
      this.invalidRegNo=false;
  }

  verify(){
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      if (this.verificationForm.valid) {
        const loading = this.loadingController.create({
          message: 'Please Wait',
          duration: 500,
          spinner: "crescent"
        }).then((res) => {
          res.present();
        });
        this.renewalService.checkForRenewal(this.registrationNo.value, this.JWTToken).subscribe((res:any) => {
          if(res){
            this.mobileNo.setValue(res.mobilePersonal)
            this.passingResponse=res;
              this.allowOTP=true;
              this.cardTitle = "Registered Worker Mobile Verification"
            // this.router.navigate(['/renewal'], registrationNumber);
          }else{
            this.allowOTP=false;
            this.dialogs.alert('Registration No is not registered.')
            this.unregisteredUser =true
          }
          this.loadingController.dismiss();
          console.log(res)
        }, err => { console.log(); this.loadingController.dismiss();})

      } else {
        this.dialogs.alert('Registration No. is not valid')
        this.unregisteredUser = true;
        this.invalidRegNo = true;
        this.loadingController.dismiss();
      }
    }
    
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
          duration:500,
          spinner: "crescent"
        }).then((res)=>{
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
              setInterval(()=>{
                this.otpCountdown--;
                this.resendOtpFlag = this.otpCountdown<1?false:true
              },1000)
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
      const loading = this.loadingController.create({
        message: 'Please Wait',
        duration: 500,
        spinner: "crescent"
      }).then((res)=>{
        res.present();
      });
      this.mobileVerification.validateOTP(mobileNo,otp).subscribe(
        (res: any) => {
          if (res.message === 'OTP Verified') {
            // otp verified
            const registrationNumber: NavigationExtras = {
              state: {
                registrationNo:this.registrationNo.value
              }
            }
            this.verificationForm.reset();
            this.allowOTP=false;
            this.otpflag = false;
            this.loadingController.dismiss();
            this.cardTitle = 'BOCW Registration No. Verification'
            this.router.navigate(['/renewal'], registrationNumber);

          }
        },
        (err: any) => {
          this.loadingController.dismiss();
          this.otpCountdown=0;
          this.resendOtpFlag=false;
          this.dialogs.alert('Invalid OTP');
        }
      );
    }
  }

  get registrationNo() { return this.verificationForm.get('registrationNo'); }
  get mobileNo() { return this.verificationForm.get('mobileNo'); }

}

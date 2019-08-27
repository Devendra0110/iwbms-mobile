import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { MobileVerificationService } from '../services/mobile-verification.service';
import { Dialogs } from '@ionic-native/dialogs/ngx'
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {


  public verificationForm: FormGroup;
  public unverifiedUser = false;
  public ECode: string;
  public otpflag=false;
  // E0 : unregistered mobile no and aadhar
  // E1 : already registered mobile no
  // E2 : already registered aadhar
  // E3 : both already registered
  // E4 : both already registered with different users



  constructor(private validationService: ValidationService,
              private router: Router,
              private mobileVerification:MobileVerificationService,
              private dialogs:Dialogs) {

   this.verificationForm = new FormGroup({
      mobileNo: new FormControl('', this.validationService.createValidatorsArray('mobile')),
      aadharNo: new FormControl('', this.validationService.createValidatorsArray('aadharNo'))
    });

  }

  ngOnInit() {
  }

  get mobileNo() {
    return this.verificationForm.get('mobileNo');
  }
  get aadharNo() {
    return this.verificationForm.get('aadharNo');
  }



  sendOTP() {
    if (this.verificationForm.valid) {
      const mobileNo = this.verificationForm.get('mobileNo').value;
      const aadharNo = this.verificationForm.get('aadharNo').value;
      this.mobileVerification.sendOTP(mobileNo, aadharNo).subscribe(
        (res: any) => {
          if (res.message === 'OTP Sent') {
            this.otpflag=true;
            this.unverifiedUser = false;
          }
        },
        (err: any) => {
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
      console.log('invalid detail')
    }
  }

  validateOTP(otp) {    // fallback, if sendotp is enabled
    this.mobileVerification.validateOTP(otp).subscribe(
      (res: any) => {
        if (res.message === 'OTP Verified') {
          //otp verified
          const mobileAndAadhar: NavigationExtras = {
            state: {
              mobile: this.verificationForm.get('mobileNo').value,
              aadhar: this.verificationForm.get('aadharNo').value
            }
          }
          this.router.navigate(['/registration'], mobileAndAadhar);
        }
      },
      (err: any) => {
        this.dialogs.alert('Invalid OTP');
        console.log('invalid otp');
      }
    );

  }

}

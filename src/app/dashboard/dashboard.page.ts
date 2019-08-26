import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  
  tokenForm: FormGroup
  public wfc_id:number;

  constructor(
    
    private storage:Storage) {
    
    //re-route to homepage if not logged-in
    // this.storage.get('token').then((val) => {
    //   if (val===null)
    //     this.router.navigate(['/home'])
    // });


    // remove previously generated token
    // this.storage.remove('tokenId').then((val) => {
    // }, err => console.log(err));
    
    // set wfc_id
    // this.storage.get('wfc_id').then((val) => {
    //       this.wfc_id=val;
    //     });


    // this.tokenForm = new FormGroup({
    //   purpose: new FormControl(null, Validators.required),
    //   mobileNo: new FormControl('', this.validationService.createValidatorsArray('mobile')),
    //   registrationNo: new FormControl(''),
    //   fullName: new FormControl('', [Validators.pattern('[a-zA-z\\s]{8,60}')])
    // });
    }

  ngOnInit() {
    // this.purpose.patchValue('New Registration');

  }

  // sendOTP(mobileNo: string) {
  //   this.mobileNo = mobileNo;
  //   setTimeout(() => {
  //     this.resendOTPFlag = true;
  //   }, 30000);

  //   this.mobileVerificationService.sendOTP(mobileNo).subscribe(
  //     (res: any) => {
  //       if (res.message === 'OTP Sent') {
  //         this.otpFlag = true;
  //       }
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // generateToken(){
  //   const tokenObj = {
  //     formData: this.tokenForm.value,
  //     wfc_id:this.wfc_id
  //   };
  //   this.tokenService.generateToken(tokenObj).subscribe(
  //     (res: any) => {
  //       alert('Token Generated');
  //       console.log(res)
  //       this.storage.set('tokenId', res.tokenId)
  //       this.router.navigate(['/registration']);
  //     },err=>{
  //       alert('Enter Correct Details');
  //       console.log(err)
  //     });
  //     this.tokenForm.reset();
  // }



  logout(){
    this.storage.remove('token').then((val) => {
    })
    // this.storage.remove('tokenId').then((val) => {
    //       },err=>console.log(err));
    // this.router.navigate(['/home']);
  }


  // get purpose() {
  //   return this.tokenForm.get('purpose');
  // }

  // get mobileNo() {
  //   return this.tokenForm.get('mobileNo');
  // }

  // get registrationNo() {
  //   return this.tokenForm.get('registrationNo');
  // }

  // get fullName() {
  //   return this.tokenForm.get('fullName');
  // }

}

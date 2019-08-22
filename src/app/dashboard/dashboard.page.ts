import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  
  tokenForm: FormGroup
  public wfc_id:number;

  constructor(private tokenService: TokenService,
    private router: Router,
    private validationService: ValidationService,
    private storage:Storage) {
    
    //re-route to homepage if not logged-in
    this.storage.get('token').then((val) => {
      if (val===null)
        this.router.navigate(['/home'])
    });

    this.storage.remove('tokenId').then((val) => {
    }, err => console.log(err));
    
    this.storage.get('wfc_id').then((val) => {
          this.wfc_id=val;
        });
    this.tokenForm = new FormGroup({
      purpose: new FormControl(null, Validators.required),
      mobileNo: new FormControl('', this.validationService.createValidatorsArray('mobile')),
      registrationNo: new FormControl(''),
      fullName: new FormControl('', [Validators.pattern('[a-zA-z\\s]{8,60}')])
    });
    }

  ngOnInit() {
    this.purpose.patchValue('New Registration');

  }

  generateToken(){
    const tokenObj = {
      formData: this.tokenForm.value,
      wfc_id:this.wfc_id
    };
    this.tokenService.generateToken(tokenObj).subscribe(
      (res: any) => {
        alert('Token Generated');
        console.log(res)
        this.storage.set('tokenId', res.tokenId)
        this.router.navigate(['/registration']);
      },err=>{
        alert('Enter Correct Details');
        console.log(err)
      });
      this.tokenForm.reset();
  }

  logout(){
    this.storage.remove('token').then((val) => {
    })
    this.storage.remove('tokenId').then((val) => {
          },err=>console.log(err));
    this.router.navigate(['/home']);
  }


  get purpose() {
    return this.tokenForm.get('purpose');
  }

  get mobileNo() {
    return this.tokenForm.get('mobileNo');
  }

  get registrationNo() {
    return this.tokenForm.get('registrationNo');
  }

  get fullName() {
    return this.tokenForm.get('fullName');
  }

}

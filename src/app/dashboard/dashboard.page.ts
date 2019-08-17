import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  tokenForm: FormGroup

  constructor(private tokenService: TokenService,
    private router: Router) { 
    this.tokenForm = new FormGroup({
      purpose: new FormControl(null, Validators.required),
      mobileNo: new FormControl('', Validators.required),
      registrationNo: new FormControl(''),
      fullName: new FormControl('', Validators.required)
    });
    }

  ngOnInit() {


  }

  generateToken(){
    const tokenNo = Math.floor((Math.random() * 10000));
    const tokenObj = {
      formData: this.tokenForm.value,
      wfc_id: 1,
      tokenNo,
    };
    this.tokenService.generateToken(tokenObj).subscribe(
      (res: any) => {
        alert('Token Generated');
        this.router.navigate(['/registration']);
      },err=>{
        alert('Enter Correct Details');
        console.log(err)
      });

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

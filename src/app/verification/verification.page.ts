import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  public verificationForm:FormGroup;


  constructor(private validationService: ValidationService,
    private storage:Storage,
    private router:Router) {

      this.verificationForm = new FormGroup({
        mobileNo: new FormControl('', this.validationService.createValidatorsArray('mobile')),
        aadharNo: new FormControl('', this.validationService.createValidatorsArray('aadharNo'))
      })

     }

  ngOnInit() {
  }

  get mobileNo(){
    return this.verificationForm.get('mobileNo');
  }

  get aadharNo(){
    return this.verificationForm.get('aadharNo');
  }

  verifyUser(){
    console.log(this.verificationForm);
    console.log();
    this.router.navigate(['/registration']);
  }


}

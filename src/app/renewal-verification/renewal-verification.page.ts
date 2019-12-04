import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { LoadingController } from '@ionic/angular';
import { RenewalService } from '../services/renewal.service';

@Component({
  selector: 'app-renewal-verification',
  templateUrl: './renewal-verification.page.html',
  styleUrls: ['./renewal-verification.page.scss'],
})
export class RenewalVerificationPage implements OnInit {

  public verificationForm: FormGroup;
  public unregisteredUser = false;
  public invalidRegNo=false;
  public JWTToken: any;

  constructor(
    private router: Router,
    private network: Network,
    private dialogs: Dialogs,
    private storage: Storage,
    private loadingController:LoadingController,
    private renewalService:RenewalService
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
            const registrationNumber: NavigationExtras = {
              state: {
                registrationNo: this.registrationNo.value
              }
            };
            this.verificationForm.reset();
            this.router.navigate(['/renewal'], registrationNumber);
          }else{
            this.dialogs.alert('Registration No is not registered.')
            this.unregisteredUser =true
          }
          this.loadingController.dismiss();
          console.log(res)
        }, err => { console.log(); this.loadingController.dismiss();})

      } else {
        this.dialogs.alert('Registration No. is not valid')
        this.invalidRegNo = true;
        this.loadingController.dismiss();
      }
    }
    
  }

  get registrationNo() { return this.verificationForm.get('registrationNo'); }
  get mobileNo() { return this.verificationForm.get('mobileNo'); }

}

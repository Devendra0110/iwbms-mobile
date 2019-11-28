import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { MobileVerificationService } from '../../services/mobile-verification.service';
import { ClaimService } from '../../services/claim.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-claim-verification',
  templateUrl: './claim-verification.page.html',
  styleUrls: ['./claim-verification.page.scss'],
})
export class ClaimVerificationPage implements OnInit {

  public claimVerificationForm: FormGroup;
  public ineligible: boolean;
  public unregisteredUser: boolean;
  public JWTToken: any;

  constructor(
    private validationService: ValidationService,
    private router: Router,
    private dialogs: Dialogs,
    private storage: Storage,
    private claimService: ClaimService,
    private mobileVerification: MobileVerificationService,
    private network: Network,
    private loadingController: LoadingController,
    private toast: Toast
  ) {
    this.network.onDisconnect().subscribe(() => { });
    this.network.onConnect().subscribe(() => { });
    this.claimVerificationForm = new FormGroup({
      registrationNo: new FormControl('MH020040000006', [Validators.required, Validators.pattern('^(MH)\\d{12}$')]),
      mobileNo: new FormControl('7387171322',this.validationService.createValidatorsArray('mobile'))
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

  clearErrors() {
    this.ineligible = false;
  }

  verify() {
    const tokenObj ={
      registrationNo:this.registrationNo.value,
      mobileNo:this.mobileNo.value
    }
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      if (this.claimVerificationForm.valid) {
        const loading = this.loadingController.create({
          message: 'Please Wait',
          duration: 500,
          spinner: "crescent"
        }).then((res) => {
          res.present();
        });
        this.claimService.checkRegistrationAndRenewalValidity(tokenObj, this.JWTToken).subscribe(
          (res: any) => {
            if (res.subscription === 'active') {
              console.log(res.firstNamePersonal + ' ' + res.lastNamePersonal);
              res['JWTToken']=this.JWTToken;
              delete res.agePersonal
              console.log(res);
              const userObject: NavigationExtras = {
                state: res
              }
              this.router.navigate(['/claim-management/claim-main-form'], userObject);
            } else {
              this.dialogs.alert('Worker is not eligible.')
              this.ineligible = true
            }
          }, err => {
            this.unregisteredUser = true;
            this.dialogs.alert('Registered does not exist');
          }
        )

      } else {
        this.dialogs.alert('Registration No. is not valid')
        this.ineligible = true;
        this.unregisteredUser = true;
        this.loadingController.dismiss();
      }
    }
  }
  get registrationNo() { return this.claimVerificationForm.get('registrationNo'); }
  get mobileNo() { return this.claimVerificationForm.get('mobileNo'); }


}

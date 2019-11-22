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
      registrationNo: new FormControl('', [Validators.required, Validators.pattern('^(MH)\\d{12}$')])
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
        this.claimService.checkRegistrationAndRenewalValidity(this.registrationNo.value, this.JWTToken).subscribe(
          (res: any) => {
            if (res.subscription === 'active') {
              console.log(res.firstNamePersonal + ' ' + res.lastNamePersonal);
              const userObject: NavigationExtras = {
                state: {
                  userData: res,
                }
              }
              this.router.navigate(['/claim-main-form'], userObject);
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


}

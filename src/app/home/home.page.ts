import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { ValidationService } from '../services/validation.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserManagementService } from '../services/user-management.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loginForm: FormGroup;
  public wrongUser: boolean;
  public subscription: any;
  constructor(
    private userManagementService: UserManagementService,
    private validationService: ValidationService,
    private router: Router,
    private storage: Storage,
    private network: Network,
    private dialogs: Dialogs,
    private authService: AuthenticationService,
    private platform: Platform) {

    // network subscribers check the status of network even its type
    this.network.onDisconnect().subscribe(() => { });
    this.network.onConnect().subscribe(() => { });
    this.wrongUser = false;


    this.loginForm = new FormGroup({
      username: new FormControl('', this.validationService.createValidatorsArray('userName')),
      password: new FormControl('', [Validators.required])
    });
  }

  loginUser() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      this.userManagementService.login(this.loginForm.value).subscribe((res: any) => {
        const data = JSON.parse(JSON.stringify(res));
        if (data.userInfo.userType === 10) {
          this.storage.set('wfc_id', data.userInfo.wfc_id);
          this.authService.login(data.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.wrongUser = true;
        }
      }, err => console.log(err));
    }
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    }
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loginForm: FormGroup;
  public wrongUser: boolean;
  constructor(
    private userManagementService: UserManagementService,
    private validationService: ValidationService,
    private router: Router,
    private storage: Storage,
    private network: Network,
    private dialogs: Dialogs) {

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
      this.dialogs.alert('You are not connected to internet');
    } else {
      this.userManagementService.login(this.loginForm.value).subscribe((res: any) => {
        const data = JSON.parse(JSON.stringify(res));

        if (data.userInfo.userType === 10) {
          this.storage.set('wfc_id', data.userInfo.wfc_id);
          this.storage.set('token', data.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.wrongUser = true;
        }
      }, err => console.log(err));
    }

  }
}
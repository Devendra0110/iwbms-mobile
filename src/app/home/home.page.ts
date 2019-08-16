import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../services/user-management.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm: FormGroup;
  token: string;
  constructor(
    private userManagementService: UserManagementService,
    private router: Router,
    private storage: Storage) {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.token = null;
    }

    loginUser() {
      this.userManagementService.login(this.loginForm.value).subscribe((res: any) => {
        const data = JSON.parse(JSON.stringify(res));
        this.token = data.token;
        this.storage.set('token', data.token);
        // this.storage.get('token').then((val) => {
        //   console.log('Your token is', val);
        // });

        this.router.navigate(['/dashboard']);
      }, err => console.log(err));
    }

}

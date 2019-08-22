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
  public wrongUser:boolean
  constructor(
    private userManagementService: UserManagementService,
    private router: Router,
    private storage: Storage) {
      this.wrongUser=false;
    this.storage.get('token').then((val) => {
      if(val)
          this.router.navigate(['/dashboard'])
        });
    
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    

    }

    loginUser() {
      this.userManagementService.login(this.loginForm.value).subscribe((res: any) => {
        const data = JSON.parse(JSON.stringify(res));
        if(data.userInfo.userType===10){
          this.storage.set('wfc_id', data.userInfo.wfc_id);
          this.storage.set('token', data.token);
          console.log(data.token);
          this.router.navigate(['/dashboard']);
        }
        else{
          this.wrongUser = true;
          // alert('Nikal Pehli fursat main nikal')
        }

        
        
        // this.storage.get('token').then((val) => {
        //   console.log('Your token is', val);
        // });
        // this.storage.get('wfc_id').then((val) => {
        //   console.log('WFC ID', val);
        // });
        
      }, err => console.log(err));
    }

}

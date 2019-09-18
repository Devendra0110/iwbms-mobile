import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NavigatorCordova } from '../../assets/common.interface';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  tokenForm: FormGroup
  public wfc_id: number;
  public navigator:NavigatorCordova;
  public subscription:any;
  constructor(
    private router: Router,
    private storage: Storage,
    private authService:AuthenticationService,
    private platform:Platform) {

    // re-route to homepage if not logged-in
  }

  ngOnInit() {

  }
  logout() {
    // this.storage.remove('token').then((val) => {
    // })
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}

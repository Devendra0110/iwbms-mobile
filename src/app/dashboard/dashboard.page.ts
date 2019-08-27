import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  tokenForm: FormGroup
  public wfc_id: number;

  constructor(
    private router: Router,
    private storage: Storage) {

    // re-route to homepage if not logged-in
    this.storage.get('token').then((val) => {
      if (val === null)
        this.router.navigate(['/home'])
    });
  }

  ngOnInit() {

  }
  logout() {
    this.storage.remove('token').then((val) => {
    })
    this.router.navigate(['/home']);
  }

}

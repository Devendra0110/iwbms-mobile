import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public showSplash=false;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'Registration',
    //   url: '/registration',
    //   icon: 'person-add'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#000000');
    // this.splashScreen.show();
    //   this.splashScreen.hide();


    });
  }
}

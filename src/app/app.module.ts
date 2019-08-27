import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';

import { AppComponent } from './app.component';
import {SuggestionBoxComponent } from './components/suggestion-box/suggestion-box.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
// Services
import {TransliterationService} from './services/transliteration.service';
import {ValidationService} from './services/validation.service';
import { RegistrationService } from './services/registration.service';
import { EventService } from './services/event.service';
import { HttpService } from './services/http.service';
import { UserManagementService } from './services/user-management.service';
import { FormControlDirective } from './directives/form-control.directive';


@NgModule({
  declarations: [AppComponent, FormControlDirective, SuggestionBoxComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    Network,
    TransliterationService,
    ValidationService,
    RegistrationService,
    EventService,
    HttpService,
    UserManagementService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

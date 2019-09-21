import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';
import { HTTP} from '@ionic-native/http/ngx';
import { Toast } from '@ionic-native/toast/ngx';

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
import { AuthGuardService } from './services/auth-guard.service';
import { FormControlDirective } from './directives/form-control.directive';
import { FamilyModalPageModule } from './family-modal/family-modal.module';
import { EmployerModalPageModule } from './employer-modal/employer-modal.module';


@NgModule({
  declarations: [AppComponent, FormControlDirective, SuggestionBoxComponent],
  entryComponents: [],
  imports: [
    FamilyModalPageModule,
    EmployerModalPageModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    Toast,
    HTTP,
    TransliterationService,
    ValidationService,
    RegistrationService,
    EventService,
    HttpService,
    UserManagementService,
    AuthGuardService,
    Camera,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

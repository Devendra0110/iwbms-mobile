import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera/ngx';
import { ClaimValidationService } from './services/claim-validation.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { EmployerModalPageModule } from './employer-modal/employer-modal.module';
import { EventService } from './services/event.service';
import { FamilyModalPageModule } from './family-modal/family-modal.module';
import { FileChooser } from '@ionic-native/file-chooser/ngx'
import { FormControlDirective } from './directives/form-control.directive';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { NgModule } from '@angular/core';
import { RegistrationService } from './services/registration.service';
import { RenewalService } from './services/renewal.service';
import { RouteReuseStrategy } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SuggestionBoxComponent} from './components/suggestion-box/suggestion-box.component';
import { Toast } from '@ionic-native/toast/ngx';
// Services
import {TransliterationService} from './services/transliteration.service';
import { UserManagementService } from './services/user-management.service';
import {ValidationService} from './services/validation.service';
import { CashReceiptModalPageModule } from './cash-receipt-modal/cash-receipt-modal.module';
import { ClaimModalPageModule } from './claim-modal/claim-modal.module';

@NgModule({
  declarations: [AppComponent, FormControlDirective, SuggestionBoxComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FamilyModalPageModule,
    EmployerModalPageModule,
    CashReceiptModalPageModule,
    ClaimModalPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Dialogs,
    Network,
    Toast,
    FileChooser,
    HTTP,
    TransliterationService,
    ValidationService,
    RegistrationService,
    RenewalService,
    EventService,
    HttpService,
    UserManagementService,
    AuthGuardService,
    Camera,
    ClaimValidationService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

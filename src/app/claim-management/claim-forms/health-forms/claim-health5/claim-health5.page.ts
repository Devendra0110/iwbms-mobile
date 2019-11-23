import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';

@Component({
  selector: 'app-claim-health5',
  templateUrl: './claim-health5.page.html',
  styleUrls: ['./claim-health5.page.scss'],
})
export class ClaimHealth5Page extends ClaimBasePage implements OnInit {
  

  public formGroup: FormGroup;
  
  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,

    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router:Router,
    protected storage:Storage,
    protected toast:Toast,
    private dialogs:Dialogs,

  ) {
    super(transliterate,httpService,claimService,router,storage,toast);

    this.formGroup = new FormGroup({
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck :new FormControl('',this.validationService.createValidatorsArray('verifyDocumentCheck')),

    });

   }

  ngOnInit() {
  }

  get verifyDocumentCheck() {return this.formGroup.get('verifyDocumentCheck'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }


save(){
  
}
}

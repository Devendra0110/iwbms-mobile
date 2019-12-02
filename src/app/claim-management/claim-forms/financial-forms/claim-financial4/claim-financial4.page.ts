import { Constants } from './../../../../../assets/constants';
import { Storage } from '@ionic/storage';
import { HttpService } from './../../../../services/http.service';
import { TransliterationService } from './../../../../services/transliteration.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-claim-financial4',
  templateUrl: './claim-financial4.page.html',
  styleUrls: ['./claim-financial4.page.scss'],
})
export class ClaimFinancial4Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public saveOnce=1;
  claimRegionObj: { type: string; id: string; }[];

  constructor(private validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs,
) {

    super(transliterate, httpService, claimService, router, storage, toast, dialogs);
    this.files = { pmAwaasCertificate: '', selfDeclaration: '' };
    this.fileOptions = { pmAwaasCertificate: '', selfDeclaration: '' };
  
    this.formGroup = new FormGroup({

      pmAwaasCertificate: new FormControl('', this.validationService.createValidatorsArray('pmAwaasCertificate')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      placeOfClaim: new FormControl('', Validators.required),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
  

      //marathi form controls
      benefitType: new FormControl('', [Validators.required]),
      benefitAmount: new FormControl('')
    });
    this.claimRegionObj = Constants.claimRegion;

  }

  ngOnInit() {
    this.assignBenefits(true);

  }

  get pmAwaasCertificate() { return this.formGroup.get('pmAwaasCertificate'); }
  // get declaration() { return this.formGroup.get('declaration'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get placeOfClaim() { return this.formGroup.get('placeOfClaim'); }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }

  public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if(this.saveOnce===1){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
      this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,
        claimData: {
          benefitType: this.formGroup.getRawValue().benefitType,
          benefitAmount: this.formGroup.getRawValue().benefitAmount,
          documents: {
            pmAwaasCertificate: this.fileOptions['pmAwaasCertificate'],
            selfDeclaration: this.fileOptions['selfDeclaration']
          }
        }
      };
      this.saveClaimForm(postObj);

    } else {
      console.log('error in form ');
      this.dialogs.alert('Please Update the form.');
    }
  }

}

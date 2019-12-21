import * as moment from 'moment';
import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { ClaimBasePage } from '../../../claim-base/claim-form.baseclass';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-claim-social4',
  templateUrl: './claim-social4.page.html',
  styleUrls: ['./claim-social4.page.scss'],
})
export class ClaimSocial4Page extends ClaimBasePage implements OnInit {

  public uploadedSelfDeclarationUrl: string;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs
  ) {
    super(transliterate, httpService, claimService, router, storage, toast, dialogs);
    this.fileOptions = { selfDeclaration: '' };
    this.files = { selfDeclaration: '' };
    this.formGroup = new FormGroup({
      // socialForm5Doc1: new FormControl('', this.validationService.createValidatorsArray('socialForm5Doc1')),
      //declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),

    })
  }



  ngOnInit() {
    this.assignBenefits(true);

  }
  public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if (typeof this.user.registrationDatePersonal === 'string' && typeof this.user.dobPersonal === 'string') {
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,
        claimData: {
          benefitType: this.benefitType.value,
          benefitAmount: this.benefitAmount.value,
          documents: {
            selfDeclaration: this.fileOptions['selfDeclaration']
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {
      this.formGroup.markAllAsTouched();

      this.dialogs.alert('Please Update the form.');


    }
  }



  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }


}

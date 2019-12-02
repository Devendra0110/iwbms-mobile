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
  selector: 'app-claim-social5',
  templateUrl: './claim-social5.page.html',
  styleUrls: ['./claim-social5.page.scss'],
})
export class ClaimSocial5Page extends ClaimBasePage implements OnInit {
  
  public bankDetails: any;
  public isIfscCodeFound: boolean;

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
    
    this.formGroup = new FormGroup({
      ifscCode: new FormControl('', this.validationService.createValidatorsArray('ifscCode')),
      bankName: new FormControl('', this.validationService.createValidatorsArray('bankName')),
      bankBranch: new FormControl('', this.validationService.createValidatorsArray('bankBranch')),
      bankAddress: new FormControl('', this.validationService.createValidatorsArray('bankAddress')),
      micrCode: new FormControl('', this.validationService.createValidatorsArray('micrCode')),
      accountNumber: new FormControl('', this.validationService.createValidatorsArray('accountNumber')),
      socialForm6Doc1: new FormControl('', this.validationService.createValidatorsArray('socialForm6Doc1')),
      socialForm6Doc2: new FormControl('', this.validationService.createValidatorsArray('socialForm6Doc2')),
      socialForm6Doc3: new FormControl('', this.validationService.createValidatorsArray('socialForm6Doc3')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      sameAsRegistration: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
  
    });
  }

  ngOnInit() {
    this.assignBenefits(true);
    this.fileOptions = { socialForm6Doc1: '', socialForm6Doc2: '', socialForm6Doc3: '', selfDeclaration: '' };
    this.files = { socialForm6Doc1: '', socialForm6Doc2: '', socialForm6Doc3: '', selfDeclaration: '' };
  }

  public searchByIfscCode(): void {
    this.bankDetails = {
      BANK: '',
      BRANCH: '',
      Address: ''
    };
    this.claimService.callIfscCodeApi(this.ifscCode.value)
      .subscribe((bankDetails: any) => {
        if (!!bankDetails) {
          this.isIfscCodeFound = true;
          this.bankDetails = bankDetails;
          this.formGroup.get('bankName').patchValue(this.bankDetails.BANK);
          this.formGroup.get('bankBranch').patchValue(this.bankDetails.BRANCH);
          this.formGroup.get('bankAddress').patchValue(this.bankDetails.ADDRESS);
        }
      }, () => {
        alert('ifsc code not found')
        this.bankDetails = {
          BANK: '',
          BRANCH: '',
          Address: ''
        };
        this.isIfscCodeFound = false;
      });
  }

public sameAsRegistrationChecked(event) {
    const bankDetalsControls = ['ifscCode', 'accountNumber', 'bankAddress', 'bankBranch', 'bankName', 'micrCode']
    if (event.target.checked) {
      for (const control of bankDetalsControls) {
        if (this.user[`${control}` + 'Bank'] !== undefined)
          this[`${control}`].patchValue(this.user[`${control}` + 'Bank'])
        else
          this[`${control}`].patchValue('')

        this[`${control}`].disable()

      }
    } else {
      for (const control of bankDetalsControls) {
        this[`${control}`].reset()
        this[`${control}`].enable();
      }
    }
    console.log(this.user)
  }

  public saveFormS05(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if (typeof this.user.registrationDatePersonal === 'string' && typeof this.user.dobPersonal === 'string') {
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,

        claimData: {
          ifscCode: this.formGroup.getRawValue().ifscCode,
          bankName: this.formGroup.getRawValue().bankName,
          bankBranch: this.formGroup.getRawValue().bankBranch,
          bankAddress: this.formGroup.getRawValue().bankAddress,
          micrCode: this.formGroup.getRawValue().micrCode + "",
          accountNumber: this.formGroup.getRawValue().accountNumber + "",
          benefitType: this.benefitType.value,
          benefitAmount: this.benefitAmount.value,
          documents: {
          socialForm6Doc1: this.fileOptions['socialForm6Doc1'],
          socialForm6Doc2: this.fileOptions['socialForm6Doc2'],
          socialForm6Doc3: this.fileOptions['socialForm6Doc3'],
          selfDeclaration: this.fileOptions['selfDeclaration']
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {      this.formGroup.markAllAsTouched();

      this.dialogs.alert('Please Update the form.');


    }
  }

  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get socialForm6Doc1() { return this.formGroup.get('socialForm6Doc1'); }
  get socialForm6Doc2() { return this.formGroup.get('socialForm6Doc2'); }
  get socialForm6Doc3() { return this.formGroup.get('socialForm6Doc3'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  // get declaration() { return this.formGroup.get('declaration'); }
  get ifscCode() {
    return this.formGroup.get('ifscCode');
  }

  get bankName() {
    return this.formGroup.get('bankName');
  }

  get bankBranch() {
    return this.formGroup.get('bankBranch');
  }

  get bankAddress() {
    return this.formGroup.get('bankAddress');
  }

  get micrCode() {
    return this.formGroup.get('micrCode');
  }

  get accountNumber() {
    return this.formGroup.get('accountNumber');
  }


}

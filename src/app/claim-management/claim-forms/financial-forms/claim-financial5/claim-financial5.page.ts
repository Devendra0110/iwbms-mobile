import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Storage } from '@ionic/storage';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
@Component({
  selector: 'app-claim-financial5',
  templateUrl: './claim-financial5.page.html',
  styleUrls: ['./claim-financial5.page.scss'],
})
export class ClaimFinancial5Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public maxTodaysDate : string;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    private dialogs: Dialogs, ) {
    super(transliterate, httpService, claimService, router, storage, toast);


    this.formGroup = new FormGroup({

      //english values

      deathCertificateIssueDate: new FormControl('', this.validationService.createValidatorsArray('deathCertificateIssueDate')),
      placeOfDocIssue: new FormControl('', this.validationService.createValidatorsArray('placeOfDocIssue')),
      deathCertificateNo: new FormControl('', this.validationService.createValidatorsArray('deathCertificateNo')),
      fullName: new FormControl('', this.validationService.createValidatorsArray('fullName')),
      dobPersonal: new FormControl('', this.validationService.createValidatorsArray('dobPersonal')),
      agePersonal: new FormControl('', this.validationService.createValidatorsArray('agePersonal')),
      relation: new FormControl('', this.validationService.createValidatorsArray('relation')),
      ifscCodeBank: new FormControl('', this.validationService.createValidatorsArray('ifscCodeBank')),
      bankNameBank: new FormControl('', this.validationService.createValidatorsArray('bankNameBank')),
      bankBranchBank: new FormControl('', this.validationService.createValidatorsArray('bankBranchBank')),
      bankAddressBank: new FormControl('', this.validationService.createValidatorsArray('bankAddressBank')),
      accountNumberBank: new FormControl('', this.validationService.createValidatorsArray('accountNumberBank')),
      deathCertificateDoc: new FormControl('', this.validationService.createValidatorsArray('deathCertificateDoc')),
      // proofOfDeathDoc: new FormControl('', this.validationService.createValidatorsArray('proofOfDeathDoc')),
      scannedPassbookDoc: new FormControl('', this.validationService.createValidatorsArray('scannedPassbookDoc')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      deathDate: new FormControl('', this.validationService.createValidatorsArray('deathDate')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      nomineeMobNumber: new FormControl('', this.validationService.createValidatorsArray('nomineeMobNumber')),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),



      //marathi values
      placeOfDocIssue_mr: new FormControl(''),
      fullName_mr: new FormControl(''),
      relation_mr: new FormControl(''),
      benefitType: new FormControl('', [Validators.required]),
      benefitAmount: new FormControl(''),
      nomineeCertificate: new FormControl('')

    });
  }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year])

  }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get deathCertificateIssueDate() { return this.formGroup.get('deathCertificateIssueDate'); }
  get placeOfDocIssue() { return this.formGroup.get('placeOfDocIssue'); }
  get deathCertificateNo() { return this.formGroup.get('deathCertificateNo'); }
  get fullName() { return this.formGroup.get('fullName'); }
  get dobPersonal() { return this.formGroup.get('dobPersonal'); }
  get agePersonal() { return this.formGroup.get('agePersonal'); }
  get relation() { return this.formGroup.get('relation'); }
  get ifscCodeBank() { return this.formGroup.get('ifscCodeBank'); }
  get bankNameBank() { return this.formGroup.get('bankNameBank'); }
  get bankAddressBank() { return this.formGroup.get('bankAddressBank'); }
  get bankBranchBank() { return this.formGroup.get('bankBranchBank'); }
  get accountNumberBank() { return this.formGroup.get('accountNumberBank'); }
  get deathCertificateDoc() { return this.formGroup.get('deathCertificateDoc') }
  // get proofOfDeathDoc() { return this.formGroup.get('proofOfDeathDoc') }
  get scannedPassbookDoc() { return this.formGroup.get('scannedPassbookDoc') }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc') }
  // get declaration() { return this.formGroup.get('declaration') }
  get nomineeMobNumber() { return this.formGroup.get('nomineeMobNumber') }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration') }
  get nomineeCertificate() { return this.formGroup.get('nomineeCertificate') }
  get deathDate() { return this.formGroup.get('deathDate') }

  //  marathi getters
  get placeOfDocIssue_mr() { return this.formGroup.get('placeOfDocIssue_mr'); }
  get fullName_mr() { return this.formGroup.get('fullName_mr'); }
  get relation_mr() { return this.formGroup.get('relation_mr'); }
  get bankNameBank_mr() { return this.formGroup.get('bankNameBank_mr'); }
  get bankAddressBank_mr() { return this.formGroup.get('bankAddressBank_mr'); }
  get bankBranchBank_mr() { return this.formGroup.get('bankBranchBank_mr'); }

}

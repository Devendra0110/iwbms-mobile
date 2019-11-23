import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Router } from '@angular/router';
import { TransliterationService } from './../../../../services/transliteration.service';
import { ClaimService } from './../../../../services/claim.service';
import { HttpService } from './../../../../services/http.service';
import { Toast } from '@ionic-native/toast/ngx';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import * as moment from 'moment';
@Component({
  selector: 'app-claim-financial1',
  templateUrl: './claim-financial1.page.html',
  styleUrls: ['./claim-financial1.page.scss'],
})
export class ClaimFinancial1Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public natureOfWorkEmpArray: any;
  public endDateFordobPersonal: any;
  public startDateFordobPersonal: any;
  public startDate: any;
  public lastYear: any;
  public issuingAuthorityArray = [];
  public todaysDate: any;
  public isifscCodeBankCodeFound: boolean;
  public bankDetails: any;
  public sortedArray = [];
  public maxTodaysDate : string;
  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,

    protected toast: Toast,
    private dialogs: Dialogs,


  ) {
    super(transliterate, httpService, claimService, router, storage, toast);

    this.formGroup = new FormGroup({
      deathCertificateIssueDate: new FormControl('', this.validationService.createValidatorsArray('deathCertificateIssueDate')),
      placeOfDocIssue: new FormControl('', this.validationService.createValidatorsArray('placeOfDocIssue')),
      deathCertificateNo: new FormControl('', this.validationService.createValidatorsArray('deathCertificateNo')),
      deathDate: new FormControl('', this.validationService.createValidatorsArray('deathDate')),
      fullName: new FormControl('', this.validationService.createValidatorsArray('fullName')),
      dobPersonal: new FormControl('', this.validationService.createValidatorsArray('dobPersonal')),
      agePersonal: new FormControl('', this.validationService.createValidatorsArray('agePersonal')),
      relation: new FormControl('', this.validationService.createValidatorsArray('relation')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      ifscCodeBank: new FormControl('', this.validationService.createValidatorsArray('ifscCodeBank')),
      bankNameBank: new FormControl('', this.validationService.createValidatorsArray('bankNameBank')),
      bankBranchBank: new FormControl('', this.validationService.createValidatorsArray('bankBranchBank')),
      bankAddressBank: new FormControl('', this.validationService.createValidatorsArray('bankAddressBank')),
      accountNumberBank: new FormControl('', this.validationService.createValidatorsArray('accountNumberBank')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      nomineeMobNumber: new FormControl('', this.validationService.createValidatorsArray('nomineeMobNumber')),
      benefitType: new FormControl('', [Validators.required]),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      placeOfDeath: new FormControl('', this.validationService.createValidatorsArray('placeOfDeath')),
      natureOfWork: new FormControl(''),
      issuingAuthority: new FormControl('', this.validationService.createValidatorsArray('issuingAuthority')),
      // document validations
      deathCertificateDoc: new FormControl('', this.validationService.createValidatorsArray('deathCertificateDoc')),
      proofOfDeathDoc: new FormControl('', this.validationService.createValidatorsArray('proofOfDeathDoc')),
      scannedPassbookDoc: new FormControl('', this.validationService.createValidatorsArray('scannedPassbookDoc')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      dateOfFir: new FormControl('', this.validationService.createValidatorsArray('dateOfFir')),
      FIRNo: new FormControl('', this.validationService.createValidatorsArray('FIRNo')),
      policeStationAdd: new FormControl('', this.validationService.createValidatorsArray('policeStationAdd')),


      //marathi values

      placeOfDocIssue_mr: new FormControl(''),
      fullName_mr: new FormControl(''),
      relation_mr: new FormControl(''),
      nomineeCertificate: new FormControl(''),
      placeOfDeath_mr: new FormControl(''),
      policeStationAdd_mr: new FormControl('')
    });
  }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year])

  }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get deathCertificateIssueDate() { return this.formGroup.get('deathCertificateIssueDate'); }
  get placeOfDocIssue() { return this.formGroup.get('placeOfDocIssue'); }
  get deathCertificateNo() { return this.formGroup.get('deathCertificateNo'); }
  get date() { return this.formGroup.get('date'); }
  get fullName() { return this.formGroup.get('fullName'); }
  get dobPersonal() { return this.formGroup.get('dobPersonal'); }
  get agePersonal() { return this.formGroup.get('agePersonal'); }
  get relation() { return this.formGroup.get('relation'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get ifscCodeBank() { return this.formGroup.get('ifscCodeBank'); }
  get bankNameBank() { return this.formGroup.get('bankNameBank'); }
  get bankAddressBank() { return this.formGroup.get('bankAddressBank'); }
  get bankBranchBank() { return this.formGroup.get('bankBranchBank'); }
  get accountNumberBank() { return this.formGroup.get('accountNumberBank'); }
  get deathCertificateDoc() { return this.formGroup.get('deathCertificateDoc') }
  get proofOfDeathDoc() { return this.formGroup.get('proofOfDeathDoc') }
  get scannedPassbookDoc() { return this.formGroup.get('scannedPassbookDoc') }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc') }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration') }
  get nomineeCertificate() { return this.formGroup.get('nomineeCertificate') }
  // get declaration() { return this.formGroup.get('declaration') }
  get deathDate() { return this.formGroup.get('deathDate') }
  get nomineeMobNumber() { return this.formGroup.get('nomineeMobNumber') }
  get issuingAuthority() { return this.formGroup.get('issuingAuthority') }
  get policeStationAdd() { return this.formGroup.get('policeStationAdd') }
  get policeStationAdd_mr() { return this.formGroup.get('policeStationAdd_mr') }

  get FIRNo() { return this.formGroup.get('FIRNo') }
  get dateOfFir() { return this.formGroup.get('dateOfFir') }

  get placeOfDeath() { return this.formGroup.get('placeOfDeath') }
  get natureOfWork() { return this.formGroup.get('natureOfWork') }

  //  marathi getters
  get placeOfDocIssue_mr() { return this.formGroup.get('placeOfDocIssue_mr'); }
  get fullName_mr() { return this.formGroup.get('fullName_mr'); }
  get relation_mr() { return this.formGroup.get('relation_mr'); }
  get bankNameBank_mr() { return this.formGroup.get('bankNameBank_mr'); }
  get bankAddressBank_mr() { return this.formGroup.get('bankAddressBank_mr'); }
  get bankBranchBank_mr() { return this.formGroup.get('bankBranchBank_mr'); }
  get placeOfDeath_mr() { return this.formGroup.get('placeOfDeath_mr'); }






  // private patchNominee() {
  //   const fullNameNominee_mr = `${this.sortedArray[0].firstNameFamily_mr} ${this.sortedArray[0].fatherOrHusbandName_mr} ${this.sortedArray[0].surname_mr}`;
  //   const nomineeBirthDateArray = moment(this.sortedArray[0].dobFamily).format('L');
  //   const fullNameNominee = `${this.sortedArray[0].firstNameFamily} ${this.sortedArray[0].fatherOrHusbandName} ${this.sortedArray[0].surname}`
  //   const splittedDateNominee = nomineeBirthDateArray.split('/');
  //   const nomineeBirthDate = {
  //     year: Number(splittedDateNominee[2]),
  //     month: Number(splittedDateNominee[0]),
  //     day: Number(splittedDateNominee[1])
  //   };
  //patch values
  // this.formGroup.get('fullName').patchValue(fullNameNominee);
  // this.formGroup.get('fullName_mr').patchValue(fullNameNominee_mr);
  // this.formGroup.get('dobPersonal').patchValue(nomineeBirthDate);
  // this.formGroup.get('relation').patchValue(this.sortedArray[0]['category']);
  // this.formGroup.get('aadharNumber').patchValue(this.sortedArray[0]['aadharNoFamily']);
  // this.calculateAge(this.dobPersonal.value);
}


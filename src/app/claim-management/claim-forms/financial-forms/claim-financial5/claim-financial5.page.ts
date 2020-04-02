import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Storage } from '@ionic/storage';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import * as moment from 'moment';

@Component({
  selector: 'app-claim-financial5',
  templateUrl: './claim-financial5.page.html',
  styleUrls: ['./claim-financial5.page.scss'],
})
export class ClaimFinancial5Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public maxTodaysDate: string;
  public isifscCodeBankCodeFound: boolean;
  public bankDetails: any;
  minDate: any;
  public nomineeCheck = false;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs, ) {
    super(transliterate, httpService, claimService, router, storage, toast, dialogs);
    this.files = { deathCertificateDoc: '', scannedPassbookDoc: '', aadharCardDoc: '', nomineeCertificate: '', selfDeclaration: '' };
    this.fileOptions = { deathCertificateDoc: '', scannedPassbookDoc: '', aadharCardDoc: '', nomineeCertificate: '', selfDeclaration: '' };


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
    this.getRelation();
    this.assignBenefits(true);
    this.minDate = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.sortedArray = this.familyDetailsArray.filter(data => {
      return data.category !== "self";
    })
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year])
    this.fullName.valueChanges.subscribe(value => {

      const childSelected = this.familyDetailsArray.find((child: any) => child.firstNameFamily === value)
      // this.dobPersonal.patchValue(childSelected.dobFamily);
      if (childSelected !== undefined) {
        this.aadharNumber.patchValue(childSelected.aadharNoFamily);
        this.relation.patchValue(childSelected.relation);
        // this.relation_mr.patchValue(childSelected.category_mr);
        // if (typeof childSelected.dobFamily === 'string') {
        //   childSelected.dobFamily = moment(childSelected.dobFamily).format('YYYY-MM-DD').split('/');
        //   childSelected.dobFamily = {
        //     year: Number(childSelected.dobFamily[2]),
        //     month: Number(childSelected.dobFamily[1]),
        //     day: Number(childSelected.dobFamily[0])
        //   };
        // }
        const formattedAge = moment(childSelected.dobFamily).format('YYYY-MM-DD');
        this.agePersonal.disable()
        this.dobPersonal.patchValue(formattedAge)
        this.agePersonal.patchValue(Number(this.calculateAge(formattedAge)))

      }
    })
  }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }

  get placeOfDocIssue() { return this.formGroup.get('placeOfDocIssue'); }
  get deathCertificateIssueDate() { return this.formGroup.get('deathCertificateIssueDate'); }
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



  searchByifscCodeBankCode() {
    this.bankDetails = {
      BANK: '',
      BRANCH: '',
      Address: ''
    };
    this.validationService.callifscCodeBankApi(this.ifscCodeBank.value).subscribe(bankDetails => {
      if (!!bankDetails) {
        this.isifscCodeBankCodeFound = true;
        this.bankDetails = bankDetails;
        this.formGroup.get('bankNameBank').patchValue(bankDetails['BANK']);
        this.formGroup.get('bankBranchBank').patchValue(bankDetails['BRANCH']);
        this.formGroup.get('bankAddressBank').patchValue(bankDetails['ADDRESS']);
        this.bankNameBank.disable();
        this.bankBranchBank.disable();
        this.bankAddressBank.disable();
      }
    },

      error => {
        this.dialogs.alert('IFSC code not found', '1000', 'bottom');
        this.bankDetails = {
          BANK: '',
          BRANCH: '',
          Address: ''
        };
        this.isifscCodeBankCodeFound = false;
      });

  }
  capitaliseifscCodeBank() {

    let value = this.ifscCodeBank.value;
    value = value.toString().toUpperCase();
    this.ifscCodeBank.setValue(value);
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
          deathCertificateIssueDate: this.formGroup.getRawValue().deathCertificateIssueDate,
          placeOfDocIssue: this.formGroup.getRawValue().placeOfDocIssue,
          deathCertificateNo: this.formGroup.getRawValue().deathCertificateNo,
          fullName: this.formGroup.getRawValue().fullName,
          // fullName_mr: this.formGroup.getRawValue().fullName_mr,
          dobPersonal: this.formGroup.getRawValue().dobPersonal,
          agePersonal: this.formGroup.getRawValue().agePersonal,
          relation: this.formGroup.getRawValue().relation,
          ifscCodeBank: this.formGroup.getRawValue().ifscCodeBank,
          bankNameBank: this.formGroup.getRawValue().bankNameBank,
          bankAddressBank: this.formGroup.getRawValue().bankAddressBank,
          bankBranchBank: this.formGroup.getRawValue().bankBranchBank,
          accountNumberBank: this.formGroup.getRawValue().accountNumberBank.toString(),
          deathDate: this.formGroup.getRawValue().deathDate,
          nomineeMobNumber: this.formGroup.getRawValue().nomineeMobNumber,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          benefitType: this.formGroup.getRawValue().benefitType,
          benefitAmount: this.formGroup.getRawValue().benefitAmount,
          placeOfDocIssue_mr: this.formGroup.getRawValue().placeOfDocIssue_mr,
          nomineeCheck: this.nomineeCheck,

          documents: {
            deathCertificateDoc: this.fileOptions['deathCertificateDoc'],
            // proofOfDeathDoc: this.fileOptions['proofOfDeathDoc'],
            scannedPassbookDoc: this.fileOptions['scannedPassbookDoc'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            nomineeCertificate: this.fileOptions['nomineeCertificate']
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {
      this.formGroup.markAllAsTouched();

      this.dialogs.alert('Please Update the form.');
    }
  }

  nomineeSwitch(event: any) {
    this.nomineeCheck = !this.nomineeCheck;
    if (this.nomineeCheck) {

      this.fullName.reset();
      this.dobPersonal.reset();
      this.relation.reset();
      this.aadharNumber.reset();
      this.fullName_mr.reset();
      this.agePersonal.reset();

      this.nomineeCertificate.clearValidators();

    } else {

      // this.patchNominee()


      this.nomineeCertificate.setValidators([Validators.required]);
      this.agePersonal.reset();
      this.fullName.reset();
      this.dobPersonal.reset();
      this.relation.reset();
      this.aadharNumber.reset();
      this.fullName_mr.reset()
      this.relation.disable();
      this.aadharNumber.disable()

    }
  }
  public calculateAgepatched(date: string): void {
    if (typeof date === 'string') {
      const dob = moment(date).format('YYYY-MM-DD');
      const age = moment().diff(dob, 'years');
      this.agePersonal.patchValue(age)
    }
  }

  openOtherDetails(event: any) {
    this.open = !this.open;
    if (!this.open) {
      this.formGroup.get('bankNameBank').patchValue(this.user['bankNameBank']);
      this.formGroup.get('bankBranchBank').patchValue(this.user['bankBranchBank']);
      this.formGroup.get('bankAddressBank').patchValue(this.user['bankAddressBank']);
      this.formGroup.get('accountNumberBank').patchValue(this.user['accountNumberBank']);
      this.formGroup.get('ifscCodeBank').patchValue(this.user['ifscCodeBank']);

    } else {
      this.formGroup.get('bankNameBank').reset()
      this.formGroup.get('bankBranchBank').reset()
      this.formGroup.get('bankAddressBank').reset()
      this.formGroup.get('accountNumberBank').reset()
      this.formGroup.get('ifscCodeBank').reset()
    }
  }
}

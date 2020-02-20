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
import { Constants } from 'src/assets/constants';

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
  public ifIfscCodeBank: boolean;
  public bankDetails: any;
  public sortedArray = [];
  public maxTodaysDate: string;
  public nomineeCheck = false;
  publicopen = true;
  minDate: string;



  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,

    protected toast: Toast,
    protected dialogs: Dialogs,


  ) {
    super(transliterate, httpService, claimService, router, storage, toast,dialogs);
    this.files = { deathCertificateDoc: '', firCertificate: '', scannedPassbookDoc: '', aadharCardDoc: '', nomineeCertificate: '', selfDeclaration: '',panchnamaDoc: '' };
    this.fileOptions = { deathCertificateDoc: '', firCertificate: '', scannedPassbookDoc: '', aadharCardDoc: '', nomineeCertificate: '', selfDeclaration: '' ,panchnamaDoc: '' };

    this.formGroup = new FormGroup({
      deathCertificateIssueDate: new FormControl('', this.validationService.createValidatorsArray('deathCertificateIssueDate')),
      placeOfDocIssue: new FormControl('', this.validationService.createValidatorsArray('placeOfDocIssue')),
      deathCertificateNo: new FormControl('', this.validationService.createValidatorsArray('deathCertificateNo')),
      deathDate: new FormControl('', this.validationService.createValidatorsArray('deathDate')),
      fullName: new FormControl('', this.validationService.createValidatorsArray('fullName')),
      dobPersonal: new FormControl('', this.validationService.createValidatorsArray('dobPersonal')),
      agePersonal: new FormControl ('', this.validationService.createValidatorsArray('agePersonal')),
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
      placeOfDeath: new FormControl('', this.validationService.createValidatorsArray('placeOfDeath')),
      natureOfWork: new FormControl(''),
      issuingAuthority: new FormControl('', this.validationService.createValidatorsArray('issuingAuthority')),
      // document validations
      deathCertificateDoc: new FormControl('', this.validationService.createValidatorsArray('deathCertificateDoc')),
      firCertificate: new FormControl('', this.validationService.createValidatorsArray('firCertificate')),
      scannedPassbookDoc: new FormControl('', this.validationService.createValidatorsArray('scannedPassbookDoc')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      dateOfFir: new FormControl('', this.validationService.createValidatorsArray('dateOfFir')),
      FIRNo: new FormControl('', this.validationService.createValidatorsArray('FIRNo')),
      policeStationAdd: new FormControl('', this.validationService.createValidatorsArray('policeStationAdd')),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      panchnamaDoc: new FormControl(null, this.validationService.createValidatorsArray('panchnamaDoc')),



      // marathi values

      placeOfDocIssue_mr: new FormControl(''),
      fullName_mr: new FormControl(''),
      relation_mr: new FormControl(''),
      nomineeCertificate: new FormControl(''),
      placeOfDeath_mr: new FormControl(''),
      policeStationAdd_mr: new FormControl('')
    });
    this.issuingAuthorityArray = Constants.ISSUING_AUTHORITY;

  }

  ngOnInit() {
    this.getRelation();
    this.assignBenefits(true);
    this.minDate = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.sortedArray = this.familyDetailsArray.filter(data => {
      return data.nominee === "yes" || data.nominee === "Yes"
    })

    setTimeout(()=>{
      this.patchNominee()
    },2000)
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    this.getNatureOfWorkEmp();
    this.fullName.disable();
    this.dobPersonal.disable();
    this.relation.disable();
    this.aadharNumber.disable();
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
  get firCertificate() { return this.formGroup.get('firCertificate') }
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
  get panchnamaDoc() { return this.formGroup.get('panchnamaDoc'); }

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
  private patchNominee() {
    const fullNameNominee_mr = `${this.sortedArray[0].firstNameFamily_mr} ${this.sortedArray[0].fatherOrHusbandName_mr} ${this.sortedArray[0].surname_mr}`;
    const nomineeBirthDateArray = moment(this.sortedArray[0].dobFamily).format('YYYY-MM-DD');
    const fullNameNominee = `${this.sortedArray[0].firstNameFamily} ${this.sortedArray[0].fatherOrHusbandName} ${this.sortedArray[0].surname}`
    
    //patch values
    this.formGroup.get('fullName').patchValue(fullNameNominee);
    this.formGroup.get('fullName_mr').patchValue(fullNameNominee_mr);
    this.formGroup.get('dobPersonal').patchValue(nomineeBirthDateArray);
    this.formGroup.get('relation').patchValue(Number(this.sortedArray[0]['relation']));
    this.formGroup.get('aadharNumber').patchValue(this.sortedArray[0]['aadharNoFamily']);
    
    this.agePersonal.disable();

  
  }
  public calculateAgepatched(date: string): void {
    if(typeof date === 'string'){
    const dob = moment(date).format('YYYY-MM-DD');
    const age = moment().diff(dob, 'years');
this.agePersonal.patchValue(age)
}}

 
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
      }    this.agePersonal.disable()

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

  nomineeSwitch(event: any) {
    this.nomineeCheck = !this.nomineeCheck;
    if (this.nomineeCheck) {

      this.fullName.enable();
      this.dobPersonal.enable();
      this.relation.enable();
      this.aadharNumber.enable();
      this.fullName.reset();
      this.fullName_mr.reset()
      this.dobPersonal.reset();
      this.relation.reset();
      this.aadharNumber.reset();
      this.agePersonal.reset()
      this.nomineeCertificate.setValidators([Validators.required]);


    } else {
      this.fullName.reset();
      this.dobPersonal.reset();
      this.relation.reset();
      this.aadharNumber.reset();
      this.fullName.disable();
      this.fullName_mr.reset()

      this.agePersonal.reset()

      this.dobPersonal.disable();
      this.relation.disable();
      this.aadharNumber.disable();
      this.nomineeCertificate.clearValidators();
      this.patchNominee()
    }
  }
  capitaliseifscCodeBank() {
   
    let value = this.ifscCodeBank.value;
    value = value.toString().toUpperCase();
    this.ifscCodeBank.setValue(value);
  }
  public getNatureOfWorkEmp(): void {
    this.httpService.getTypesOfWorker().subscribe((data: any) => {
      this.natureOfWorkEmpArray = data;
    });
  }

  
  public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,
        claimData: {
          deathCertificateIssueDate: this.formGroup.getRawValue().deathCertificateIssueDate,
          deathCertificateNo: this.formGroup.getRawValue().deathCertificateNo,
          ifscCodeBank: this.formGroup.getRawValue().ifscCodeBank,
          bankNameBank: this.formGroup.getRawValue().bankNameBank,
          bankBranchBank: this.formGroup.getRawValue().bankBranchBank,
          bankAddressBank: this.formGroup.getRawValue().bankAddressBank,
          accountNumberBank: this.formGroup.getRawValue().accountNumberBank.toString(),
          placeOfDocIssue: this.formGroup.getRawValue().placeOfDocIssue,
          deathDate: this.formGroup.getRawValue().deathDate,
          fullName: this.formGroup.getRawValue().fullName,
          fullName_mr: this.formGroup.getRawValue().fullName_mr,
          dobPersonal: this.formGroup.getRawValue().dobPersonal,
          agePersonal: this.formGroup.getRawValue().agePersonal,
          relation: this.formGroup.getRawValue().relation.toString(),
          nomineeMobNumber: this.formGroup.getRawValue().nomineeMobNumber,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          benefitType: this.formGroup.getRawValue().benefitType,
          benefitAmount: this.formGroup.getRawValue().benefitAmount,
          placeOfDocIssue_mr: this.formGroup.getRawValue().placeOfDocIssue_mr,
          natureOfWork: this.formGroup.getRawValue().natureOfWork,

          placeOfDeath: this.formGroup.getRawValue().placeOfDeath,
          placeOfDeath_mr: this.formGroup.getRawValue().placeOfDeath_mr,
          dateOfFir: this.formGroup.getRawValue().dateOfFir,
          FIRNo: this.formGroup.getRawValue().FIRNo,
          policeStationAdd: this.formGroup.getRawValue().policeStationAdd,
          issuingAuthority: this.formGroup.getRawValue().issuingAuthority,
          policeStationAdd_mr: this.formGroup.getRawValue().policeStationAdd_mr,
          nomineeCheck:this.nomineeCheck,


          documents: {
            deathCertificateDoc: this.fileOptions['deathCertificateDoc'],
            firCertificate: this.fileOptions['firCertificate'],
            scannedPassbookDoc: this.fileOptions['scannedPassbookDoc'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            nomineeCertificate: this.fileOptions['nomineeCertificate']

          }
        }
      };
      this.saveClaimForm(postObj);
    }
    else {
      this.formGroup.markAllAsTouched();
      this.dialogs.alert('Please Update the form.');
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


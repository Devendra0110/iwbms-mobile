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
import * as moment from 'moment';
import { Constants } from 'src/assets/constants';
import * as _ from 'lodash'

@Component({
  selector: 'app-claim-financial6',
  templateUrl: './claim-financial6.page.html',
  styleUrls: ['./claim-financial6.page.scss'],
})
export class ClaimFinancial6Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public maxTodaysDate : string;
  public isifscCodeBankCodeFound: boolean;
  public bankDetails: any;
  minDate: string;
  public issuingAuthorityArray = [];
  public PreviousClaimDetails;
  public sortedPreviousClaimDetails;
  parsedClaimData;
  public relation_type:string;
  constructor(
    private validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs, ) {


    super(transliterate, httpService, claimService, router, storage, toast,dialogs);
    this.files = { deathCertificateDoc: '', marriageCertificateDoc: '', scannedPassbookDoc: '', aadharCardDoc: '', selfDeclaration: '' };
    this.fileOptions = { deathCertificateDoc: '', marriageCertificateDoc: '', scannedPassbookDoc: '', aadharCardDoc: '', selfDeclaration: '' };

    this.formGroup = new FormGroup({
      //english values

      issuingAuthority: new FormControl('', this.validationService.createValidatorsArray('issuingAuthority')),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
  

      placeOfDocIssue: new FormControl("", this.validationService.createValidatorsArray('placeOfDocIssue')),
      deathCertificateIssueDate: new FormControl('', this.validationService.createValidatorsArray('deathCertificateIssueDate')),
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
      scannedPassbookDoc: new FormControl('', this.validationService.createValidatorsArray('scannedPassbookDoc')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      spouseMobNumber: new FormControl('', this.validationService.createValidatorsArray('spouseMobNumber')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      deathDate: new FormControl('', this.validationService.createValidatorsArray('deathDate')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      marriageCertificateDoc: new FormControl(''),
      //marathi values
      fullName_mr: new FormControl(''),
      relation_mr: new FormControl(''),
      bankNameBank_mr: new FormControl(''),
      bankBranchBank_mr: new FormControl(''),
      bankAddressBank_mr: new FormControl(''),
      placeOfDocIssue_mr: new FormControl(''),
      benefitType: new FormControl('', [Validators.required]),
      benefitAmount: new FormControl('')
    })
    this.issuingAuthorityArray = Constants.ISSUING_AUTHORITY;
    
  }

  ngOnInit() {
    this.claimHttpService.getPreviousClaims('F06', this.user.registration_no,this.JWTToken).subscribe(res => {
      this.PreviousClaimDetails = res;
      console.log(this.PreviousClaimDetails);
      this.sortedPreviousClaimDetails = _.last(this.PreviousClaimDetails);
      this.parsedClaimData = JSON.parse(this.sortedPreviousClaimDetails.claim_data)
      this.patchClaimData();

    })
    this.assignBenefits(true);
    this.minDate = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');


    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.sortedArray = this.familyDetailsArray.filter(data => {
      return data.category === "spouse"
    })
    this.patchNominee()
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year])
  }
  get issuingAuthority() { return this.formGroup.get('issuingAuthority') }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }

  get deathCertificateIssueDate() { return this.formGroup.get('deathCertificateIssueDate'); }
  get deathCertificateNo() { return this.formGroup.get('deathCertificateNo'); }
  get fullName() { return this.formGroup.get('fullName'); }
  get dobPersonal() { return this.formGroup.get('dobPersonal'); }
  get agePersonal() { return this.formGroup.get('agePersonal'); }
  get relation() { return this.formGroup.get('relation'); }
  get placeOfDocIssue() { return this.formGroup.get('placeOfDocIssue'); }
  get ifscCodeBank() { return this.formGroup.get('ifscCodeBank'); }
  get bankNameBank() { return this.formGroup.get('bankNameBank'); }
  get bankAddressBank() { return this.formGroup.get('bankAddressBank'); }
  get bankBranchBank() { return this.formGroup.get('bankBranchBank'); }
  get accountNumberBank() { return this.formGroup.get('accountNumberBank'); }
  get deathCertificateDoc() { return this.formGroup.get('deathCertificateDoc'); }
  get marriageCertificateDoc() { return this.formGroup.get('marriageCertificateDoc'); }
  get scannedPassbookDoc() { return this.formGroup.get('scannedPassbookDoc'); }
  // get declaration() { return this.formGroup.get('declaration'); }
  // get aadharCardDoc() { return this.formGroup.get('scannedPassbookDoc'); }
  get spouseMobNumber() { return this.formGroup.get('spouseMobNumber') }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration') }
  get deathDate() { return this.formGroup.get('deathDate') }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc') }

  //  marathi getters
  get fullName_mr() { return this.formGroup.get('fullName_mr'); }
  get relation_mr() { return this.formGroup.get('relation_mr'); }
  get placeOfDocIssue_mr() { return this.formGroup.get('placeOfDocIssue_mr'); }



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
      }
    },
    
      error => {
        this.toast.show('IFSC code not found', '1000', 'bottom');
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

  private patchNominee() {
    if(!this.parsedClaimData){
    const fullNameNominee_mr = `${this.sortedArray[0].firstNameFamily_mr} ${this.sortedArray[0].fatherOrHusbandName_mr} ${this.sortedArray[0].surname_mr}`;
    const nomineeBirthDateArray = moment(this.sortedArray[0].dobFamily).format('YYYY-MM-DD');
    const fullNameNominee = `${this.sortedArray[0].firstNameFamily} ${this.sortedArray[0].fatherOrHusbandName} ${this.sortedArray[0].surname}`
    
    //patch values
    this.formGroup.get('fullName').patchValue(fullNameNominee);
    this.formGroup.get('fullName_mr').patchValue(fullNameNominee_mr);
    this.formGroup.get('dobPersonal').patchValue(nomineeBirthDateArray);
    this.formGroup.get('agePersonal').patchValue(this.calculateAge(nomineeBirthDateArray))
    this.formGroup.get('relation').patchValue(this.sortedArray[0]['relation']);
    this.formGroup.get('aadharNumber').patchValue(this.sortedArray[0]['aadharNoFamily']);
    this.agePersonal.disable();
    this.fullName.disable();
    this.dobPersonal.disable()
    this.relation.disable()
this.aadharNumber.disable()
    if(this.sortedArray[0].relation==="4"){
      this.relation_type="Wife/पत्नी"
    }
    else{
      this.relation_type="Husband/पती"

    }}
  }


  public saveForm(): void {
    console.log(this.formGroup)
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const formData = new FormData();
      const postObj = {
        userData: this.user,
        claimData: {
          placeOfDocIssue: this.formGroup.getRawValue().placeOfDocIssue,
          placeOfDocIssue_mr: this.formGroup.getRawValue().placeOfDocIssue_mr,
          bankAddressBank: this.formGroup.getRawValue().bankAddressBank,
          deathCertificateIssueDate: this.formGroup.getRawValue().deathCertificateIssueDate,
          deathCertificateNo: this.formGroup.getRawValue().deathCertificateNo,
          fullName: this.formGroup.getRawValue().fullName,
          fullName_mr: this.formGroup.getRawValue().fullName_mr,
          dobPersonal: this.formGroup.getRawValue().dobPersonal,
          agePersonal: this.formGroup.getRawValue().agePersonal,
          relation: this.formGroup.getRawValue().relation,
          ifscCodeBank: this.formGroup.getRawValue().ifscCodeBank,
          bankNameBank: this.formGroup.getRawValue().bankNameBank,
          spouseMobNumber: this.formGroup.getRawValue().spouseMobNumber,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          deathDate: this.formGroup.getRawValue().deathDate,
          bankBranchBank: this.formGroup.getRawValue().bankBranchBank,
          accountNumberBank: this.formGroup.getRawValue().accountNumberBank.toString(),
          benefitType: this.formGroup.getRawValue().benefitType,
          benefitAmount: this.formGroup.getRawValue().benefitAmount,
          // currentNumberOfClaim: this.PreviousClaimDetails.length+1,
          issuingAuthority: this.formGroup.getRawValue().issuingAuthority,
          currentNumberOfClaim: this.PreviousClaimDetails.length+1,

          documents: {
            deathCertificateDoc: this.fileOptions['deathCertificateDoc'],
            marriageCertificateDoc: this.fileOptions['marriageCertificateDoc'],
            scannedPassbookDoc: this.fileOptions['scannedPassbookDoc'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],

          }
        }
      };

      this.saveClaimForm(postObj);
    } else {
      this.formGroup.markAllAsTouched();
      this.dialogs.alert('Please Update the form.');
    }
  }
  patchClaimData() {

    this.minDate = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
    if ( this.parsedClaimData) {
      this.formGroup.get('deathDate').patchValue(moment(this.parsedClaimData['deathDate']).format('YYYY-MM-DD'));
      this.formGroup.get('placeOfDocIssue').patchValue(this.parsedClaimData['placeOfDocIssue']);
      this.formGroup.get('spouseMobNumber').patchValue(this.parsedClaimData['spouseMobNumber']);
      this.formGroup.get('deathCertificateNo').patchValue(this.parsedClaimData['deathCertificateNo']);
      this.formGroup.get('aadharNumber').patchValue(this.parsedClaimData['aadharNumber']);
      this.formGroup.get('deathCertificateIssueDate').patchValue(moment(this.parsedClaimData['deathCertificateIssueDate']).format('YYYY-MM-DD'));
      this.formGroup.get('accountNumberBank').patchValue(this.parsedClaimData['accountNumberBank']);
      this.formGroup.get('bankAddressBank').patchValue(this.parsedClaimData['bankAddressBank']);
      this.formGroup.get('issuingAuthority').patchValue(this.parsedClaimData['issuingAuthority']);

      this.formGroup.get('bankBranchBank').patchValue(this.parsedClaimData['bankBranchBank']);
      this.formGroup.get('bankNameBank').patchValue(this.parsedClaimData['bankNameBank']);
      this.formGroup.get('ifscCodeBank').patchValue(this.parsedClaimData['ifscCodeBank']);
      this.deathDate.disable()
      this.placeOfDocIssue.disable()
      this.spouseMobNumber.disable()
      this.deathCertificateNo.disable()
      this.aadharNumber.disable()
      this.deathCertificateIssueDate.disable()
      this.accountNumberBank.disable()

      this.bankAddressBank.disable()
      this.bankBranchBank.disable()
      this.bankNameBank.disable()
      this.ifscCodeBank.disable()
      // this.formGroup.get('deathCertificateDoc').patchValue(this.parsedClaimData.documents.deathCertificateDoc);
      // this.formGroup.get('selfDeclaration').patchValue(this.parsedClaimData.documents.selfDeclaration);
      // this.formGroup.get('marriageCertificateDoc').patchValue(this.parsedClaimData.documents.marriageCertificateDoc);
      this.deathCertificateDoc.disable();
      this.scannedPassbookDoc.disable()
      this.marriageCertificateDoc.disable()

      this.formGroup.get('deathCertificateDoc').clearValidators();
      this.formGroup.get('scannedPassbookDoc').clearValidators();
      this.formGroup.get('marriageCertificateDoc').clearValidators();

    }
  }
  openOtherDetails(event: any) {
    this.open = !this.open;
  
    console.log(this.open)
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

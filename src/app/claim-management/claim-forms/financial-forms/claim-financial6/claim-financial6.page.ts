import { Component, OnInit } from '@angular/core';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-claim-financial6',
  templateUrl: './claim-financial6.page.html',
  styleUrls: ['./claim-financial6.page.scss'],
})
export class ClaimFinancial6Page implements OnInit {
  public formGroup: FormGroup;

  constructor( private validationService: ClaimValidationService) {  this.formGroup = new FormGroup({
    //english values
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
    verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
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
  })}

  ngOnInit() {
  }
  get deathCertificateIssueDate() { return this.formGroup.get('deathCertificateIssueDate'); }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
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
}

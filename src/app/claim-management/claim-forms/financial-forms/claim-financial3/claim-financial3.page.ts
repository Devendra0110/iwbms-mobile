import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';

@Component({
  selector: 'app-claim-financial3',
  templateUrl: './claim-financial3.page.html',
  styleUrls: ['./claim-financial3.page.scss'],
})
export class ClaimFinancial3Page implements OnInit {
  public formGroup: FormGroup;

  constructor(private validationService: ClaimValidationService) {
  this.formGroup = new FormGroup({
    // english
    bankNameBank: new FormControl('', this.validationService.createValidatorsArray('bankNameBank')),
    bankBranchBank: new FormControl('', this.validationService.createValidatorsArray('bankBranchBank')),
    amtOfLoan: new FormControl('', this.validationService.createValidatorsArray('amtOfLoan')),
    // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
    loanDate: new FormControl('', this.validationService.createValidatorsArray('loanDate')),
    loanPeriod: new FormControl('', this.validationService.createValidatorsArray('loanPeriod')),
    verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),


    //fileuploaders
    proofOfLoan: new FormControl('', this.validationService.createValidatorsArray('proofOfLoan')),
    proofOfNoHouse: new FormControl('', this.validationService.createValidatorsArray('proofOfNoHouse')),
    proofOfHouse: new FormControl('', this.validationService.createValidatorsArray('proofOfHouse')),
    selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
    interestCertificate: new FormControl('', Validators.required),

    // marathi
    bankNameBank_mr: new FormControl('', this.validationService.createValidatorsArray('bankNameBank_mr')),
    bankBranchBank_mr: new FormControl('', this.validationService.createValidatorsArray('bankBranchBank_mr')),
    benefitType: new FormControl('', [Validators.required]),
    benefitAmount: new FormControl(''),
    interestRate: new FormControl('', [Validators.required, Validators.maxLength(3)]),

  });
  }

  ngOnInit() {
  }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get bankNameBank() { return this.formGroup.get('bankNameBank'); }
  get bankBranchBank() { return this.formGroup.get('bankBranchBank'); }
  get amtOfLoan() { return this.formGroup.get('amtOfLoan'); }
  get proofOfHouse() { return this.formGroup.get('proofOfHouse'); }
  get proofOfNoHouse() { return this.formGroup.get('proofOfNoHouse'); }
  get proofOfLoan() { return this.formGroup.get('proofOfLoan'); }
  // get declaration() { return this.formGroup.get('declaration'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration') }
  get loanDate() { return this.formGroup.get('loanDate'); }
  get loanPeriod() { return this.formGroup.get('loanPeriod'); }
  get interestRate() { return this.formGroup.get('interestRate'); }
  get interestCertificate() { return this.formGroup.get('interestCertificate'); }

  // english getters
  get bankNameBank_mr() { return this.formGroup.get('bankNameBank_mr'); }
  get bankBranchBank_mr() { return this.formGroup.get('bankBranchBank_mr'); }
  get insCompName_mr() { return this.formGroup.get('insCompName_mr'); }


}

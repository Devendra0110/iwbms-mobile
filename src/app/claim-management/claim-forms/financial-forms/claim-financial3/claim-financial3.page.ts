import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';
import { TransliterationService } from './../../../../services/transliteration.service';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { ClaimService } from 'src/app/services/claim.service';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';

@Component({
  selector: 'app-claim-financial3',
  templateUrl: './claim-financial3.page.html',
  styleUrls: ['./claim-financial3.page.scss'],
})
export class ClaimFinancial3Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public maxTodaysDate : string;
  loanMinDate: string;

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
    this.files = { proofOfLoan: '', proofOfNoHouse: '', proofOfHouse: '', selfDeclaration: '' };
    this.fileOptions = { proofOfLoan: '', proofOfNoHouse: '', proofOfHouse: '', selfDeclaration: '' };
   
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
    this.assignBenefits(true);
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year])
    this.loanMinDate = moment('2018/01/17').format('YYYY-MM-DD');

  }
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
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }


  public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,
        claimData: {
          bankNameBank: this.formGroup.getRawValue().bankNameBank,
          bankBranchBank: this.formGroup.getRawValue().bankBranchBank,
          amtOfLoan: this.formGroup.getRawValue().amtOfLoan.toString(),
          loanDate: this.formGroup.getRawValue().loanDate,
          loanPeriod: this.formGroup.getRawValue().loanPeriod,
          benefitType: this.formGroup.getRawValue().benefitType,
          benefitAmount: this.formGroup.getRawValue().benefitAmount,
          bankNameBank_mr: this.formGroup.getRawValue().bankNameBank_mr,
          interestRate: this.formGroup.getRawValue().interestRate.toString(),
          bankBranchBank_mr: this.formGroup.getRawValue().bankBranchBank_mr,

          documents: {
            selfDeclaration: this.fileOptions['selfDeclaration'],
            proofOfLoan: this.fileOptions['proofOfLoan'],
            proofOfNoHouse: this.fileOptions['proofOfNoHouse'],
            proofOfHouse: this.fileOptions['proofOfHouse'],
            interestCertificate: this.fileOptions['interestCertificate'],
          }
        }
      };
      this.saveClaimForm(postObj);

    } else {
      this.formGroup.markAllAsTouched()
          this.dialogs.alert('Please Update the form.');
    }
  }
}

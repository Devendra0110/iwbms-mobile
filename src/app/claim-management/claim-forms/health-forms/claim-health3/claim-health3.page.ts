import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { Constants } from 'src/assets/constants';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-claim-health3',
  templateUrl: './claim-health3.page.html',
  styleUrls: ['./claim-health3.page.scss'],
})
export class ClaimHealth3Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public Delivery: Object = [];
  public maxTodaysDate: string;
  public minTreatmentDate: string;
  public familyArray: Array<string> = [];
  public ifIfscCodeBank: boolean;
  public childName:string;

  bankDetails: any = {
    BANK: '',
    BRANCH: '',
    ADDRESS: ''
  };

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
    this.familyArray = [];
    this.fileOptions = { health3Form3Doc1: '', health3Form3Doc2: '', aadharCardDoc: '', selfDeclaration: '',  };
    this.files = { health3Form3Doc1: '', health3Form3Doc2: '', aadharCardDoc: '', selfDeclaration: '' };

    this.formGroup = new FormGroup({
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      nameOfHospital: new FormControl('', this.validationService.createValidatorsArray('nameOfHospital')),
      nameOfDoctor: new FormControl('', this.validationService.createValidatorsArray('nameOfDoctor')),
      locationOfHospital: new FormControl('', this.validationService.createValidatorsArray('locationOfHospital')),
      dateOfOp: new FormControl('', this.validationService.createValidatorsArray('dateOfOp')),
      health3Form3Doc1: new FormControl('', this.validationService.createValidatorsArray('health3Form3Doc1')),
      health3Form3Doc2: new FormControl('', this.validationService.createValidatorsArray('health3Form3Doc2')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      nameOfHospital_mr: new FormControl(''),
      nameOfDoctor_mr: new FormControl(''),
      locationOfHospital_mr: new FormControl(''),
      ifscCodeBank: new FormControl('', this.validationService.createValidatorsArray('ifscCodeBank')),
      bankNameBank: new FormControl('', this.validationService.createValidatorsArray('bankNameBank')),
      bankBranchBank: new FormControl('', this.validationService.createValidatorsArray('bankBranchBank')),
      bankAddressBank: new FormControl('', this.validationService.createValidatorsArray('bankAddressBank')),
      accountNumberBank: new FormControl('', this.validationService.createValidatorsArray('accountNumberBank')),

      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
    });
     this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.Delivery = Constants.DELIVERY_TYPE;
  }

  ngOnInit() {
    this.assignBenefits(true);  
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    this.minTreatmentDate =typeof this.user.registrationDatePersonal==='string'?moment(this.user.registrationDatePersonal).format('YYYY-MM-DD'):moment(this.getIonDate([this.user.registrationDatePersonal.day,this.user.registrationDatePersonal.month,this.user.registrationDatePersonal.year])).format('YYYY-MM-DD')
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.familyArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.relation === '11') {
        return eachFamily;
      }
    });
    this.familyArray = _.reverse(_.sortBy(this.familyArray, 'ageFamily'));
    this.childrenDetail.valueChanges.subscribe((FamilyMemberId) => {
      const FamilyMemberDetail: any = this.familyArray.find((eachFamily: any) => eachFamily.family_detail_id === Number(FamilyMemberId));
      this.childName = FamilyMemberDetail.firstNameFamily+' '+FamilyMemberDetail.surname
      this.aadharNumber.patchValue(FamilyMemberDetail.aadharNoFamily);
      this.aadharNumber.disable();
    })
  }

  //english getters
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get nameOfHospital() { return this.formGroup.get('nameOfHospital'); }
  get nameOfDoctor() { return this.formGroup.get('nameOfDoctor'); }
  get locationOfHospital() { return this.formGroup.get('locationOfHospital'); }
  get dateOfOp() { return this.formGroup.get('dateOfOp'); }
  get health3Form3Doc1() { return this.formGroup.get('health3Form3Doc1'); }
  get health3Form3Doc2() { return this.formGroup.get('health3Form3Doc2'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc') }
  get ifscCodeBank() { return this.formGroup.get('ifscCodeBank'); }
  get bankNameBank() { return this.formGroup.get('bankNameBank'); }
  get bankAddressBank() { return this.formGroup.get('bankAddressBank'); }
  get bankBranchBank() { return this.formGroup.get('bankBranchBank'); }
  get accountNumberBank() { return this.formGroup.get('accountNumberBank'); }



  //marathi getters
  get nameOfHospital_mr() { return this.formGroup.get('nameOfHospital_mr'); }
  get nameOfDoctor_mr() { return this.formGroup.get('nameOfDoctor_mr'); }
  get locationOfHospital_mr() { return this.formGroup.get('locationOfHospital_mr'); }

  
    searchByifscCodeBank() {
    this.bankDetails = {
      BANK: '',
      BRANCH: '',
      ADDRESS: ''
    };
    this.claimHttpService.callIfscCodeApi(this.ifscCodeBank.value).subscribe(bankDetails => {
      if (!!bankDetails) {
        this.ifIfscCodeBank = true;
        this.formGroup.get('bankNameBank').patchValue(bankDetails['BANK']);
        this.formGroup.get('bankBranchBank').patchValue(bankDetails['BRANCH']);
        this.formGroup.get('bankAddressBank').patchValue(bankDetails['ADDRESS']);
        this.bankNameBank.disable();
        this.bankBranchBank.disable();
        this.bankAddressBank.disable();
      }
    },
      error1 => {
        this.dialogs.alert('IFSC Code Not Found.Please fill bank details manually', '1000', 'bottom')
        this.bankDetails = {
          BANK: '',
          BRANCH: '',
          ADDRESS: ''
        };
        this.ifIfscCodeBank = false;
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
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          childrenDetail: this.childName,
          nameOfHospital: this.formGroup.getRawValue().nameOfHospital,
          nameOfHospital_mr: this.formGroup.getRawValue().nameOfHospital_mr,
          nameOfDoctor: this.formGroup.getRawValue().nameOfDoctor,
          nameOfDoctor_mr: this.formGroup.getRawValue().nameOfDoctor_mr,
          locationOfHospital: this.formGroup.getRawValue().locationOfHospital,
          locationOfHospital_mr: this.formGroup.getRawValue().locationOfHospital_mr,
          dateOfOp:this.formGroup.getRawValue().dateOfOp,
          ifscCodeBank: this.formGroup.getRawValue().ifscCodeBank,
          bankNameBank: this.formGroup.getRawValue().bankNameBank,
          bankBranchBank: this.formGroup.getRawValue().bankBranchBank,
          bankAddressBank: this.formGroup.getRawValue().bankAddressBank,
          accountNumberBank: this.formGroup.getRawValue().accountNumberBank.toString(),

          benefitType: this.benefitType.value,
          benefitAmount: this.benefitAmount.value,
          documents: {
            health3Form3Doc1: this.fileOptions['health3Form3Doc1'],
            health3Form3Doc2: this.fileOptions['health3Form3Doc2'],
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

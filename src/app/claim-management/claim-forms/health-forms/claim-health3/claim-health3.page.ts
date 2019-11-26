import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
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
    private dialogs: Dialogs,
  ) {
    super(transliterate, httpService, claimService, router, storage, toast);
    this.familyArray = [];
    this.fileOptions = { health3Form3Doc1: '', health3Form3Doc2: '', aadharCardDoc: '', selfDeclaration: '' };
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
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),

    }); this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.Delivery = Constants.DELIVERY_TYPE;
    console.log(this.Delivery);
  }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    this.minTreatmentDate = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD')
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.familyArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.relation === '11') {
        return eachFamily;
      }
    });
    this.familyArray = _.reverse(_.sortBy(this.familyArray, 'ageFamily'));
    this.childrenDetail.valueChanges.subscribe((FamilyMemberId) => {
      const FamilyMemberDetail: any = this.familyArray.find((eachFamily: any) => eachFamily.family_detail_id === Number(FamilyMemberId));
      this.aadharNumber.patchValue(FamilyMemberDetail.aadharNoFamily);
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

  //marathi getters
  get nameOfHospital_mr() { return this.formGroup.get('nameOfHospital_mr'); }
  get nameOfDoctor_mr() { return this.formGroup.get('nameOfDoctor_mr'); }
  get locationOfHospital_mr() { return this.formGroup.get('locationOfHospital_mr'); }


  capitaliseifscCodeBank() {
    let value = this.ifscCodeBank.value;
    value = value.toString().toUpperCase();
    this.ifscCodeBank.setValue(value);
  }


  searchByifscCodeBank() {
    this.bankDetails = {
      BANK: '',
      BRANCH: '',
      ADDRESS: ''
    };
    this.claimHttpService.callIfscCodeApi(this.ifscCodeBank.value).subscribe(bankDetails => {
      if (bankDetails) {
        this.ifIfscCodeBank = true;
        this.formGroup.get('bankNameBank').patchValue(bankDetails['BANK']);
        this.formGroup.get('bankBranchBank').patchValue(bankDetails['BRANCH']);
        this.formGroup.get('bankAddressBank').patchValue(bankDetails['ADDRESS']);
      }
    },
      error1 => {
        this.toast.show('IFSC Code Not Found.Please fill bank details manually', '1000', 'bottom')
        this.bankDetails = {
          BANK: '',
          BRANCH: '',
          ADDRESS: ''
        };
        this.ifIfscCodeBank = false;
      });
  }

  save() {

  }
}

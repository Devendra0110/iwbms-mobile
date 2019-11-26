import * as _ from 'lodash';
import * as moment from 'moment';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SchemeID, UserInfo } from '../../../assets/common.interface';

import { ClaimService } from '../../services/claim.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { HttpService } from '../../services/http.service';
import { Network } from '@ionic-native/network/ngx';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { TransliterationService } from '../../services/transliteration.service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { ValidationService } from '../../services/validation.service';
import { serverUrl } from '../../../assets/config'

@Component({
  selector: 'app-claim-main-form',
  templateUrl: './claim-main-form.page.html',
  styleUrls: ['./claim-main-form.page.scss'],
})
export class ClaimMainFormPage implements OnInit {

  public JWTToken: any;
  public BocwID: any;
  public message: string;
  public open: boolean;
  public endDateFordobPersonal: any;
  public startDateFordobPersonal: any;
  public startDate: any;
  public todaysDate: any;
  public display: boolean;
  public claimMainForm: FormGroup;
  public getFile: boolean;
  public ifIfscCodeBank: boolean;
  public commonClaimArray = [];
  public schemeArray = [];
  public schemeObj = [];
  public familyDetailsArray: any;
  public editFormFlag = false;
  public editFormFlagObservable: Observable<any>;
  public editFormFlagObserver: any;

  bankDetails: any = {
    BANK: '',
    BRANCH: '',
    ADDRESS: ''
  };

  public genderOptions: string[] = [];
  public genderOptionsMarathi: string[] = [];
  public maritalStatusOptions: string[] = [];
  public maritalStatusOptionsMarathi: string[] = [];
  public rationCardTypeOptions: string[] = [];
  public rationCardTypeOptionsMarathi: string[] = [];
  public formUserInfo: object;
  public isSelectScheme: boolean;
  public selectedSchemeId: string;
  public selectedSchemeObj = {};
  public selectedCategoryObj = {};
  public userInfo: UserInfo;
  public uploadedImageUrl: string;
  public claimEligibilityObject: SchemeID;
  public saveFormNavigationFlag = false;
  public mode: any;
  public rejectReason: boolean;
  public claimId: string;
  public claimData: any;
  public applicantRegistrationDetails: any;
  public ackNo: any;


  constructor(
    private validationService: ValidationService,
    private userManagementService: UserManagementService,
    private transliterate: TransliterationService,
    private claimHttpService: ClaimService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private network: Network,
    private dialogs: Dialogs,
    private toast: Toast,
  ) {
    // network subscribers check the status of network even its type
    this.network.onDisconnect().subscribe(() => { });
    this.network.onConnect().subscribe(() => { });


    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const userData = this.router.getCurrentNavigation().extras.state;
        this.claimMainForm.patchValue(userData);
        this.BocwID = userData.bocw_id;
        this.JWTToken = userData.JWTToken;
        this.setInputDetails();
        this.calculateAge();
      } else {
        this.router.navigate(['claim-management/claim-verification']);
      }
    });

    this.formUserInfo = {};

    // fetch the list of gender from database
    this.httpService.getGenders().subscribe((genderArrObj: any) => {
      for (const i of genderArrObj) {
        this.genderOptions[Number(i.gender_id)] = i.gender;
        this.genderOptionsMarathi[Number(i.gender_id)] = i.gender_mr;
      }
    }, err => console.log(err));

    // fetch the list of marital-status from database
    this.httpService.getMaritalStatus().subscribe((maritalStatusArrObj: any) => {
      for (const i of maritalStatusArrObj) {
        this.maritalStatusOptions[Number(i.id)] = i.status;
        this.maritalStatusOptionsMarathi[Number(i.id)] = i.status_mr;
      }
    }, err => console.log(err));

    // fetch the list of Ration Card Types from database
    this.httpService.getRationCardTypes().subscribe((rationCardArrObj: any) => {
      for (const i of rationCardArrObj) {
        this.rationCardTypeOptions[Number(i.id)] = i.ration_card_type;
        this.rationCardTypeOptionsMarathi[Number(i.id)] = i.ration_card_type_mr;
      }
    }, err => console.log(err));

    this.claimMainForm = new FormGroup({
      // english values
      registration_no: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('registration_no')),
      registrationDatePersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('registrationDatePersonal')),
      renewalDate: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('renewalDate')),
      firstNamePersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('firstNamePersonal')),
      middleNamePersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('middleNamePersonal')),
      lastNamePersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('lastNamePersonal')),
      aadharNoPersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('aadharNoPersonal')),
      mobilePersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('mobilePersonal')),
      genderPersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('genderPersonal')),
      maritalStatusPersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('maritalStatusPersonal')),
      selectScheme: new FormControl({ value: '', }, this.validationService.createValidatorsArray('selectScheme')),
      selectSchemeCategory: new FormControl({ value: ''}, this.validationService.createValidatorsArray('selectSchemeCategory')),
      dobPersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('dobPersonal')),
      agePersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('agePersonal')),
      ifscCodeBank: new FormControl({ value: { value: '', disabled: true }, disabled: true }, this.validationService.createValidatorsArray('ifscCodeBank')),
      bankNameBank: new FormControl({ value: { value: '', disabled: true }, disabled: true }, this.validationService.createValidatorsArray('bankNameBank')),
      bankBranchBank: new FormControl({ value: { value: '', disabled: true }, disabled: true }, this.validationService.createValidatorsArray('bankBranchBank')),
      bankAddressBank: new FormControl({ value: { value: '', disabled: true }, disabled: true }, this.validationService.createValidatorsArray('bankAddressBank')),
      accountNumberBank: new FormControl({ value: { value: '', disabled: true }, disabled: true }, this.validationService.createValidatorsArray('accountNumberBank')),
      rationCardNumberPersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('rationCardNumberPersonal')),
      rationCardTypePersonal: new FormControl({ value: '', disabled: true }, this.validationService.createValidatorsArray('rationCardTypePersonal')),

      // marathi values
      firstNamePersonal_mr: new FormControl('', this.validationService.createValidatorsArray('firstNamePersonal_mr')),
      lastNamePersonal_mr: new FormControl('', this.validationService.createValidatorsArray('lastNamePersonal_mr')),
      middleNamePersonal_mr: new FormControl('', this.validationService.createValidatorsArray('middleNamePersonal_mr')),
      bankNameBank_mr: new FormControl('', this.validationService.createValidatorsArray('bankNameBank_mr')),
      bankBranchBank_mr: new FormControl('', this.validationService.createValidatorsArray('bankBranchBank_mr')),
      bankAddressBank_mr: new FormControl('', this.validationService.createValidatorsArray('bankAddressBank_mr'))
    });

    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.startDateFordobPersonal = this.changeToIonDateTime(60, 'years');
    this.endDateFordobPersonal = this.changeToIonDateTime(18, 'years');
    this.isSelectScheme = false;
    this.selectedSchemeId = '';
    this.selectedSchemeObj = {};
    this.selectedCategoryObj = {};


  }

  getClaimEligibility(registrationNo) {
    this.claimHttpService.getClaimEligibilityObject(registrationNo).subscribe(
      (data: any) => {
        if (data.message === 'SUCCESS') {
          this.claimEligibilityObject = data.data;
        }
      }, (error: any) => {
        this.toast.show('Failed to get your scheme eligibility. Please try again.', '1000', 'bottom').subscribe((toast) => {
        });
        console.log(error);
      }
    );
  }


  ngOnInit() {
    this.selectSchemeCategory.valueChanges.subscribe(value => {
      this.loadScheme(value.category_id);
    })
    this.selectScheme.valueChanges.subscribe(value => {
      this.onSelectSchemeChange(value);
    });
  
  }

  setInputDetails() {
    try {
      const allFormControls = this.claimMainForm.controls;
      this.getClaimDetails();
      this.getClaimEligibility(this.registration_no.value);
      this.userManagementService.getUserById(this.registration_no.value, this.JWTToken).subscribe(userInfo => {
        this.applicantRegistrationDetails = userInfo[0];
        this.familyDetailsArray = userInfo[0].family_details;
        const requiredUserInfo: Array<string> = Object.keys(allFormControls);
        this.formUserInfo = _.pick(userInfo[0], requiredUserInfo);
        this.formUserInfo['bocw_id'] = userInfo[0]['bocw_id'];
        // Object.assign(this.formUserInfo, this.convertIntoJSDate(_.pick(userInfo[0], ['dobPersonal', 'registrationDatePersonal'])));
        this.claimMainForm.patchValue(this.formUserInfo);
        this.uploadedImageUrl = `${serverUrl}bocw-registration/getfile/${userInfo[0].applicantPhotoFile}?x-access-token=${this.JWTToken}`;
        console.log(this.uploadedImageUrl);
        this.calculateAge();
      }, error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error)
    }

  }

  getClaimDetails() {
    this.claimHttpService.getSchemeCat(this.JWTToken).subscribe((data: any) => {
      this.schemeArray = data;
    }, (err: Error) => console.log(err)
    );
    this.claimHttpService.getSchemeDetail(this.JWTToken).subscribe((data: any) => {
      this.schemeObj = data;
    }, (err: Error) => console.log(err));
  }

  changeToIonDateTime(diff: any, timeUnit: string) {
    const date = moment(
      new Date(this.todaysDate.year, this.todaysDate.month - 1, this.todaysDate.day))
      .subtract(diff, timeUnit).format('DD/MM/YYYY').split('/');
    return this.getIonDate(date);
  }

  getIonDate(date: any): string {
    if (Number(date[1]) < 10 && Number(date[0]) < 10) return `${Number(date[2])}-0${Number(date[1])}-0${Number(date[0])}`;
    else if (Number(date[1]) < 10 && Number(date[0]) >= 10) return `${Number(date[2])}-0${Number(date[1])}-${Number(date[0])}`;
    else if (Number(date[1]) >= 10 && Number(date[0]) < 10) return `${Number(date[2])}-${Number(date[1])}-0${Number(date[0])}`;
    else return `${Number(date[2])}-${Number(date[1])}-${Number(date[0])}`;
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
        this.claimMainForm.get('bankNameBank').patchValue(bankDetails['BANK']);
        this.claimMainForm.get('bankBranchBank').patchValue(bankDetails['BRANCH']);
        this.claimMainForm.get('bankAddressBank').patchValue(bankDetails['ADDRESS']);
      }
    },
      error1 => {
        alert('IFSC Code Not Found.Please fill bank details manually');
        this.bankDetails = {
          BANK: '',
          BRANCH: '',
          ADDRESS: ''
        };
        this.ifIfscCodeBank = false;
      });
  }

  calculateAge() {
    const dob = moment(this.claimMainForm.get('dobPersonal').value).format('YYYY-MM-DD');
    this.claimMainForm.get('dobPersonal').patchValue(dob, { emitEvent: false });
    const age = moment().diff(dob, 'years');
    if (age > 17 && age < 61) {
      this.claimMainForm.get('agePersonal').setValue(age);
    } else {
      this.dialogs.alert('Applicant age should be greater than 18 and less than 60 ');
      alert('Applicant age should be greater than 18 and less than 60 ');
      this.claimMainForm.get('age').setValue('');
      this.claimMainForm.get('dobPersonal').setValue('');
    }
  }


  getFileDetails(event) {
    // for (let i = 0; i < event.target.files.length; i++) {
    const name = event.target.files[0].name;
    const type = event.target.files[0].type;
    const size = event.target.files[0].size;
    const modifiedDate = event.target.files[0].lastModifiedDate;


    if (event.target.files[0].size > 0 && event.target.files[0].size < 2097152) {
      // TODO: provide success message for file attachment.
      this.getFile = true;
      alert('File Upload Successfully');
    } else {
      // TODO: provide error message for file size
      this.getFile = false;
      alert('File Should Be Less Than 2MB');
      this.claimMainForm.get(event.target.id).setValue(null);

    }
  }

  // loading the  different forms
  setCommanClaimArray(schemeId: number) {
    this.commonClaimArray.length = 0;
    this.selectedCategoryObj = this.schemeArray.find(cat => Number(cat.category_id) === Number(schemeId));
    for (const each in this.schemeObj) {
      if (Number(this.schemeObj[each].category_id) === Number(schemeId)) {
        const scheme_number = this.schemeObj[each].scheme_number;
        this.schemeObj[each]['eligibility'] = this.claimEligibilityObject ? this.claimEligibilityObject[scheme_number] : false;
        this.commonClaimArray.push(this.schemeObj[each]);
      }
    }
  }

  loadScheme(value) {
    this.setCommanClaimArray(value);
  }

  transliterateValue(event) {
    let target: any;
    const targetsArray = event.target.id;
    target = this.claimMainForm.get(`${targetsArray}_mr`);

    try {
      this.transliterate
        .transliterateText(event.target.value, 'NAME')
        .subscribe((response: any) => {
          const result = response.split(';').map(item => {
            return item.split('^')[0];
          });

          target.patchValue(result.join(' '));
        });
    } catch {
      target.patchValue('');
    }
  }

  openOtherDetails(event: any) {
    this.open = !this.open;
  }

  onSelectSchemeChange(value) {
    this.isSelectScheme = true;
    this.selectedSchemeId = value;
    this.selectedSchemeObj = this.schemeObj.find(scheme => scheme.scheme_number === value);
    this.formUserInfo['schemeID'] = value;
    const selectedSchemeObject = this.schemeObj.find(scheme => scheme.scheme_number === value);
    this.formUserInfo['eligibilityForScheme'] = selectedSchemeObject.eligibility;
  }


  // english getters
  get registration_no() {
    return this.claimMainForm.get('registration_no');
  }

  get registrationDatePersonal() {
    return this.claimMainForm.get('registrationDatePersonal');
  }

  get renewalDate() {
    return this.claimMainForm.get('renewalDate');
  }

  get aadharNoPersonal() {
    return this.claimMainForm.get('aadharNoPersonal');
  }

  get firstNamePersonal() {
    return this.claimMainForm.get('firstNamePersonal');
  }

  get middleNamePersonal() {
    return this.claimMainForm.get('middleNamePersonal');
  }

  get lastNamePersonal() {
    return this.claimMainForm.get('lastNamePersonal');
  }

  get mobilePersonal() {
    return this.claimMainForm.get('mobilePersonal');
  }

  get genderPersonal() {
    return this.claimMainForm.get('genderPersonal');
  }

  get maritalStatusPersonal() {
    return this.claimMainForm.get('maritalStatusPersonal');
  }

  get selectScheme() {
    return this.claimMainForm.get('selectScheme');
  }

  get selectSchemeCategory() {
    return this.claimMainForm.get('selectSchemeCategory');
  }

  get dobPersonal() {
    return this.claimMainForm.get('dobPersonal');
  }

  get agePersonal() {
    return this.claimMainForm.get('agePersonal');
  }

  get ifscCodeBank() {
    return this.claimMainForm.get('ifscCodeBank');
  }

  get bankNameBank() {
    return this.claimMainForm.get('bankNameBank');
  }

  get bankAddressBank() {
    return this.claimMainForm.get('bankAddressBank');
  }

  get bankBranchBank() {
    return this.claimMainForm.get('bankBranchBank');
  }

  get accountNumberBank() {
    return this.claimMainForm.get('accountNumberBank');
  }

  get rationCardNumberPersonal() {
    return this.claimMainForm.get('rationCardNumberPersonal');
  }

  get rationCardTypePersonal() {
    return this.claimMainForm.get('rationCardTypePersonal');
  }

  // marathi getters
  get firstNamePersonal_mr() {
    return this.claimMainForm.get('firstNamePersonal_mr');
  }

  get middleNamePersonal_mr() {
    return this.claimMainForm.get('middleNamePersonal_mr');
  }

  get lastNamePersonal_mr() {
    return this.claimMainForm.get('lastNamePersonal_mr');
  }

  get bankNameBank_mr() {
    return this.claimMainForm.get('bankNameBank_mr');
  }

  get bankBranchBank_mr() {
    return this.claimMainForm.get('bankBranchBank_mr');
  }

  get bankAddressBank_mr() {
    return this.claimMainForm.get('bankAddressBank_mr');
  }


}

import * as _ from 'lodash';
import * as moment from 'moment';

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { ClaimService } from './../../../../services/claim.service';
import { ClaimValidationService } from './../../../../services/claim-validation.service';
import { Constants } from './../../../../../assets/constants';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { HttpService } from './../../../../services/http.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { TransliterationService } from './../../../../services/transliteration.service';

@Component({
  selector: 'app-claim-education6',
  templateUrl: './claim-education6.page.html',
  styleUrls: ['./claim-education6.page.scss'],
})

export class ClaimEducation6Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public getFile: boolean;
  public maxTodaysDate: string;
  public academicYear: Object = [];
  public childArray: Array<string> = [];
  public childDetail: any
  public sortedStandard: Array<string> = [];
  public dateReg: string;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimHttpService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    private dialogs: Dialogs
  ) {
    super(transliterate, httpService, claimHttpService, router, storage, toast);
    this.fileOptions = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: ''};
    this.files = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.academicYear = Constants.ACADEMIC_YEAR;

    this.formGroup = new FormGroup({
      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      institute: new FormControl('', this.validationService.createValidatorsArray('institute')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      placeInstitute: new FormControl('', this.validationService.createValidatorsArray('placeInstitute')),
      dateOfAdmission: new FormControl('', this.validationService.createValidatorsArray('dateOfAdmission')),
      certificates: new FormControl('', this.validationService.createValidatorsArray('certificates')),
      receipt: new FormControl('', this.validationService.createValidatorsArray('receipt')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      yearOfDegree: new FormControl('', this.validationService.createValidatorsArray('yearOfDegree')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      insPhNo: new FormControl('', this.validationService.createValidatorsArray('insPhNo')),
      insEmail: new FormControl('', this.validationService.createValidatorsArray('insEmail')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      degreeName: new FormControl('', this.validationService.createValidatorsArray('degreeName')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      // verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),

      // marathi form controls
      placeInstitute_mr: new FormControl(''),
      institute_mr: new FormControl(''),
      degreeName_mr: new FormControl(''),
    });

  }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    this.assignBenefits(false);
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.category === 'children') {
        return eachFamily;
      }
    });
    this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    console.log(this.childArray);
    this.childrenDetail.valueChanges.subscribe((childName) => {
      this.childDetail = this.childArray.find((child: any) => child.firstNameFamily === childName);
      this.aadharNumber.patchValue(this.childDetail.aadharNoFamily);
      this.age.patchValue(this.calculateAge(this.childDetail.dobFamily));
    });

    this.assignBenefits(false);

    this.standard.valueChanges.subscribe(value => {
      if (this.schemeDetails) {
        const benefitAmount = JSON.parse(this.schemeDetails.benefit_amount);
        if (Number(value) === 14 && this.schemeDetails.benefit_type === 'cash') {
          this.benefitAmount.patchValue(benefitAmount[0].postGraduation);
          this.academicYear = _.cloneDeep(Constants.ACADEMIC_YEAR).slice(0, 3);
        } else if (Number(value) === 19 && this.schemeDetails.benefit_type === 'cash') {
          this.benefitAmount.patchValue(benefitAmount[0].diploma);
          this.academicYear = _.cloneDeep(Constants.ACADEMIC_YEAR).slice(0, 3);
        }
      }
    });

    this.getEducation().subscribe((data: any[]) => {
      this.getEducationArray = data.slice(13, 19);
      this.sortedStandard = this.getEducationArray.filter(el => el.education_level_id === 14 || el.education_level_id === 19);
    });
    this.dateReg = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
  }


  // marathi getters
  get institute_mr(): AbstractControl { return this.formGroup.get('institute_mr'); }
  get degreeName_mr(): AbstractControl { return this.formGroup.get('degreeName_mr'); }
  get placeInstitute_mr(): AbstractControl { return this.formGroup.get('placeInstitute_mr'); }

  //english getters
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get institute() { return this.formGroup.get('institute'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get degreeName() { return this.formGroup.get('degreeName'); }
  get standard() { return this.formGroup.get('standard'); }
  get placeInstitute() { return this.formGroup.get('placeInstitute'); }
  get yearOfDegree() { return this.formGroup.get('yearOfDegree'); }
  get dateOfAdmission() { return this.formGroup.get('dateOfAdmission'); }
  get certificates() { return this.formGroup.get('certificates'); }
  get receipt() { return this.formGroup.get('receipt'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get age() { return this.formGroup.get('age'); }
  get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
  get insEmail() { return this.formGroup.get('insEmail'); }
  get insPhNo() { return this.formGroup.get('insPhNo'); }
  get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  // get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  // get declaration() { return this.formGroup.get('declaration'); }


  public saveForm(): void {
    const benefitAmountInt = Number(this.benefitAmount.value);
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }

      const postObj = {
        userData: this.user,
        claimData: {
          childrenDetail: this.formGroup.getRawValue().childrenDetail,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          age: this.formGroup.getRawValue().age,
          institute: this.formGroup.getRawValue().institute,
          standard: `${this.formGroup.getRawValue().standard}`,
          placeInstitute: this.formGroup.getRawValue().placeInstitute,
          institute_mr: this.formGroup.getRawValue().institute_mr,
          placeInstitute_mr: this.formGroup.getRawValue().placeInstitute_mr,
          yearOfDegree: this.formGroup.getRawValue().yearOfDegree,
          dateOfAdmission: this.formGroup.getRawValue().dateOfAdmission,
          degreeName: this.formGroup.getRawValue().degreeName,
          degreeName_mr: this.formGroup.getRawValue().degreeName_mr,
          insEmail: `${this.formGroup.getRawValue().insEmail}`,
          insPhNo: `${this.formGroup.getRawValue().insPhNo}`,
          benefitType: this.benefitType.value,
          benefitAmount: benefitAmountInt,
          documents: {
            certificates: this.fileOptions['certificates'],
            receipt: this.fileOptions['receipt'],
            bonafideDoc: this.fileOptions['bonafideDoc'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
            schoolIdDoc: this.fileOptions['schoolIdDoc'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            rationCardDoc: this.fileOptions['rationCardDoc'],
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {
      this.dialogs.alert('Please Update the form.');
    }
  }
}

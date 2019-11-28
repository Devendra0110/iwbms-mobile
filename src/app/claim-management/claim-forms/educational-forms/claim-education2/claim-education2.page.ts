import * as _ from 'lodash';

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { ClaimService } from './../../../../services/claim.service';
import { ClaimValidationService } from './../../../../services/claim-validation.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { HttpService } from './../../../../services/http.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { TransliterationService } from './../../../../services/transliteration.service';

@Component({
  selector: 'app-claim-education2',
  templateUrl: './claim-education2.page.html',
  styleUrls: ['./claim-education2.page.scss'],
})

export class ClaimEducation2Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public getFile: boolean;
  public childArray: Array<string> = [];
  public childDetail: any
  public sortedStandard: Object;

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
    this.fileOptions = { fileSelect: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { fileSelect: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup({

      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      school: new FormControl('', this.validationService.createValidatorsArray('school')),
      placeSchool: new FormControl('', this.validationService.createValidatorsArray('placeSchool')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      boardOfEducation: new FormControl('', this.validationService.createValidatorsArray('boardOfEducation')),
      year: new FormControl('', this.validationService.createValidatorsArray('year')),
      seatNumber: new FormControl('', this.validationService.createValidatorsArray('seatNumber')),
      marksObtained: new FormControl('', this.validationService.createValidatorsArray('marksObtained')),
      totalMarks: new FormControl('', this.validationService.createValidatorsArray('totalMarks')),
      percentage: new FormControl('', this.validationService.createValidatorsArray('percentage')),
      fileSelect: new FormControl('', this.validationService.createValidatorsArray('fileSelect')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
    // verifyDocumentCheck : new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),

      // marathi form controls
      school_mr: new FormControl(''),
      placeSchool_mr: new FormControl(''),
      boardOfEducation_mr: new FormControl(''),
    });

   }

  ngOnInit() {
    this.assignBenefits(true);
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.category === 'children') {
        return eachFamily;
      }
    });
    this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    console.log(this.childArray);
    this.childrenDetail.valueChanges.subscribe((childName) => {
      this.childDetail = this.childArray.find((child: any) => child.firstNameFamily === childName );
      this.aadharNumber.patchValue(this.childDetail.aadharNoFamily);
      this.age.patchValue(this.calculateAge(this.childDetail.dobFamily));
    });

    this.getEducation().subscribe((data: any[]) => {
      this.getEducationArray = data.slice(9, 12);
      this.sortedStandard = this.getEducationArray.filter((el: any) => el.education_level_id !== 11);
    });
  }

  // marathi getters
  get school_mr(): AbstractControl { return this.formGroup.get('school_mr'); }
  get placeSchool_mr(): AbstractControl { return this.formGroup.get('placeSchool_mr'); }
  get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }

  // english getters
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get school() { return this.formGroup.get('school'); }
  get year() { return this.formGroup.get('year'); }
  get standard() { return this.formGroup.get('standard'); }
  get percentage() { return this.formGroup.get('percentage'); }
  get placeSchool() { return this.formGroup.get('placeSchool'); }
  get boardOfEducation() { return this.formGroup.get('boardOfEducation'); }
  get seatNumber() { return this.formGroup.get('seatNumber'); }
  get fileSelect() { return this.formGroup.get('fileSelect'); }
  get totalMarks() { return this.formGroup.get('totalMarks'); }
  get marksObtained() { return this.formGroup.get('marksObtained'); }
  get age() { return this.formGroup.get('age'); }
  get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
  get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
  // get verifyDocumentCheck() {return this.formGroup.get('verifyDocumentCheck'); }
  // get declaration() { return this.formGroup.get('declaration'); }

  public calculatePer() {
    const marksObtained = Number(this.formGroup.get('marksObtained').value);
    const totalMarks = Number(this.formGroup.get('totalMarks').value);
    const percentage = Number(marksObtained / totalMarks) * 100;
    if (percentage >= 50) {
        if (totalMarks >= marksObtained) {
            this.formGroup.get('percentage').setValue(percentage.toPrecision(3));
        }
        else if (totalMarks === 0) {
            return;
        } else {
            this.toast.show('Marks obtained cannot be more than total marks', '1000', 'bottom').subscribe(() => { })
            this.formGroup.get('percentage').setValue(0);
            this.formGroup.get('marksObtained').reset();
            this.formGroup.get('totalMarks').reset();
        }
    } else {
        this.toast.show('Percentage should be more than 50', '1000', 'bottom')
        this.formGroup.get('percentage').setValue(0);
        this.formGroup.get('marksObtained').reset();
        this.formGroup.get('totalMarks').reset();
    }
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
          childrenDetail: this.formGroup.getRawValue().childrenDetail,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          age: this.formGroup.getRawValue().age,
          standard: `${this.formGroup.getRawValue().standard}`,
          year: `${this.formGroup.getRawValue().year}`,
          school: this.formGroup.getRawValue().school,
          school_mr: this.formGroup.getRawValue().school_mr,
          placeSchool: this.formGroup.getRawValue().placeSchool,
          placeSchool_mr: this.formGroup.getRawValue().placeSchool_mr,
          boardOfEducation: this.formGroup.getRawValue().boardOfEducation,
          boardOfEducation_mr: this.formGroup.getRawValue().boardOfEducation_mr,
          seatNumber: `${this.formGroup.getRawValue().seatNumber}`,
          marksObtained: `${this.formGroup.getRawValue().marksObtained}`,
          totalMarks: `${this.formGroup.getRawValue().totalMarks}`,
          percentage: `${this.formGroup.getRawValue().percentage}`,
          benefitType: this.benefitType.value,
          benefitAmount: Number(this.benefitAmount.value),
          documents: {
            fileSelect: this.fileOptions['fileSelect'],
            schoolIdDoc: this.fileOptions['schoolIdDoc'],
            bonafideDoc: this.fileOptions['bonafideDoc'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            rationCardDoc: this.fileOptions['rationCardDoc'],
          }
        }
      };
      this.saveClaimForm(postObj);
    }else {
      this.dialogs.alert('Please Update the form.');
    }
  }
}

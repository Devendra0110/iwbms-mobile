import * as _ from 'lodash';

import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-claim-education1',
  templateUrl: './claim-education1.page.html',
  styleUrls: ['./claim-education1.page.scss'],
})

export class ClaimEducation1Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public getFile: boolean;
  public childArray: Array<string> = [];
  public childDetail: any

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimHttpService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs,
  ) {
    super(transliterate, httpService, claimHttpService, router, storage, toast,dialogs);
    this.fileOptions = { attendanceCertificate: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { attendanceCertificate: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup({

      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      school: new FormControl('', this.validationService.createValidatorsArray('school')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      placeSchool: new FormControl('', this.validationService.createValidatorsArray('placeSchool')),
      year: new FormControl('', ),
      attendanceCertificate: new FormControl('', this.validationService.createValidatorsArray('attendanceCertificate')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      // schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      // boardOfEducation: new FormControl('', this.validationService.createValidatorsArray('boardOfEducation')),

      // marathi form controls
      school_mr: new FormControl(''),
      placeSchool_mr: new FormControl(''),
      // boardOfEducation_mr: new FormControl(''),
    });

  }

  ngOnInit() {
    this.year.setValidators([
      Validators.required,
      Validators.pattern('^[0-9]*\.?[0-9]{0,2}$'),
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.min(Number(this.user.registrationDatePersonal.slice(0, 4)) - 1),
      Validators.max(Number(new Date().getFullYear()))
    ])
    this.year.updateValueAndValidity();
    this.assignBenefits(false);
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.category === 'children') {
        return eachFamily;
      }
    });
    this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    this.childrenDetail.valueChanges.subscribe((childName) => {
      this.childDetail = this.childArray.find((child: any) => child.firstNameFamily === childName);
      this.aadharNumber.patchValue(this.childDetail.aadharNoFamily)
      this.aadharNumber.disable();
      this.age.patchValue(this.calculateAge(this.childDetail.dobFamily))
      this.age.disable();
    });

    this.standard.valueChanges.subscribe(value => {
      const amountToPatch = JSON.parse(this.schemeDetails.benefit_amount);
      for (const index in amountToPatch) {
        for (const key in amountToPatch[index]) {
          const standards = key.split('TO');
          if (Number(value) >= Number(standards[0].trim()) && Number(value) <= Number(standards[1].trim()) && this.schemeDetails.benefit_type === 'cash') {
            this.benefitAmount.patchValue(amountToPatch[index][key]);
            break;
          } else {
            this.benefitAmount.patchValue(undefined, { emitEvent: false });
          }
        }
      }
      if (!this.benefitAmount.value) {
        this.toast.show('This scheme is not for selected standard.', '1000', 'bottom')
      }
    });

    this.getEducation().subscribe((data: any[]) => {
      const amountToPatch = JSON.parse(this.schemeDetails.benefit_amount);
      let minStd, maxStd;
      for (const index in amountToPatch) {
        for (const key in amountToPatch[index]) {
          const standards = key.split('TO');
          minStd = minStd ? Math.min(minStd, Number(standards[0].trim())) : Number(standards[0].trim());
          maxStd = maxStd ? Math.max(maxStd, Number(standards[1].trim())) : Number(standards[1].trim());
        }
      }
      this.getEducationArray = data.slice(minStd - 1, maxStd);
    });
  }

  // marathi getters
  get school_mr(): AbstractControl { return this.formGroup.get('school_mr'); }
  get placeSchool_mr(): AbstractControl { return this.formGroup.get('placeSchool_mr'); }
  // get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }

  // english getters
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get age() { return this.formGroup.get('age'); }
  get school() { return this.formGroup.get('school'); }
  get standard() { return this.formGroup.get('standard'); }
  get placeSchool() { return this.formGroup.get('placeSchool'); }
  get year() { return this.formGroup.get('year'); }
  get attendanceCertificate() { return this.formGroup.get('attendanceCertificate'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  // get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
  // get boardOfEducation() { return this.formGroup.get('boardOfEducation'); }
  // get declaration() { return this.formGroup.get('declaration'); }

  public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if (typeof this.user.registrationDatePersonal === 'string' && typeof this.user.dobPersonal === 'string') {
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
          placeSchool: this.formGroup.getRawValue().placeSchool,
          boardOfEducation: this.formGroup.getRawValue().boardOfEducation,
          boardOfEducation_mr: this.formGroup.getRawValue().boardOfEducation_mr,
          school_mr: this.formGroup.getRawValue().school_mr,
          placeSchool_mr: this.formGroup.getRawValue().placeSchool_mr,
          benefitType: this.benefitType.value,
          benefitAmount: Number(this.benefitAmount.value),
          documents: {
            attendanceCertificate: this.fileOptions['attendanceCertificate'],
            bonafideDoc: this.fileOptions['bonafideDoc'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            rationCardDoc: this.fileOptions['rationCardDoc'],
            // schoolIdDoc: this.fileOptions['schoolIdDoc'],
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {
      this.formGroup.markAllAsTouched();
      alert('Please Update the form.');
    }
  }

}
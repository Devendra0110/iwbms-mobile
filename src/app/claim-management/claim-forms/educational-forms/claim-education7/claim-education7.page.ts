import * as moment from 'moment';

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-claim-education7',
  templateUrl: './claim-education7.page.html',
  styleUrls: ['./claim-education7.page.scss'],
})
export class ClaimEducation7Page implements OnInit {

public formGroup: FormGroup;

  constructor(
    private validationService: ClaimValidationService,
    private toast: Toast) {

    this.formGroup = new FormGroup({
      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      institute: new FormControl('', this.validationService.createValidatorsArray('institute')),
      placeInstitute: new FormControl('', this.validationService.createValidatorsArray('placeInstitute')),
      certificates: new FormControl('', this.validationService.createValidatorsArray('certificates')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      receipt: new FormControl('', this.validationService.createValidatorsArray('receipt')),
      year: new FormControl('', this.validationService.createValidatorsArray('year')),
      startDate: new FormControl('', this.validationService.createValidatorsArray('startDate')),
      endDate: new FormControl('', this.validationService.createValidatorsArray('endDate')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      insPhNo: new FormControl('', this.validationService.createValidatorsArray('insPhNo')),
      insEmail: new FormControl('', this.validationService.createValidatorsArray('insEmail')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      courseFee: new FormControl('', this.validationService.createValidatorsArray('courseFee')),
      regNoInstitute: new FormControl('', this.validationService.createValidatorsArray('regNoInstitute')),
      regAuthName: new FormControl('', this.validationService.createValidatorsArray('regAuthName')),
      // bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck :new FormControl('',this.validationService.createValidatorsArray('verifyDocumentCheck')),

      // marathi form controls
      placeInstitute_mr: new FormControl(''),
      institute_mr: new FormControl(''),
      regAuthName_mr: new FormControl('')

      
    });

   }

  ngOnInit() {
  }

   //marathi getters
   get institute_mr(): AbstractControl { return this.formGroup.get('institute_mr'); }
   get placeInstitute_mr(): AbstractControl { return this.formGroup.get('placeInstitute_mr'); }
   get regAuthName_mr(): AbstractControl { return this.formGroup.get('regAuthName_mr'); }
 
   //english getters
   get verifyDocumentCheck() {return this.formGroup.get('verifyDocumentCheck'); }
   get childrenDetail() { return this.formGroup.get('childrenDetail'); }
   get aadharNumber() { return this.formGroup.get('aadharNumber'); }
   get year() { return this.formGroup.get('year'); }
   get institute() { return this.formGroup.get('institute'); }
   get placeInstitute() { return this.formGroup.get('placeInstitute'); }
   get certificates() { return this.formGroup.get('certificates'); }
   get receipt() { return this.formGroup.get('receipt'); }
   get startDate() { return this.formGroup.get('startDate'); }
   get endDate() { return this.formGroup.get('endDate'); }
   get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
   get age() { return this.formGroup.get('age'); }
   get courseFee() { return this.formGroup.get('courseFee'); }
   get regNoInstitute() { return this.formGroup.get('regNoInstitute'); }
   get insEmail() { return this.formGroup.get('insEmail'); }
   get insPhNo() { return this.formGroup.get('insPhNo'); }
   get regAuthName() { return this.formGroup.get('regAuthName'); }
   // get declaration() { return this.formGroup.get('declaration'); }
   get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
   get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
   // get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
 

   checkDate(): void {
    const startDateJson = this.formGroup.get('startDate').value;
    const endDateJson = this.formGroup.get('endDate').value;

    const startDate = moment(
      new Date(
        startDateJson.year,
        startDateJson.month - 1,
        startDateJson.day
      )
    );

    const endDate = moment(
      new Date(
        endDateJson.year,
        endDateJson.month - 1,
        endDateJson.day
      )
    );

    if (endDate.diff(startDate) < 0) {
      this.formGroup.controls.endDate.patchValue('');
      this.toast.show('End Date cannot be smaller than Start Date', '1000', 'bottom').subscribe((toast) => {
      });
    }
    if ((this.startDate == null || this.endDate == null)) {
      this.toast.show('Enter Valid Date', '1000', 'bottom').subscribe((toast) => {
      });
    }
  }

}

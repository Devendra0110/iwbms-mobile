import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimValidationService } from 'src/app/services/claim-validation.service';

@Component({
  selector: 'app-claim-education6',
  templateUrl: './claim-education6.page.html',
  styleUrls: ['./claim-education6.page.scss'],
})
export class ClaimEducation6Page implements OnInit {

  public formGroup: FormGroup;

  constructor(private validationService: ClaimValidationService) { 

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
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
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
      degreeName_mr: new FormControl('', this.validationService.createValidatorsArray('degreeName_mr')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),


      // marathi form controls
      placeInstitute_mr: new FormControl(''),
      institute_mr: new FormControl(''),
    });

  }

  ngOnInit() {
  }


  // marathi getters
  get institute_mr(): AbstractControl { return this.formGroup.get('institute_mr'); }
  get degreeName_mr(): AbstractControl { return this.formGroup.get('degreeName_mr'); }
  get placeInstitute_mr(): AbstractControl { return this.formGroup.get('placeInstitute_mr'); }

  //english getters
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
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
  // get declaration() { return this.formGroup.get('declaration'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }

}

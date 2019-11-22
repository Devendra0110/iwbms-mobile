import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimValidationService } from 'src/app/services/claim-validation.service';

@Component({
  selector: 'app-claim-education5',
  templateUrl: './claim-education5.page.html',
  styleUrls: ['./claim-education5.page.scss'],
})

export class ClaimEducation5Page implements OnInit {

  public formGroup: FormGroup;

  constructor(private validationService: ClaimValidationService) {

    this.formGroup = new FormGroup({
      // english form controls
      familyRelation: new FormControl('', this.validationService.createValidatorsArray('familyRelation')),
      institute: new FormControl('', this.validationService.createValidatorsArray('institute')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      placeInstitute: new FormControl('', this.validationService.createValidatorsArray('placeInstitute')),
      dateOfAdmission: new FormControl('', this.validationService.createValidatorsArray('dateOfAdmission')),
      certificates: new FormControl('', this.validationService.createValidatorsArray('certificates')),
      receipt: new FormControl('', this.validationService.createValidatorsArray('receipt')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      yearOfDegree: new FormControl('', this.validationService.createValidatorsArray('yearOfDegree')),
      degreeName: new FormControl('', this.validationService.createValidatorsArray('degreeName')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      insEmail: new FormControl('', this.validationService.createValidatorsArray('insEmail')),
      insPhNo: new FormControl('', this.validationService.createValidatorsArray('insPhNo')),
      // bookReceipt: new FormControl('', this.validationService.createValidatorsArray('bookReceipt')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      category: new FormControl('', this.validationService.createValidatorsArray('category')),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),


      // marathi form controls
      placeInstitute_mr: new FormControl(''),
      // degreeName_mr: new FormControl(''),
      institute_mr: new FormControl(''),
    });

   }

  ngOnInit() {
  }

    //marathi getters
    get institute_mr(): AbstractControl { return this.formGroup.get('institute_mr'); }
    get placeInstitute_mr(): AbstractControl { return this.formGroup.get('placeInstitute_mr'); }
    // get degreeName_mr(): AbstractControl { return this.formGroup.get('degreeName_mr'); }
  
    //english getters
    get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
    get familyRelation() { return this.formGroup.get('familyRelation'); }
    get institute() { return this.formGroup.get('institute'); }
    get standard() { return this.formGroup.get('standard'); }
    get category() { return this.formGroup.get('category'); }
    get aadharNumber() { return this.formGroup.get('aadharNumber'); }
    get placeInstitute() { return this.formGroup.get('placeInstitute'); }
    get dateOfAdmission() { return this.formGroup.get('dateOfAdmission'); }
    get certificates() { return this.formGroup.get('certificates'); }
    get receipt() { return this.formGroup.get('receipt'); }
    get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
    get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
    get age() { return this.formGroup.get('age'); }
    get yearOfDegree() { return this.formGroup.get('yearOfDegree'); }
    get degreeName() { return this.formGroup.get('degreeName'); }
    get insPhNo() { return this.formGroup.get('insPhNo'); }
    get insEmail() { return this.formGroup.get('insEmail'); }
    get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
    // get declaration() { return this.formGroup.get('declaration'); }
    get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
    get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
    // get bookReceipt() { return this.formGroup.get('bookReceipt'); }

}

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimValidationService } from './../../../../services/claim-validation.service';

@Component({
  selector: 'app-claim-education3',
  templateUrl: './claim-education3.page.html',
  styleUrls: ['./claim-education3.page.scss'],
})
export class ClaimEducation3Page implements OnInit {

  public formGroup: FormGroup;

  constructor(private validationService: ClaimValidationService) {

    this.formGroup = new FormGroup({
      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      college: new FormControl('', this.validationService.createValidatorsArray('college')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      placeCollege: new FormControl('', this.validationService.createValidatorsArray('placeCollege')),
      boardOfEducation: new FormControl('', this.validationService.createValidatorsArray('boardOfEducation')),
      dateOfAdmission: new FormControl('', this.validationService.createValidatorsArray('dateOfAdmission')),
      // seatNumber: new FormControl('', this.validationService.createValidatorsArray('seatNumber')),
      certificates: new FormControl('', this.validationService.createValidatorsArray('certificates')),
      receipt: new FormControl('', this.validationService.createValidatorsArray('receipt')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      insEmail: new FormControl('', this.validationService.createValidatorsArray('insEmail')),
      insPhNo: new FormControl('', this.validationService.createValidatorsArray('insPhNo')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck :new FormControl('',this.validationService.createValidatorsArray('verifyDocumentCheck')),


      // marathi form controls
      boardOfEducation_mr: new FormControl(''),
      college_mr: new FormControl(''),
      placeCollege_mr: new FormControl(''),
    });

   }

  ngOnInit() {
  }

    //marathi getters
    get college_mr(): AbstractControl { return this.formGroup.get('college_mr'); }
    get placeCollege_mr(): AbstractControl { return this.formGroup.get('placeCollege_mr'); }
    get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }
  
    //english getters
    get verifyDocumentCheck() {return this.formGroup.get('verifyDocumentCheck'); }
    get childrenDetail() { return this.formGroup.get('childrenDetail'); }
    get aadharNumber() { return this.formGroup.get('aadharNumber'); }
    get dateOfAdmission() { return this.formGroup.get('dateOfAdmission'); }
    get college() { return this.formGroup.get('college'); }
    get standard() { return this.formGroup.get('standard'); }
    get placeCollege() { return this.formGroup.get('placeCollege'); }
    get certificates() { return this.formGroup.get('certificates'); }
    get boardOfEducation() { return this.formGroup.get('boardOfEducation'); }
    get receipt() { return this.formGroup.get('receipt'); }
    get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
    get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
    get age() { return this.formGroup.get('age'); }
    get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
    get insEmail() { return this.formGroup.get('insEmail'); }
    get insPhNo() { return this.formGroup.get('insPhNo'); }
    // get declaration() { return this.formGroup.get('declaration'); }
    get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
    get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }

}

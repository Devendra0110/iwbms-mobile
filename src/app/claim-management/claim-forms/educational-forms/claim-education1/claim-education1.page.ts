import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimValidationService } from './../../../../services/claim-validation.service';

@Component({
  selector: 'app-claim-education1',
  templateUrl: './claim-education1.page.html',
  styleUrls: ['./claim-education1.page.scss'],
})

export class ClaimEducation1Page implements OnInit {

  public formGroup: FormGroup;

  constructor(private validationService: ClaimValidationService,) { 
    
    this.formGroup = new FormGroup({
    // english form controls
    childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
    aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
    age: new FormControl('', this.validationService.createValidatorsArray('age')),
    school: new FormControl('', this.validationService.createValidatorsArray('school')),
    standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
    placeSchool: new FormControl('', this.validationService.createValidatorsArray('placeSchool')),
    boardOfEducation: new FormControl('', this.validationService.createValidatorsArray('boardOfEducation')),
    year: new FormControl('', this.validationService.createValidatorsArray('year')),
    attendanceCertificate: new FormControl('', this.validationService.createValidatorsArray('attendanceCertificate')),
    // schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
    bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
    aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
    selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
    rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
    // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
    benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
    benefitAmount: new FormControl(''),
    verifyDocumentCheck :new FormControl('',this.validationService.createValidatorsArray('verifyDocumentCheck')),

    // marathi form controls
    school_mr: new FormControl(''),
    placeSchool_mr: new FormControl(''),
    boardOfEducation_mr: new FormControl(''),
  });

}

  ngOnInit() {
  }

  //marathi getters
  get school_mr(): AbstractControl { return this.formGroup.get('school_mr'); }
  get placeSchool_mr(): AbstractControl { return this.formGroup.get('placeSchool_mr'); }
  get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }

  //english getters
  get verifyDocumentCheck() {return this.formGroup.get('verifyDocumentCheck'); }
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get age() { return this.formGroup.get('age'); }
  get school() { return this.formGroup.get('school'); }
  get standard() { return this.formGroup.get('standard'); }
  get placeSchool() { return this.formGroup.get('placeSchool'); }
  get boardOfEducation() { return this.formGroup.get('boardOfEducation'); }
  get year() { return this.formGroup.get('year'); }
  get attendanceCertificate() { return this.formGroup.get('attendanceCertificate'); }
  // get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
  // get declaration() { return this.formGroup.get('declaration'); }


}

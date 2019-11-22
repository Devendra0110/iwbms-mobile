import { Component, OnInit } from '@angular/core';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-claim-health2',
  templateUrl: './claim-health2.page.html',
  styleUrls: ['./claim-health2.page.scss'],
})
export class ClaimHealth2Page implements OnInit {

  public formGroup: FormGroup;

  constructor(
    protected validationService: ClaimValidationService,

  ) {
    this.formGroup = new FormGroup({
      billAmount: new FormControl('', this.validationService.createValidatorsArray('billAmount')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      familyDetail: new FormControl('', this.validationService.createValidatorsArray('familyDetail')),
      nameOfHospital: new FormControl('', this.validationService.createValidatorsArray('nameOfHospital')),
      nameOfDoctor: new FormControl('', this.validationService.createValidatorsArray('nameOfDoctor')),
      locationOfHospital: new FormControl('', this.validationService.createValidatorsArray('locationOfHospital')),
      dateOfOp: new FormControl('', this.validationService.createValidatorsArray('dateOfOp')),
      health2Form2Doc1: new FormControl('', this.validationService.createValidatorsArray('health2Form2Doc1')),
      health2Form2Doc2: new FormControl('', this.validationService.createValidatorsArray('health2Form2Doc2')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      typeOfIllness: new FormControl('', this.validationService.createValidatorsArray('typeOfIllness')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),


      nameOfHospital_mr: new FormControl(''),
      nameOfDoctor_mr: new FormControl(''),
      locationOfHospital_mr: new FormControl(''),
    });
   }

  ngOnInit() {
  }

   // english getters
   get billAmount() { return this.formGroup.get('billAmount') }
   // get declaration() { return this.formGroup.get('declaration') }
   get aadharNumber() { return this.formGroup.get('aadharNumber'); }
   get familyDetail() { return this.formGroup.get('familyDetail'); }
   get nameOfHospital() { return this.formGroup.get('nameOfHospital'); }
   get nameOfDoctor() { return this.formGroup.get('nameOfDoctor'); }
   get locationOfHospital() { return this.formGroup.get('locationOfHospital'); }
   get dateOfOp() { return this.formGroup.get('dateOfOp'); }
   get health2Form2Doc1() { return this.formGroup.get('health2Form2Doc1'); }
   get health2Form2Doc2() { return this.formGroup.get('health2Form2Doc2'); }
   get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
   get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
   get aadharCardDoc() { return this.formGroup.get('aadharCardDoc') }
   get typeOfIllness() { return this.formGroup.get('typeOfIllness') }
   get benefitAmount() { return this.formGroup.get('benefitAmount') }

 
   // marathi getters
   get nameOfHospital_mr() { return this.formGroup.get('nameOfHospital_mr'); }
   get nameOfDoctor_mr() { return this.formGroup.get('nameOfDoctor_mr'); }
   get locationOfHospital_mr() { return this.formGroup.get('locationOfHospital_mr'); }
 
  save(){
    
  }
}

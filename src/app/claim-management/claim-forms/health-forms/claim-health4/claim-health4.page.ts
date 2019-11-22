import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';


@Component({
  selector: 'app-claim-health4',
  templateUrl: './claim-health4.page.html',
  styleUrls: ['./claim-health4.page.scss'],
})
export class ClaimHealth4Page implements OnInit {

   public formGroup: FormGroup;

  constructor(
    protected validationService: ClaimValidationService,

  ) {
    this.formGroup = new FormGroup({
      nameOfMed: new FormControl('', this.validationService.createValidatorsArray('nameOfMed')),
      typeOfDisability: new FormControl('', this.validationService.createValidatorsArray('typeOfDisability')),
      locationOfHospital: new FormControl('', this.validationService.createValidatorsArray('locationOfHospital')),
      date: new FormControl('', this.validationService.createValidatorsArray('date')),
      health4Form4Doc1: new FormControl('', this.validationService.createValidatorsArray('health4Form4Doc1')),
      //health4Form4Doc2: new FormControl('', this.validationService.createValidatorsArray('health4Form4Doc2')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      locationOfHospital_mr: new FormControl(''),
      typeOfDisability_mr: new FormControl(''),
      nameOfMed_mr: new FormControl(''),
    });

   }

  ngOnInit() {
    
  }

  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get nameOfMed() { return this.formGroup.get('nameOfMed'); }
  get typeOfDisability() { return this.formGroup.get('typeOfDisability'); }
  get locationOfHospital() { return this.formGroup.get('locationOfHospital'); }
  get date() { return this.formGroup.get('date'); }
  get health4Form4Doc1() { return this.formGroup.get('health4Form4Doc1'); }
  get health4Form4Doc2() { return this.formGroup.get('health4Form4Doc2'); }
  // get declaration() { return this.formGroup.get('declaration') }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }

  get typeOfDisability_mr() { return this.formGroup.get('typeOfDisability_mr'); }
  get nameOfMed_mr() { return this.formGroup.get('nameOfMed_mr'); }
  get locationOfHospital_mr() { return this.formGroup.get('locationOfHospital_mr'); }

  save(){

  }
}

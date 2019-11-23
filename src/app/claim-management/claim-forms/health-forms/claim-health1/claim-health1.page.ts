import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';

@Component({
  selector: 'app-claim-health1',
  templateUrl: './claim-health1.page.html',
  styleUrls: ['./claim-health1.page.scss'],
})
export class ClaimHealth1Page implements OnInit {

  public formGroup: FormGroup;
  public schemeDetails:any;

  constructor(
    private validationService: ClaimValidationService,
  ) {
    this.formGroup = new FormGroup({

      //english formcontrols
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      genderPersonal: new FormControl('', this.validationService.createValidatorsArray('genderPersonal')),
      dateOfDeliveryHealth: new FormControl('', this.validationService.createValidatorsArray('dateOfDeliveryHealth')),
      addressOfDelivery: new FormControl('', this.validationService.createValidatorsArray('addressOfDelivery')),
      nameOfHospital: new FormControl('', this.validationService.createValidatorsArray('nameOfHospital')),
      nameOfCertificateIssuer: new FormControl('', this.validationService.createValidatorsArray('nameOfCertificateIssuer')),
      health1Form1Doc1: new FormControl('', this.validationService.createValidatorsArray('health1Form1Doc1')),
      selectMaternityPlace: new FormControl('', this.validationService.createValidatorsArray('selectMaternityPlace')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      typeOfDelivery: new FormControl('', this.validationService.createValidatorsArray('typeOfDelivery')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      birthCertificateNumber: new FormControl('', this.validationService.createValidatorsArray('birthCertificateNumber')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      birthCertificateIssuedBy: new FormControl('', this.validationService.createValidatorsArray('birthCertificateIssuedBy')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),

       // marathi Formcontrols
      nameOfHospital_mr: new FormControl(''),
      nameOfCertificateIssuer_mr: new FormControl(''),
      addressOfDelivery_mr: new FormControl(''),
    });
  }

  ngOnInit() {

    // this.typeOfDelivery.valueChanges.subscribe(value => {
    //   const benefitAmount = JSON.parse(this.schemeDetails.benefit_amount);
    //   if (value.trim === "Normal Delivery / नैसर्गिक प्रसूती".trim && this.schemeDetails.benefit_type === 'cash') {
    //     this.benefitAmount.patchValue(benefitAmount[0].natural);
    //   } else if (value.trim === "Caesarean Delivery / शस्त्रक्रियाद्वारे प्रसूती".trim && this.schemeDetails.benefit_type === 'cash') {
    //     this.benefitAmount.patchValue(benefitAmount[0].caesarean);
    //   }
    // });
    // this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    // this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
    //   if (eachFamily.category === 'children') {
    //     return eachFamily;
    //   }
    // });

  }

  // english getters
  // get declaration() { return this.formGroup.get('declaration') }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get dateOfDeliveryHealth() { return this.formGroup.get('dateOfDeliveryHealth'); }
  get addressOfDelivery() { return this.formGroup.get('addressOfDelivery'); }
  get nameOfHospital() { return this.formGroup.get('nameOfHospital'); }
  get nameOfCertificateIssuer() { return this.formGroup.get('nameOfCertificateIssuer'); }
  get health1Form1Doc1() { return this.formGroup.get('health1Form1Doc1'); }
  get genderPersonal() { return this.formGroup.get('genderPersonal'); }
  get selectMaternityPlace() { return this.formGroup.get('selectMaternityPlace'); }
  get typeOfDelivery() { return this.formGroup.get('typeOfDelivery'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc') }
  get birthCertificateNumber() { return this.formGroup.get('birthCertificateNumber') }
  get birthCertificateIssuedBy() { return this.formGroup.get('birthCertificateIssuedBy') }

  // marathi getters
  get nameOfHospital_mr() { return this.formGroup.get('nameOfHospital_mr'); }
  get nameOfCertificateIssuer_mr() { return this.formGroup.get('nameOfCertificateIssuer_mr'); }
  get addressOfDelivery_mr() { return this.formGroup.get('addressOfDelivery_mr'); }

  save(){
    
  }

}

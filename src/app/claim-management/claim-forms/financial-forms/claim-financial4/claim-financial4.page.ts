import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';

@Component({
  selector: 'app-claim-financial4',
  templateUrl: './claim-financial4.page.html',
  styleUrls: ['./claim-financial4.page.scss'],
})
export class ClaimFinancial4Page implements OnInit {
  public formGroup: FormGroup;
  public maxTodaysDate : string;

  constructor(private validationService: ClaimValidationService) {
  this.formGroup = new FormGroup({

    pmAwaasCertificate: new FormControl('', this.validationService.createValidatorsArray('pmAwaasCertificate')),
    // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
    selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
    verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
    placeOfClaim: new FormControl('', Validators.required)

    //marathi form controls
    ,
    benefitType: new FormControl('', [Validators.required]),
    benefitAmount: new FormControl('')
  });
  }

  ngOnInit() {

    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year])

  }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get pmAwaasCertificate() { return this.formGroup.get('pmAwaasCertificate'); }
  // get declaration() { return this.formGroup.get('declaration'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get placeOfClaim() { return this.formGroup.get('placeOfClaim'); }

}

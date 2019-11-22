import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';

@Component({
  selector: 'app-claim-health5',
  templateUrl: './claim-health5.page.html',
  styleUrls: ['./claim-health5.page.scss'],
})
export class ClaimHealth5Page implements OnInit {

  public formGroup: FormGroup;
  
  constructor(
    protected validationService: ClaimValidationService,

  ) {
    this.formGroup = new FormGroup({
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck :new FormControl('',this.validationService.createValidatorsArray('verifyDocumentCheck')),

    });

   }

  ngOnInit() {
  }

  get verifyDocumentCheck() {return this.formGroup.get('verifyDocumentCheck'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }


save(){
  
}
}

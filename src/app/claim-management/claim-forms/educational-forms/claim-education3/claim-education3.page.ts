import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { ClaimService } from './../../../../services/claim.service';
import { ClaimValidationService } from './../../../../services/claim-validation.service';
import { HttpService } from './../../../../services/http.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { TransliterationService } from './../../../../services/transliteration.service';

@Component({
  selector: 'app-claim-education3',
  templateUrl: './claim-education3.page.html',
  styleUrls: ['./claim-education3.page.scss'],
})

export class ClaimEducation3Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public getFile: boolean;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimHttpService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast
  ) {
    super(transliterate, httpService, claimHttpService, router, storage, toast);
    this.fileOptions = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup ({
      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      college: new FormControl('', this.validationService.createValidatorsArray('college')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      placeCollege: new FormControl('', this.validationService.createValidatorsArray('placeCollege')),
      boardOfEducation: new FormControl('', this.validationService.createValidatorsArray('boardOfEducation')),
      dateOfAdmission: new FormControl('', this.validationService.createValidatorsArray('dateOfAdmission')),
      certificates: new FormControl('', this.validationService.createValidatorsArray('certificates')),
      receipt: new FormControl('', this.validationService.createValidatorsArray('receipt')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      insEmail: new FormControl('', this.validationService.createValidatorsArray('insEmail')),
      insPhNo: new FormControl('', this.validationService.createValidatorsArray('insPhNo')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck : new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // seatNumber: new FormControl('', this.validationService.createValidatorsArray('seatNumber')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),


      // marathi form controls
      boardOfEducation_mr: new FormControl(''),
      college_mr: new FormControl(''),
      placeCollege_mr: new FormControl(''),
    });

   }

  ngOnInit() {
  }

    // marathi getters
    get college_mr(): AbstractControl { return this.formGroup.get('college_mr'); }
    get placeCollege_mr(): AbstractControl { return this.formGroup.get('placeCollege_mr'); }
    get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }

    // english getters
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
    get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
    get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
    // get declaration() { return this.formGroup.get('declaration'); }
    
}

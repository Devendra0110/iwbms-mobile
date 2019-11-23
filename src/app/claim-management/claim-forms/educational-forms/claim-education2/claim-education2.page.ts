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
  selector: 'app-claim-education2',
  templateUrl: './claim-education2.page.html',
  styleUrls: ['./claim-education2.page.scss'],
})

export class ClaimEducation2Page extends ClaimBasePage implements OnInit {

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
    this.fileOptions = { fileSelect: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { fileSelect: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup({

      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      school: new FormControl('', this.validationService.createValidatorsArray('school')),
      placeSchool: new FormControl('', this.validationService.createValidatorsArray('placeSchool')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      boardOfEducation: new FormControl('', this.validationService.createValidatorsArray('boardOfEducation')),
      year: new FormControl('', this.validationService.createValidatorsArray('year')),
      seatNumber: new FormControl('', this.validationService.createValidatorsArray('seatNumber')),
      marksObtained: new FormControl('', this.validationService.createValidatorsArray('marksObtained')),
      totalMarks: new FormControl('', this.validationService.createValidatorsArray('totalMarks')),
      percentage: new FormControl('', this.validationService.createValidatorsArray('percentage')),
      fileSelect: new FormControl('', this.validationService.createValidatorsArray('fileSelect')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck : new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),


      // marathi form controls
      school_mr: new FormControl(''),
      placeSchool_mr: new FormControl(''),
      boardOfEducation_mr: new FormControl(''),
    });

   }

  ngOnInit() {
  }

  // marathi getters
  get school_mr(): AbstractControl { return this.formGroup.get('school_mr'); }
  get placeSchool_mr(): AbstractControl { return this.formGroup.get('placeSchool_mr'); }
  get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }

  // english getters
  get verifyDocumentCheck() {return this.formGroup.get('verifyDocumentCheck'); }
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get school() { return this.formGroup.get('school'); }
  get year() { return this.formGroup.get('year'); }
  get standard() { return this.formGroup.get('standard'); }
  get percentage() { return this.formGroup.get('percentage'); }
  get placeSchool() { return this.formGroup.get('placeSchool'); }
  get boardOfEducation() { return this.formGroup.get('boardOfEducation'); }
  get seatNumber() { return this.formGroup.get('seatNumber'); }
  get fileSelect() { return this.formGroup.get('fileSelect'); }
  get totalMarks() { return this.formGroup.get('totalMarks'); }
  get marksObtained() { return this.formGroup.get('marksObtained'); }
  get age() { return this.formGroup.get('age'); }
  get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
  get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
  // get declaration() { return this.formGroup.get('declaration'); }


}

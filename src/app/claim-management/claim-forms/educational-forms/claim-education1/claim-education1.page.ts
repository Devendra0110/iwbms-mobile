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
  selector: 'app-claim-education1',
  templateUrl: './claim-education1.page.html',
  styleUrls: ['./claim-education1.page.scss'],
})

export class ClaimEducation1Page extends ClaimBasePage implements OnInit {

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
    this.fileOptions = { attendanceCertificate: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { attendanceCertificate: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup({

      // english form controls
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      school: new FormControl('', this.validationService.createValidatorsArray('school')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      placeSchool: new FormControl('', this.validationService.createValidatorsArray('placeSchool')),
      year: new FormControl('', this.validationService.createValidatorsArray('year')),
      attendanceCertificate: new FormControl('', this.validationService.createValidatorsArray('attendanceCertificate')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      // schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      // boardOfEducation: new FormControl('', this.validationService.createValidatorsArray('boardOfEducation')),

      // marathi form controls
      school_mr: new FormControl(''),
      placeSchool_mr: new FormControl(''),
      // boardOfEducation_mr: new FormControl(''),
    });

  }

  ngOnInit() {
  //   this.getEducation().subscribe((data: any) => {
  //     const amountToPatch = JSON.parse(this.schemeDetails.benefit_amount);
  //     let minStd, maxStd;
  //     for(const index in amountToPatch) {
  //       for(const key in amountToPatch[index]) {
  //         const standards = key.split('TO');
  //         minStd = minStd ? Math.min(minStd, Number(standards[0].trim())) : Number(standards[0].trim());
  //         maxStd = maxStd ? Math.max(maxStd, Number(standards[1].trim())) : Number(standards[1].trim());
  //       }
  //     }
  //     this.getEducationArray = data.slice(minStd - 1, maxStd);
  // })
   }

  // marathi getters
  get school_mr(): AbstractControl { return this.formGroup.get('school_mr'); }
  get placeSchool_mr(): AbstractControl { return this.formGroup.get('placeSchool_mr'); }
  // get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }

  // english getters
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get age() { return this.formGroup.get('age'); }
  get school() { return this.formGroup.get('school'); }
  get standard() { return this.formGroup.get('standard'); }
  get placeSchool() { return this.formGroup.get('placeSchool'); }
  get year() { return this.formGroup.get('year'); }
  get attendanceCertificate() { return this.formGroup.get('attendanceCertificate'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
  // get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
  // get boardOfEducation() { return this.formGroup.get('boardOfEducation'); }
  // get declaration() { return this.formGroup.get('declaration'); }


}

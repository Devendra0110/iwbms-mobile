import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { ClaimService } from './../../../../services/claim.service';
import { ClaimValidationService } from './../../../../services/claim-validation.service';
import { Constants } from './../../../../../assets/constants';
import { HttpService } from './../../../../services/http.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { TransliterationService } from './../../../../services/transliteration.service';

@Component({
  selector: 'app-claim-education5',
  templateUrl: './claim-education5.page.html',
  styleUrls: ['./claim-education5.page.scss'],
})

export class ClaimEducation5Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public getFile: boolean;
  public academicYear: Object = [];
  public degree: any;
  public maxTodaysDate:string;
  public childArray: Array<string> = [];

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
      familyRelation: new FormControl('', this.validationService.createValidatorsArray('familyRelation')),
      institute: new FormControl('', this.validationService.createValidatorsArray('institute')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      placeInstitute: new FormControl('', this.validationService.createValidatorsArray('placeInstitute')),
      dateOfAdmission: new FormControl('', this.validationService.createValidatorsArray('dateOfAdmission')),
      certificates: new FormControl('', this.validationService.createValidatorsArray('certificates')),
      receipt: new FormControl('', this.validationService.createValidatorsArray('receipt')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      yearOfDegree: new FormControl('', this.validationService.createValidatorsArray('yearOfDegree')),
      degreeName: new FormControl('', this.validationService.createValidatorsArray('degreeName')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      insEmail: new FormControl('', this.validationService.createValidatorsArray('insEmail')),
      insPhNo: new FormControl('', this.validationService.createValidatorsArray('insPhNo')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      category: new FormControl('', this.validationService.createValidatorsArray('category')),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // bookReceipt: new FormControl('', this.validationService.createValidatorsArray('bookReceipt')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      

      // marathi form controls
      placeInstitute_mr: new FormControl(''),
      // degreeName_mr: new FormControl(''),
      institute_mr: new FormControl(''),
    });

    this.academicYear = Constants.ACADEMIC_YEAR;
    this.degree = Constants.DEGREES;

   }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day,this.todaysDate.month,this.todaysDate.year]);
  }

    //marathi getters
    get institute_mr(): AbstractControl { return this.formGroup.get('institute_mr'); }
    get placeInstitute_mr(): AbstractControl { return this.formGroup.get('placeInstitute_mr'); }
    // get degreeName_mr(): AbstractControl { return this.formGroup.get('degreeName_mr'); }
  
    //english getters
    get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
    get familyRelation() { return this.formGroup.get('familyRelation'); }
    get institute() { return this.formGroup.get('institute'); }
    get standard() { return this.formGroup.get('standard'); }
    get category() { return this.formGroup.get('category'); }
    get aadharNumber() { return this.formGroup.get('aadharNumber'); }
    get placeInstitute() { return this.formGroup.get('placeInstitute'); }
    get dateOfAdmission() { return this.formGroup.get('dateOfAdmission'); }
    get certificates() { return this.formGroup.get('certificates'); }
    get receipt() { return this.formGroup.get('receipt'); }
    get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
    get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
    get age() { return this.formGroup.get('age'); }
    get yearOfDegree() { return this.formGroup.get('yearOfDegree'); }
    get degreeName() { return this.formGroup.get('degreeName'); }
    get insPhNo() { return this.formGroup.get('insPhNo'); }
    get insEmail() { return this.formGroup.get('insEmail'); }
    get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
    get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
    get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
    // get declaration() { return this.formGroup.get('declaration'); }
    // get bookReceipt() { return this.formGroup.get('bookReceipt'); }

}

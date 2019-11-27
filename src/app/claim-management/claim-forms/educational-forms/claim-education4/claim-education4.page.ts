import * as _ from 'lodash';
import * as moment from 'moment';

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
  selector: 'app-claim-education4',
  templateUrl: './claim-education4.page.html',
  styleUrls: ['./claim-education4.page.scss'],
})

export class ClaimEducation4Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public getFile: boolean;
  public childArray: Array<string> = [];
  public childDetail: any;
  public maxTodaysDate:string;
  public minDateOfAdmission: string;

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
    this.fileOptions = { certificates: '', receipt: '', bookReceipt: '',schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { certificates: '', receipt: '', bookReceipt: '',schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup ({
      // english form controls
      familyRelation: new FormControl('', this.validationService.createValidatorsArray('familyRelation')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      schoolIdDoc: new FormControl('', this.validationService.createValidatorsArray('schoolIdDoc')),
      college: new FormControl('', this.validationService.createValidatorsArray('college')),
      placeCollege: new FormControl('', this.validationService.createValidatorsArray('placeCollege')),
      dateOfAdmission: new FormControl('', this.validationService.createValidatorsArray('dateOfAdmission')),
      certificates: new FormControl('', this.validationService.createValidatorsArray('certificates')),
      receipt: new FormControl('', this.validationService.createValidatorsArray('receipt')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      bookReceipt: new FormControl('', this.validationService.createValidatorsArray('bookReceipt')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      bonafideDoc: new FormControl('', this.validationService.createValidatorsArray('bonafideDoc')),
      degreeName: new FormControl('', this.validationService.createValidatorsArray('degreeName')),
      insEmail: new FormControl('', this.validationService.createValidatorsArray('insEmail')),
      insPhNo: new FormControl('', this.validationService.createValidatorsArray('insPhNo')),
      degreeName_mr: new FormControl('', this.validationService.createValidatorsArray('degreeName_mr')),
      age: new FormControl('', this.validationService.createValidatorsArray('age')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      category: new FormControl('', this.validationService.createValidatorsArray('category')),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),

      // marathi form controls
      placeCollege_mr: new FormControl(''),
      college_mr: new FormControl(''),
    });

   }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day,this.todaysDate.month,this.todaysDate.year]);
    this.assignBenefits(true);
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.category === 'children' || (eachFamily.category === 'spouse' && eachFamily.relation === '4')) {
        return eachFamily;
      }
    });
    this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    console.log(this.childArray);
    this.familyRelation.valueChanges.subscribe((childName) => {
      this.childDetail = this.childArray.find((child: any) => child.firstNameFamily === childName );
      this.aadharNumber.patchValue(this.childDetail.aadharNoFamily);
      this.age.patchValue(this.calculateAge(this.childDetail.dobFamily));
    });

    this.getEducation().subscribe((data: any[]) => {
      this.getEducationArray = data.slice(20, 23);
    });
    this.minDateOfAdmission = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
  }

  //marathi getters
  get college_mr(): AbstractControl { return this.formGroup.get('college_mr'); }
  get degreeName_mr(): AbstractControl { return this.formGroup.get('degreeName_mr'); }
  get placeCollege_mr(): AbstractControl { return this.formGroup.get('placeCollege_mr'); }

  //english getters
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get familyRelation() { return this.formGroup.get('familyRelation'); }
  get college() { return this.formGroup.get('college'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get schoolIdDoc() { return this.formGroup.get('schoolIdDoc'); }
  get standard() { return this.formGroup.get('standard'); }
  get placeCollege() { return this.formGroup.get('placeCollege'); }
  get dateOfAdmission() { return this.formGroup.get('dateOfAdmission'); }
  get certificates() { return this.formGroup.get('certificates'); }
  get receipt() { return this.formGroup.get('receipt'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get insEmail() { return this.formGroup.get('insEmail'); }
  get insPhNo() { return this.formGroup.get('insPhNo'); }
  get age() { return this.formGroup.get('age'); }
  get bonafideDoc() { return this.formGroup.get('bonafideDoc'); }
  get category() { return this.formGroup.get('category'); }
  get degreeName() { return this.formGroup.get('degreeName'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc'); }
  get bookReceipt() { return this.formGroup.get('bookReceipt'); }
  // get declaration() { return this.formGroup.get('declaration'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
}

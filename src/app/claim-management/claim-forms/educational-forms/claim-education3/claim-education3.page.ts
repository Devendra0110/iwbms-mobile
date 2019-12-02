import * as _ from 'lodash';
import * as moment from 'moment';

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { ClaimService } from './../../../../services/claim.service';
import { ClaimValidationService } from './../../../../services/claim-validation.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';
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
  public maxTodaysDate: string;
  public childArray: Array<string> = [];
  public childDetail: any;
  public dateReg: string;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimHttpService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs
  ) {
    super(transliterate, httpService, claimHttpService, router, storage, toast, dialogs);
    this.fileOptions = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup({
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
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // seatNumber: new FormControl('', this.validationService.createValidatorsArray('seatNumber')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),


      // marathi form controls
      boardOfEducation_mr: new FormControl(''),
      college_mr: new FormControl(''),
      placeCollege_mr: new FormControl(''),
    });

  }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    this.assignBenefits(true);
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.category === 'children') {
        return eachFamily;
      }
    });
    this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    this.childrenDetail.valueChanges.subscribe((childName) => {
      this.childDetail = this.childArray.find((child: any) => child.firstNameFamily === childName);
      this.aadharNumber.patchValue(this.childDetail.aadharNoFamily);
      this.age.patchValue(this.calculateAge(this.childDetail.dobFamily));
    });

    this.getEducation().subscribe((data: any[]) => {
      this.getEducationArray = data.slice(10, 12);
    });
    this.dateReg = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
  }

  // marathi getters
  get college_mr(): AbstractControl { return this.formGroup.get('college_mr'); }
  get placeCollege_mr(): AbstractControl { return this.formGroup.get('placeCollege_mr'); }
  get boardOfEducation_mr(): AbstractControl { return this.formGroup.get('boardOfEducation_mr'); }

  // english getters
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
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  // get declaration() { return this.formGroup.get('declaration'); }

  public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      
      const postObj = {
        userData: this.user,
        claimData: {
          childrenDetail: this.formGroup.getRawValue().childrenDetail,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          age: this.formGroup.getRawValue().age,
          college: this.formGroup.getRawValue().college,
          standard: `${this.formGroup.getRawValue().standard}`,
          placeCollege: this.formGroup.getRawValue().placeCollege,
          boardOfEducation: this.formGroup.getRawValue().boardOfEducation,
          insEmail: `${this.formGroup.getRawValue().insEmail}`,
          insPhNo: `${this.formGroup.getRawValue().insPhNo}`,
          college_mr: this.formGroup.getRawValue().college_mr,
          placeCollege_mr: this.formGroup.getRawValue().placeCollege_mr,
          boardOfEducation_mr: this.formGroup.getRawValue().boardOfEducation_mr,
          dateOfAdmission: this.formGroup.getRawValue().dateOfAdmission,
          benefitType: this.benefitType.value,
          benefitAmount: Number(this.benefitAmount.value),
          documents: {
            certificates: this.fileOptions['certificates'],
            bonafideDoc: this.fileOptions['bonafideDoc'],
            receipt: this.fileOptions['receipt'],
            schoolIdDoc: this.fileOptions['schoolIdDoc'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            rationCardDoc: this.fileOptions['rationCardDoc'],
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {
      this.dialogs.alert('Please Update the form.');
     }
  }


}

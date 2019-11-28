import * as _ from 'lodash';
import * as moment from 'moment'

import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { ClaimService } from './../../../../services/claim.service';
import { ClaimValidationService } from './../../../../services/claim-validation.service';
import { Constants } from './../../../../../assets/constants';
import { Dialogs } from '@ionic-native/dialogs/ngx';
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
  public childDetail: any;
  public sortedDegree: any;
  public dateReg:string;

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
    super(transliterate, httpService, claimHttpService, router, storage, toast,dialogs);
    this.fileOptions = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { certificates: '', receipt: '', schoolIdDoc: '', rationCardDoc: '', bonafideDoc: '', selfDeclaration: '', aadharCardDoc: '' };
    this.academicYear = Constants.ACADEMIC_YEAR;
    this.degree = Constants.DEGREES;

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
      // verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // bookReceipt: new FormControl('', this.validationService.createValidatorsArray('bookReceipt')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      

      // marathi form controls
      placeInstitute_mr: new FormControl(''),
      institute_mr: new FormControl(''),
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

    this.assignBenefits(false);
    this.standard.valueChanges.subscribe(value => {
      if(this.schemeDetails) {
        const amountToPatch = JSON.parse(this.schemeDetails.benefit_amount);
        if(Number(value) === 17 && this.schemeDetails.benefit_type === 'cash') {
          this.benefitAmount.patchValue(amountToPatch[0].medical);
        } else if(Number(value) === 18 && this.schemeDetails.benefit_type === 'cash') {
          this.benefitAmount.patchValue(amountToPatch[0].engineering);
        }
      }
      if (value === 18) {
        this.sortedDegree = this.degree.filter(res => res.type === "medical");
      } else if (value === 17){
        this.sortedDegree = this.degree.filter(res => res.type === 'engineering');
      }
    });

    this.getEducation().subscribe((data: any[]) => {
      this.getEducationArray = data.slice(16,18);
    });
    this.dateReg = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
  }

    //marathi getters
    get institute_mr(): AbstractControl { return this.formGroup.get('institute_mr'); }
    get placeInstitute_mr(): AbstractControl { return this.formGroup.get('placeInstitute_mr'); }
    
    //english getters
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
    // get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
    // get declaration() { return this.formGroup.get('declaration'); }
    // get bookReceipt() { return this.formGroup.get('bookReceipt'); }

    public saveForm(): void {
      if (this.formGroup.valid && this.user['eligibilityForScheme']) {
        if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
          this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
          this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
        }

        const postObj = {
          userData: this.user,
          claimData: {
            familyRelation: this.formGroup.getRawValue().familyRelation,
            aadharNumber: this.formGroup.getRawValue().aadharNumber,
            age: this.formGroup.getRawValue().age,
            institute: this.formGroup.getRawValue().institute,
            standard: `${this.formGroup.getRawValue().standard}`,
            placeInstitute: this.formGroup.getRawValue().placeInstitute,
            institute_mr: this.formGroup.getRawValue().institute_mr,
            placeInstitute_mr: this.formGroup.getRawValue().placeInstitute_mr,
            dateOfAdmission: this.formGroup.getRawValue().dateOfAdmission,
            category: this.formGroup.getRawValue().category,
            yearOfDegree: this.formGroup.getRawValue().yearOfDegree,
            degreeName: this.formGroup.getRawValue().degreeName,
            insEmail: `${this.formGroup.getRawValue().insEmail}`,
            insPhNo: `${this.formGroup.getRawValue().insPhNo}`,
            benefitType: this.benefitType.value,
            benefitAmount: Number(this.benefitAmount.value),
            // degreeName_mr: this.formGroup.getRawValue().degreeName_mr,
            documents: {
              certificates: this.fileOptions['certificates'],
              receipt: this.fileOptions['receipt'],
              bonafideDoc: this.fileOptions['bonafideDoc'],
              schoolIdDoc: this.fileOptions['schoolIdDoc'],
              aadharCardDoc: this.fileOptions['aadharCardDoc'],
              selfDeclaration: this.fileOptions['selfDeclaration'],
              rationCardDoc: this.fileOptions['rationCardDoc'],
              // bookReceipt: this.fileOptions['bookReceipt'],
            }
          }
        };
        this.saveClaimForm(postObj);
      } else {
        this.dialogs.alert('Please Update the form.');
      }
    }
  

}

import { Component, OnInit } from '@angular/core';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { Constants } from 'src/assets/constants';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TypeOfIllness } from 'src/assets/common.interface';

@Component({
  selector: 'app-claim-health2',
  templateUrl: './claim-health2.page.html',
  styleUrls: ['./claim-health2.page.scss'],
})
export class ClaimHealth2Page extends ClaimBasePage implements OnInit {
  public formGroup: FormGroup;
  public Delivery: Object = [];
  public maxTodaysDate: string;
  public familyArray: Array<string> = [];
  public illness: TypeOfIllness[];
  public minTreatmentDate:string;
  public maxTreatmentDate:string;
  public familyName:string;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router:Router,
    protected storage:Storage,
    protected toast:Toast,
    protected dialogs:Dialogs,

  ) {
    super(transliterate,httpService,claimService,router,storage,toast,dialogs);
    this.familyArray = [];
    this.illness = Constants.TYPE_OF_ILLNESS;
    this.fileOptions = { health2Form2Doc1: '', health2Form2Doc2: '', aadharCardDoc: '', selfDeclaration: '' };
    this.files = { health2Form2Doc1: '', health2Form2Doc2: '', aadharCardDoc: '', selfDeclaration: '' };

    this.formGroup = new FormGroup({
      billAmount: new FormControl('', this.validationService.createValidatorsArray('billAmount')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      familyDetail: new FormControl('', this.validationService.createValidatorsArray('familyDetail')),
      nameOfHospital: new FormControl('', this.validationService.createValidatorsArray('nameOfHospital')),
      nameOfDoctor: new FormControl('', this.validationService.createValidatorsArray('nameOfDoctor')),
      locationOfHospital: new FormControl('', this.validationService.createValidatorsArray('locationOfHospital')),
      dateOfOp: new FormControl('', this.validationService.createValidatorsArray('dateOfOp')),
      health2Form2Doc1: new FormControl('', this.validationService.createValidatorsArray('health2Form2Doc1')),
      health2Form2Doc2: new FormControl('', this.validationService.createValidatorsArray('health2Form2Doc2')),
      typeOfIllness: new FormControl('', this.validationService.createValidatorsArray('typeOfIllness')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),


      nameOfHospital_mr: new FormControl(''),
      nameOfDoctor_mr: new FormControl(''),
      locationOfHospital_mr: new FormControl(''),
    });
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.lastYear = {
      year: new Date().getFullYear() - 1,
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    }
   
    this.Delivery = Constants.DELIVERY_TYPE;
   }

  ngOnInit() {
    this.assignBenefits(false);
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.familyArray = this.familyDetailsArray.filter((eachFamily: any) => {
      return eachFamily;
    });
    this.familyArray = _.reverse(_.sortBy(this.familyArray, 'ageFamily'));

    this.familyDetail.valueChanges.subscribe((FamilyMemberId) => {
      const FamilyMemberDetail: any = this.familyArray.find((eachFamily: any) => eachFamily.family_detail_id === Number(FamilyMemberId));
      this.familyName = FamilyMemberDetail.firstNameFamily+' '+FamilyMemberDetail.surname
      this.aadharNumber.patchValue(FamilyMemberDetail.aadharNoFamily);
      this.aadharNumber.disable();
    });


    this.billAmount.valueChanges.subscribe((value) => {
      const benefitAmountPatch = JSON.parse(this.schemeDetails.benefit_amount);
      if(value > Number(benefitAmountPatch[0].maxAmount)) {
        this.benefitAmount.patchValue(100000);
      } else {
        this.benefitAmount.patchValue(value);
      }
    });
    this.minTreatmentDate  = typeof this.user.registrationDatePersonal==='string'?moment(this.user.registrationDatePersonal).format('YYYY-MM-DD'):moment(this.getIonDate([this.user.registrationDatePersonal.day,this.user.registrationDatePersonal.month,this.user.registrationDatePersonal.year])).format('YYYY-MM-DD')
  

  }

   // english getters
   get billAmount() { return this.formGroup.get('billAmount') }
   get aadharNumber() { return this.formGroup.get('aadharNumber'); }
   get familyDetail() { return this.formGroup.get('familyDetail'); }
   get nameOfHospital() { return this.formGroup.get('nameOfHospital'); }
   get nameOfDoctor() { return this.formGroup.get('nameOfDoctor'); }
   get locationOfHospital() { return this.formGroup.get('locationOfHospital'); }
   get dateOfOp() { return this.formGroup.get('dateOfOp'); }
   get health2Form2Doc1() { return this.formGroup.get('health2Form2Doc1'); }
   get health2Form2Doc2() { return this.formGroup.get('health2Form2Doc2'); }
   get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
   get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
   get aadharCardDoc() { return this.formGroup.get('aadharCardDoc') }
   get typeOfIllness() { return this.formGroup.get('typeOfIllness') }
   get benefitAmount() { return this.formGroup.get('benefitAmount') }
   // get declaration() { return this.formGroup.get('declaration') }

 
   // marathi getters
   get nameOfHospital_mr() { return this.formGroup.get('nameOfHospital_mr'); }
   get nameOfDoctor_mr() { return this.formGroup.get('nameOfDoctor_mr'); }
   get locationOfHospital_mr() { return this.formGroup.get('locationOfHospital_mr'); }
 
   public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {

      if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
      this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,
        claimData: {
          billAmount: this.formGroup.getRawValue().billAmount,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          familyDetail: this.familyName,
          nameOfHospital: this.formGroup.getRawValue().nameOfHospital,
          nameOfHospital_mr: this.formGroup.getRawValue().nameOfHospital_mr,
          nameOfDoctor: this.formGroup.getRawValue().nameOfDoctor,
          nameOfDoctor_mr: this.formGroup.getRawValue().nameOfDoctor_mr,
          locationOfHospital: this.formGroup.getRawValue().locationOfHospital,
          locationOfHospital_mr: this.formGroup.getRawValue().locationOfHospital_mr,
          dateOfOp:this.formGroup.getRawValue().dateOfOp,
          typeOfIllness: this.formGroup.getRawValue().typeOfIllness,
          benefitType: this.benefitType.value,
          benefitAmount: this.formGroup.getRawValue().benefitAmount,
          documents: {
            health2Form2Doc1: this.fileOptions['health2Form2Doc1'],
            health2Form2Doc2: this.fileOptions['health2Form2Doc2'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
          }
        }
      };
      this.saveClaimForm(postObj);

    } else {
      this.formGroup.markAllAsTouched();

      this.dialogs.alert('Please Update the form.');

    }
  }

}

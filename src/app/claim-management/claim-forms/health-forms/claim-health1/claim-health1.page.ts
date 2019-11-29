import { Constants } from './../../../../../assets/constants';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Router } from '@angular/router';
import { ClaimService } from './../../../../services/claim.service';
import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { Toast } from '@ionic-native/toast/ngx';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import * as _ from 'lodash'
import { TypeOfIssuer } from 'src/assets/common.interface';


@Component({
  selector: 'app-claim-health1',
  templateUrl: './claim-health1.page.html',
  styleUrls: ['./claim-health1.page.scss'],
})
export class ClaimHealth1Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public minDateOfDelivery:string;
  public childArray: Array<string> = [];
  public issuedBy: TypeOfIssuer[];
  public Delivery: Object = [];
  public childDetail: any
  public todaysDate: any;
  public maxTodaysDate: string;
  public fullName:string;
  public childAgeFlag: boolean;
  public childName:string;
  public dateError:boolean;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs,
  ) {
    super(transliterate, httpService, claimService, router, storage, toast,dialogs);
    this.issuedBy = Constants.TYPE_OF_ISSUER;
    this.childAgeFlag = false
    this.fileOptions = { health1Form1Doc1: '', rationCardDoc: '', selfDeclaration: '' };
    this.files = { health1Form1Doc1: '', rationCardDoc: '', selfDeclaration: '' };



    this.formGroup = new FormGroup({
      //english formcontrols
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      childrenDetail: new FormControl('', this.validationService.createValidatorsArray('childrenDetail')),
      genderPersonal: new FormControl('', this.validationService.createValidatorsArray('genderPersonal')),
      dateOfDeliveryHealth: new FormControl('', this.validationService.createValidatorsArray('dateOfDeliveryHealth')),
      addressOfDelivery: new FormControl('', this.validationService.createValidatorsArray('addressOfDelivery')),
      nameOfHospital: new FormControl('', this.validationService.createValidatorsArray('nameOfHospital')),
      nameOfCertificateIssuer: new FormControl('', this.validationService.createValidatorsArray('nameOfCertificateIssuer')),
      health1Form1Doc1: new FormControl('', this.validationService.createValidatorsArray('health1Form1Doc1')),
      selectMaternityPlace: new FormControl('', this.validationService.createValidatorsArray('selectMaternityPlace')),
      typeOfDelivery: new FormControl('', this.validationService.createValidatorsArray('typeOfDelivery')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      rationCardDoc: new FormControl('', this.validationService.createValidatorsArray('rationCardDoc')),
      birthCertificateNumber: new FormControl('', this.validationService.createValidatorsArray('birthCertificateNumber')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      birthCertificateIssuedBy: new FormControl('', this.validationService.createValidatorsArray('birthCertificateIssuedBy')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),

      // marathi Formcontrols
      nameOfHospital_mr: new FormControl(''),
      nameOfCertificateIssuer_mr: new FormControl(''),
      addressOfDelivery_mr: new FormControl(''),
    });
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.Delivery = Constants.DELIVERY_TYPE;
    console.log(this.Delivery);
    this.dateError = false;
  }
  
  ngOnInit() {
    this.getGenderPersonal();
    this.assignBenefits(false);
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    this.typeOfDelivery.valueChanges.subscribe(value => {
      const benefitAmount = JSON.parse(this.schemeDetails.benefit_amount);
      if (value.trim === "Normal Delivery / नैसर्गिक प्रसूती".trim && this.schemeDetails.benefit_type === 'cash') {
        this.benefitAmount.patchValue(benefitAmount[0].natural);
      } else if (value.trim === "Caesarean Delivery / शस्त्रक्रियाद्वारे प्रसूती".trim && this.schemeDetails.benefit_type === 'cash') {
        this.benefitAmount.patchValue(benefitAmount[0].caesarean);
      }
    });
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.category === 'children') {
        return eachFamily;
      }
    });
    this.minDateOfDelivery = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
    
    this.dateOfDeliveryHealth.valueChanges.subscribe((value) => {
      if (this.dateOfDeliveryHealth.errors) {
      this.toast.show('Child is born before registration date.', '2000', 'bottom')
        this.childAgeFlag = true;
      }
      else {
        this.childAgeFlag = false;
      }
    })

    this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    console.log(this.childArray);
    this.childrenDetail.valueChanges.subscribe((childId) => {
      console.log(this.dateOfDeliveryHealth);
      // patch birth year
      this.childDetail = this.childArray.find((child: any) => child.family_detail_id === Number (childId));
      this.aadharNumber.patchValue(this.childDetail.aadharNoFamily);
      this.childName = this.childDetail.firstNameFamily+' '+this.childDetail.surname
      
      const dateDifference = moment(this.user.registrationDatePersonal).diff(this.childDetail.dobFamily,'days')
      if(dateDifference<1){
        this.dateOfDeliveryHealth.patchValue(moment(this.childDetail.dobFamily).format('YYYY-MM-DD'))
        this.dateError=false
      }else{
        this.dateOfDeliveryHealth.reset();
        this.dateError =true
      }
     

      // const childYear = moment(this.childDetail.dobFamily);
      //assign male/femalne
      this.genderPersonal.patchValue(this.childDetail.relation === '11' ? 3 : 1)
      this.genderPersonal.disable();
    })
    

    // if (this.filledFormData) {
    //   this.fileOptions = {
    //     health1Form1Doc1: this.filledFormData.documents.health1Form1Doc1,
    //     // selfDeclaration: this.filledFormData.documents.selfDeclaration
    //   };
    //   this.viewAttachedDocuments();
    //   this.filledFormData.dateOfDeliveryHealth = typeof this.filledFormData.dateOfDeliveryHealth === 'string' ? this.convertDateToNGBDateFormat(this.filledFormData.dateOfDeliveryHealth) : this.filledFormData.dateOfDeliveryHealth;
    //   this.formGroup.patchValue(this.filledFormData, { emitEvent: false });
    //   this.formGroup.get('health1Form1Doc1').clearValidators();
    //   this.formGroup.get('rationCardDoc').clearValidators();
    //   this.formGroup.get('selfDeclaration').clearValidators();
    //   this.formGroup.disable();
    //   this.editFormFlagObservable.subscribe(value => {
    //     if (value) {
    //       this.formGroup.enable();
    //       this.aadharNumber.disable();
    //       this.childrenDetail.disable();
    //       this.genderPersonal.disable();
    //       this.dateOfDeliveryHealth.disable();
    //       this.selectMaternityPlace.disable();
    //       this.typeOfDelivery.disable();
    //     }
    //     else this.formGroup.disable();
    //   });
    // }
    this.selectMaternityPlace.valueChanges.subscribe((value) => {
      if (value === 'Hospital/रुग्णालय')
        this.nameOfHospital.enable()
      else {
        this.nameOfHospital.disable()

      }
    })
  }
  calculateAge(date: string): number {
    const dob = moment(date).format('YYYY-MM-DD');
    const age = moment().diff(dob, 'years');
    return age;
}

  public capitaliseNumber(): void {
    this.birthCertificateNumber.setValue(this.birthCertificateNumber.value.toString().toUpperCase());
  }


  // english getters
  // get declaration() { return this.formGroup.get('declaration') }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get childrenDetail() { return this.formGroup.get('childrenDetail'); }
  get dateOfDeliveryHealth() { return this.formGroup.get('dateOfDeliveryHealth'); }
  get addressOfDelivery() { return this.formGroup.get('addressOfDelivery'); }
  get nameOfHospital() { return this.formGroup.get('nameOfHospital'); }
  get nameOfCertificateIssuer() { return this.formGroup.get('nameOfCertificateIssuer'); }
  get health1Form1Doc1() { return this.formGroup.get('health1Form1Doc1'); }
  get genderPersonal() { return this.formGroup.get('genderPersonal'); }
  get selectMaternityPlace() { return this.formGroup.get('selectMaternityPlace'); }
  get typeOfDelivery() { return this.formGroup.get('typeOfDelivery'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get rationCardDoc() { return this.formGroup.get('rationCardDoc') }
  get birthCertificateNumber() { return this.formGroup.get('birthCertificateNumber') }
  get birthCertificateIssuedBy() { return this.formGroup.get('birthCertificateIssuedBy') }

  // marathi getters
  get nameOfHospital_mr() { return this.formGroup.get('nameOfHospital_mr'); }
  get nameOfCertificateIssuer_mr() { return this.formGroup.get('nameOfCertificateIssuer_mr'); }
  get addressOfDelivery_mr() { return this.formGroup.get('addressOfDelivery_mr'); }

 
  public saveForm(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if(typeof this.user.registrationDatePersonal==='string' && typeof this.user.dobPersonal==='string'){
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
      this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      // this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }

      const postObj = {
        userData: this.user,
        claimData: {
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          childrenDetail: this.childName,
          genderPersonal: this.formGroup.getRawValue().genderPersonal,
          dateOfDeliveryHealth: this.formGroup.getRawValue().dateOfDeliveryHealth,
          addressOfDelivery: this.formGroup.getRawValue().addressOfDelivery,
          addressOfDelivery_mr: this.formGroup.getRawValue().addressOfDelivery_mr,
          nameOfHospital: this.formGroup.getRawValue().nameOfHospital,
          nameOfHospital_mr: this.formGroup.getRawValue().nameOfHospital_mr,
          nameOfCertificateIssuer: this.formGroup.getRawValue().nameOfCertificateIssuer,
          nameOfCertificateIssuer_mr: this.formGroup.getRawValue().nameOfCertificateIssuer_mr,
          selectMaternityPlace: this.formGroup.getRawValue().selectMaternityPlace,
          typeOfDelivery: this.formGroup.getRawValue().typeOfDelivery,
          birthCertificateNumber: this.formGroup.getRawValue().birthCertificateNumber,
          birthCertificateIssuedBy: this.formGroup.getRawValue().birthCertificateIssuedBy,
          benefitType: this.benefitType.value,
          benefitAmount: this.benefitAmount.value,
          documents: {
            health1Form1Doc1: this.fileOptions['health1Form1Doc1'],
            selfDeclaration :  this.fileOptions['selfDeclaration'],
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

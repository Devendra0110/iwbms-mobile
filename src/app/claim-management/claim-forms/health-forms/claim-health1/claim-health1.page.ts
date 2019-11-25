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
  public childArray: Array<string> = [];
  public issuedBy: TypeOfIssuer[];
  public Delivery: Object = [];
  public childDetail: any
  public todaysDate: any;
  public maxTodaysDate: string;



  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    private dialogs: Dialogs,
  ) {
    super(transliterate, httpService, claimService, router, storage, toast);
    this.issuedBy = Constants.TYPE_OF_ISSUER;


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
  }

  ngOnInit() {
    this.maxTodaysDate = this.getIonDate([this.todaysDate.day, this.todaysDate.month, this.todaysDate.year]);
    // this.typeOfDelivery.valueChanges.subscribe(value => {
    //   const benefitAmount = JSON.parse(this.schemeDetails.benefit_amount);
    //   if (value.trim === "Normal Delivery / नैसर्गिक प्रसूती".trim && this.schemeDetails.benefit_type === 'cash') {
    //     this.benefitAmount.patchValue(benefitAmount[0].natural);
    //   } else if (value.trim === "Caesarean Delivery / शस्त्रक्रियाद्वारे प्रसूती".trim && this.schemeDetails.benefit_type === 'cash') {
    //     this.benefitAmount.patchValue(benefitAmount[0].caesarean);
    //   }
    // });
    // this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    // this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
    //   if (eachFamily.category === 'children') {
    //     return eachFamily;
    //   }
    // });
    // this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    // console.log(this.childArray);
    // this.childrenDetail.valueChanges.subscribe((childId) => {
    //   // patch birth year
    //   this.childDetail = this.childArray.find((child: any) => child.family_detail_id === Number(childId));
    //   this.aadharNumber.patchValue(this.childDetail.aadharNoFamily);
    //   if (typeof this.childDetail.dobFamily === 'string') {
    //     this.childDetail.dobFamily = moment(this.childDetail.dobFamily).format('DD/MM/YYYY').split('/');
    //     this.childDetail.dobFamily = {
    //       year: Number(this.childDetail.dobFamily[2]),
    //       month: Number(this.childDetail.dobFamily[1]),
    //       day: Number(this.childDetail.dobFamily[0])
    //     };
    //   }

    //   // if select hospital then name should be enable .
    //   this.dateOfDeliveryHealth.patchValue(this.childDetail.dobFamily)
    //   const childYear = moment(this.childDetail.dobFamily);
    //   // const childAge = moment().diff(childYear, 'days');
    //   // assign male/femalne
    //   this.genderPersonal.patchValue(this.childDetail.relation === '11' ? 3 : 1)
    //   this.genderPersonal.disable();

    // })

    // this.selectMaternityPlace.valueChanges.subscribe((value) => {
    //   if (value === 'Hospital/रुग्णालय')
    //     this.nameOfHospital.enable();
    //   else {
    //     this.nameOfHospital.disable();

    //   }
    // })
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

  save() {

  }

}

import { Component, OnInit } from '@angular/core';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ClaimBasePage } from 'src/app/claim-management/claim-base/claim-form.baseclass';
import { Constants } from 'src/assets/constants';


@Component({
  selector: 'app-claim-health2',
  templateUrl: './claim-health2.page.html',
  styleUrls: ['./claim-health2.page.scss'],
})
export class ClaimHealth2Page extends ClaimBasePage implements OnInit {
  

  public formGroup: FormGroup;
  public Delivery: Object = [];
  public maxTodaysDate: string;



  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router:Router,
    protected storage:Storage,
    protected toast:Toast,
    private dialogs:Dialogs,

  ) {
    super(transliterate,httpService,claimService,router,storage,toast);
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
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      typeOfIllness: new FormControl('', this.validationService.createValidatorsArray('typeOfIllness')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),


      nameOfHospital_mr: new FormControl(''),
      nameOfDoctor_mr: new FormControl(''),
      locationOfHospital_mr: new FormControl(''),
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

  }

   // english getters
   get billAmount() { return this.formGroup.get('billAmount') }
   // get declaration() { return this.formGroup.get('declaration') }
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

 
   // marathi getters
   get nameOfHospital_mr() { return this.formGroup.get('nameOfHospital_mr'); }
   get nameOfDoctor_mr() { return this.formGroup.get('nameOfDoctor_mr'); }
   get locationOfHospital_mr() { return this.formGroup.get('locationOfHospital_mr'); }
 
  save(){
    
  }
}

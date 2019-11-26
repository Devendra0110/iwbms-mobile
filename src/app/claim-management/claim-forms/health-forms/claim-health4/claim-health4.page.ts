import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
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
  selector: 'app-claim-health4',
  templateUrl: './claim-health4.page.html',
  styleUrls: ['./claim-health4.page.scss'],
})
export class ClaimHealth4Page extends ClaimBasePage implements OnInit {

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
    this.fileOptions = { health4Form4Doc1: '', selfDeclaration: '', };
    this.files = { health4Form4Doc1: '', selfDeclaration: '', };

    this.formGroup = new FormGroup({
      nameOfMed: new FormControl('', this.validationService.createValidatorsArray('nameOfMed')),
      typeOfDisability: new FormControl('', this.validationService.createValidatorsArray('typeOfDisability')),
      locationOfHospital: new FormControl('', this.validationService.createValidatorsArray('locationOfHospital')),
      date: new FormControl('', this.validationService.createValidatorsArray('date')),
      health4Form4Doc1: new FormControl('', this.validationService.createValidatorsArray('health4Form4Doc1')),
      //health4Form4Doc2: new FormControl('', this.validationService.createValidatorsArray('health4Form4Doc2')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
      locationOfHospital_mr: new FormControl(''),
      typeOfDisability_mr: new FormControl(''),
      nameOfMed_mr: new FormControl(''),
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

  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get nameOfMed() { return this.formGroup.get('nameOfMed'); }
  get typeOfDisability() { return this.formGroup.get('typeOfDisability'); }
  get locationOfHospital() { return this.formGroup.get('locationOfHospital'); }
  get date() { return this.formGroup.get('date'); }
  get health4Form4Doc1() { return this.formGroup.get('health4Form4Doc1'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }

  get typeOfDisability_mr() { return this.formGroup.get('typeOfDisability_mr'); }
  get nameOfMed_mr() { return this.formGroup.get('nameOfMed_mr'); }
  get locationOfHospital_mr() { return this.formGroup.get('locationOfHospital_mr'); }

  save(){

  }
}

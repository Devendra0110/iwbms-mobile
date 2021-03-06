import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { HttpService } from '../services/http.service';
import { TransliterationService } from '../services/transliteration.service';
import { ModalController } from '@ionic/angular';
import { familyModalData } from 'src/assets/common.interface';
import { Dialogs } from '@ionic-native/dialogs/ngx';


@Component({
  selector: 'app-family-modal',
  templateUrl: './family-modal.page.html',
  styleUrls: ['./family-modal.page.scss'],
})
export class FamilyModalPage implements OnInit {

  @Input()
  public modalData: familyModalData;

  public formResponse = {
      formState: '',
      formData: null
  };
  public familyAadhar:string[];
  public familyFormGroup: FormGroup;
  public selfFlag: boolean;
  public addFlag: boolean;
  public familyHeaderOptions: string[];
  public familyHeaderOptionsMarathi: string[];
  public familyRelationOptions: string[] = [];
  public familyRelationOptionsMarathi: string[] = [];
  public educationOptions: string[] = [];
  public educationOptionsMarathi: string[] = [];
  public adultFlag:boolean;
  public maritialStatus: string;
  public gender: string;



  constructor(
    private validationService: ValidationService,
    private httpService: HttpService,
    private transliterate: TransliterationService,
    private mdlController: ModalController,
    private dialogs: Dialogs,
    ) {
      this.adultFlag=false;
      this.addFlag = true;
      this.selfFlag = false;
      this.familyFormGroup = new FormGroup({
      family_detail_id: new FormControl(''),
      firstNameFamily: new FormControl('', this.validationService.createValidatorsArray('firstName')),
      firstNameFamily_mr: new FormControl('', this.validationService.createValidatorsArray('firstName_marathi')),
      fatherOrHusbandName: new FormControl('', this.validationService.createValidatorsArray('fatherOrHusbandName')),
      fatherOrHusbandName_mr: new FormControl('', this.validationService.createValidatorsArray('fatherOrHusbandName_marathi')),
      surname: new FormControl('', this.validationService.createValidatorsArray('surname')),
      surname_mr: new FormControl('', this.validationService.createValidatorsArray('surname_marathi')),
      ageFamily: new FormControl('', this.validationService.createValidatorsArray('ageFamily')),
      dobFamily: new FormControl('', this.validationService.createValidatorsArray('dobFamily')),
      relation: new FormControl('', this.validationService.createValidatorsArray('relation')),
      relation_mr: new FormControl(''),
      profession: new FormControl('', this.validationService.createValidatorsArray('profession')),
      profession_mr: new FormControl(''),
      education: new FormControl('', this.validationService.createValidatorsArray('education')),
      education_mr: new FormControl(''),
      nominee: new FormControl('', this.validationService.createValidatorsArray('nominee')),
        aadharNoFamily: new FormControl('', [Validators.maxLength(12), Validators.pattern('^[0-9]{12}$'),Validators.required]),
        isRegisteredInBOCW: new FormControl(''),
        bocwRegistrationNo: new FormControl('')
    });

      // this.httpService.getFamilyRelations().subscribe((familyRelationArrObj: any) => {
      // for (const i of familyRelationArrObj) {
      //   this.familyRelationOptions[Number(i.family_relation_id)] = i.relation_title_en;
      //   this.familyRelationOptionsMarathi[Number(i.family_relation_id)] = i.relation_title_mr;
      // }
    // });

      this.httpService.getEducation().subscribe((educationArrObj: any) => {
      for (const i of educationArrObj) {
        this.educationOptions[Number(i.education_level_id)] = i.education_level_en;
        this.educationOptionsMarathi[Number(i.education_level_id)] = i.education_level_mr;
      }
    });
    }

  ngOnInit() {
    this.maritialStatus = this.modalData.maritialStatus;
    this.gender = this.modalData.gender;
    this.getRelation();
    this.familyAadhar = this.modalData.familyAadhar
    if (this.modalData.mode === 'update') {
      this.familyFormGroup.patchValue(this.modalData.familyDetail.getRawValue());
      this.familyFormGroup.get('nominee').setValue(this.nominee.value === 'yes' ? true : false);
      this.addFlag = false
    }else{
      this.isRegisteredInBOCW.setValue(false)
      this.familyFormGroup.get('nominee').setValue(false);
    }
    if (this.modalData.index === 0) {
      this.relation.patchValue('1');
      this.selfFlag = true;
    }
    this.ageFamily.valueChanges.subscribe((value)=>{
      this.adultFlag = value >= 18;
      this.isRegisteredInBOCW.setValue(false);
      this.bocwValidatorsChange();
    })
  }


  public getRelation(): void {
    if(this.maritialStatus === '1'){
      this.httpService.getFamilyRelations().subscribe((familyRelationArrObj: any) => {
        for (const i of familyRelationArrObj) {
          this.familyRelationOptions[Number(i.family_relation_id)] = i.relation_title_en;
          this.familyRelationOptionsMarathi[Number(i.family_relation_id)] = i.relation_title_mr;
        } 
        delete this.familyRelationOptions[4];
        delete this.familyRelationOptions[5];


        // delete this.familyRelationOptions[8];
        // delete this.familyRelationOptions[9];
        // delete this.familyRelationOptions[12];
        // delete this.familyRelationOptions[13];
        // delete this.familyRelationOptions[16];
        // delete this.familyRelationOptions[17];
        // delete this.familyRelationOptions[18];
      });

  }else if(this.maritialStatus=== '1' && this.gender === '3'){
    this.httpService.getFamilyRelations().subscribe((familyRelationArrObj: any) => {
      for (const i of familyRelationArrObj) {
        this.familyRelationOptions[Number(i.family_relation_id)] = i.relation_title_en;
          this.familyRelationOptionsMarathi[Number(i.family_relation_id)] = i.relation_title_mr;
      }
      delete this.familyRelationOptions[4];
      delete this.familyRelationOptions[5];
      // delete this.familyRelationOptions[8];
        // delete this.familyRelationOptions[9];
        // delete this.familyRelationOptions[12];
        // delete this.familyRelationOptions[13];
        // delete this.familyRelationOptions[16];
        // delete this.familyRelationOptions[17];
        // delete this.familyRelationOptions[18];
    });
  }else{
    this.httpService.getFamilyRelations().subscribe((familyRelationArrObj: any) => {
      for (const i of familyRelationArrObj) {
        this.familyRelationOptions[Number(i.family_relation_id)] = i.relation_title_en;
        this.familyRelationOptionsMarathi[Number(i.family_relation_id)] = i.relation_title_mr;
      }
    });
  }
  }

  transliterateDirect(event) {
    const target = this.familyFormGroup.get(`${event.target.id}_mr`);
    try {
      this.transliterate.transliterateText(event.target.value, 'NAME').subscribe((transliteratedText: any) => {
        const result = transliteratedText.split(';').map((item) => {
          return item.split('^')[0];
        });
        target.patchValue(result.join(' '));
      });
    } catch {
      target.patchValue('');
    }
  }


  handleDropdown(event) {
    const target = this.familyFormGroup.get(`${event.target.id}_mr`);
    target.patchValue(`${event.target.value}`);
  }

  bocwValidatorsChange(){
    if(this.isRegisteredInBOCW.value){
      this.bocwRegistrationNo.setValidators([Validators.maxLength(12), Validators.minLength(12), Validators.required]);
    }else{
      this.bocwRegistrationNo.clearValidators()
      this.bocwRegistrationNo.reset();
    }
    this.bocwRegistrationNo.updateValueAndValidity();
  }

  calculateAge(event) {
    const dob = new Date(this.familyFormGroup.get('dobFamily').value).toJSON().slice(0, 10).split('-');
    const dobMoment = moment(`${dob[0]}-${dob[1]}-${dob[2]}`, 'YYYY-MM-DD');
    if (dobMoment) {
      const age = moment().diff(moment(dob, 'YYYY-MM-DD'), 'years');
      this.ageFamily.patchValue(age);
    }
  }

  async dismissModal() {
    if (this.modalData.mode === 'update') {
      this.nominee.setValue(this.nominee.value ? 'yes' : 'no');
      this.formResponse.formState = 'update';
      this.formResponse.formData = this.familyFormGroup;
      await this.mdlController.dismiss(this.formResponse);
    } else {
      this.formResponse.formState = 'delete';
      await this.mdlController.dismiss(this.formResponse);
    }
  }

  async saveModal() {
    if(this.familyFormGroup.valid){
      if (this.modalData.mode === 'update') {
        this.nominee.setValue(this.nominee.value ? 'yes' : 'no');
        this.formResponse.formState = 'update';
        this.formResponse.formData = this.familyFormGroup;
        await this.mdlController.dismiss(this.formResponse);
      } else {
        this.nominee.setValue(this.nominee.value ? 'yes' : 'no');
        this.formResponse.formState = 'add';
        this.formResponse.formData = this.familyFormGroup;
        await this.mdlController.dismiss(this.formResponse);
      }
    } else {
      this.familyFormGroup.markAllAsTouched();
      this.dialogs.alert('Please fill all the details properly');
    }
  }

  checkAadharUnique(){
    if(this.aadharNoFamily.valid){
     this.familyAadhar = this.familyAadhar.filter(str => {
      if (str!==this.aadharNoFamily.value){
      return str}
      else{
       this.dialogs.alert('Aadhar no. should be unique for every family member ')
      }
    });
 } }

  get firstNameFamily() { return this.familyFormGroup.get('firstNameFamily'); }
  get firstNameFamily_mr() { return this.familyFormGroup.get('firstNameFamily_mr'); }
  get surname() { return this.familyFormGroup.get('surname'); }
  get surname_mr() { return this.familyFormGroup.get('surname_mr'); }
  get ageFamily() { return this.familyFormGroup.get('ageFamily'); }
  get dobFamily() { return this.familyFormGroup.get('dobFamily'); }
  get relation() { return this.familyFormGroup.get('relation'); }
  get relation_mr() { return this.familyFormGroup.get('relation_mr'); }
  get fatherOrHusbandName() { return this.familyFormGroup.get('fatherOrHusbandName'); }
  get fatherOrHusbandName_mr() { return this.familyFormGroup.get('fatherOrHusbandName_mr'); }
  get aadharNoFamily() { return this.familyFormGroup.get('aadharNoFamily'); }
  get education() { return this.familyFormGroup.get('education'); }
  get education_mr() { return this.familyFormGroup.get('education_mr'); }
  get profession() { return this.familyFormGroup.get('profession'); }
  get profession_mr() { return this.familyFormGroup.get('profession_mr'); }
  get nominee() { return this.familyFormGroup.get('nominee'); }
  get isRegisteredInBOCW() { return this.familyFormGroup.get('isRegisteredInBOCW'); }
  get bocwRegistrationNo() { return this.familyFormGroup.get('bocwRegistrationNo');  }

}

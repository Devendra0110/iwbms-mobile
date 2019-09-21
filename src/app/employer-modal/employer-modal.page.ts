import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { TransliterationService } from '../services/transliteration.service';
import { ModalController } from '@ionic/angular';
import { EmployerModalData } from 'src/assets/common.interface';


@Component({
  selector: 'app-employer-modal',
  templateUrl: './employer-modal.page.html',
  styleUrls: ['./employer-modal.page.scss'],
})
export class EmployerModalPage implements OnInit {

  @Input()
  public modalData:EmployerModalData;

  public formResponse = {
    formState: '',
    formData: null
  };
  public employerWorkDetailsFormFroup:FormGroup;
  public addFlag:boolean;
  public appointmentDate:string;
  public dispatchDate:string;
  public maxFromDate:string;
  public minFromDate:string;
  public maxToDate:string;
  public minToDate:string;
  public typeOfIssuerOptions: string[] = [];
  public typeOfIssuerOptionsMarathi: string[] = [];
  public registrationTypeOptions: string[] = [];
  public registrationTypeOptionsMarathi: string[] = [];

  constructor(
    private httpService:HttpService,
    private transliterate:TransliterationService,
    private mdlController:ModalController
  ) {
    this.addFlag=true;
    this.httpService.getIssuerTypes().subscribe((issuerTypesArrObj: any) => {
      for (const i of issuerTypesArrObj) {
        this.typeOfIssuerOptions[Number(i.id)] = i.type_of_issuer;
        this.typeOfIssuerOptionsMarathi[Number(i.id)] = i.type_of_issuer_mr;
      }
    }, err => console.log(err));
    // fetch the list of issuer type registration from database
    this.httpService.getIssuerRegistrationTypes().subscribe((issuerRegistrationTypesArrObj: any) => {
      for (const i of issuerRegistrationTypesArrObj) {
        this.registrationTypeOptions[Number(i.id)] = i.registration_type;
        this.registrationTypeOptionsMarathi[Number(i.id)] = i.registration_type_mr;
      }
    }, err => console.log(err));

    this.employerWorkDetailsFormFroup = new FormGroup({
      typeOfEmployerEmp: new FormControl('', [Validators.required]),
      fullNameOfIssuerEmp: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z\\s]{8,50}')]),
      registrationNumberEmp: new FormControl('', [Validators.pattern('^[0-9]{5,12}$')]),
      registrationTypeEmp: new FormControl('', [Validators.required]),
      mobileNumberOfIssuerEmp: new FormControl('', [Validators.required, Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$')]),
      documentRefNumberEmp: new FormControl('', [Validators.maxLength(20)]),
      fromDateEmp: new FormControl(null, [Validators.required]),
      toDateEmp: new FormControl(null, [Validators.required]),
      typeOfEmployerEmp_mr: new FormControl(''),
      fullNameOfIssuerEmp_mr: new FormControl(''),
      registrationTypeEmp_mr: new FormControl(''),
      workingDays: new FormControl('')
    });
  }

  ngOnInit() {
    if(this.modalData.mode==='update'){
      this.employerWorkDetailsFormFroup.patchValue(this.modalData.employerDetail.value);
      this.addFlag=false
    }
    this.dispatchDate = this.modalData.dispatchDate;
    this.appointmentDate = this.modalData.appointmentDate;
    this.minFromDate = this.modalData.index === 0 ? this.modalData.appointmentDate : this.modalData.toDate;
    this.maxFromDate = this.dispatchDate;
    this.minToDate = this.appointmentDate;
    this.maxToDate = this.dispatchDate;
  }

  changeIonDateTime(event){
    const ionDate = moment(event.target.value).format('YYYY-MM-DD')
    this.employerWorkDetailsFormFroup.get(`${event.target.id}`).setValue(ionDate)
    if(event.target.id==='fromDateEmp'){
      this.minToDate=this.fromDateEmp.value;
    }else{
      this.maxFromDate=this.toDateEmp.value;
    }
    if(this.fromDateEmp.value && this.toDateEmp.value){
      this.workingDays.setValue(moment(this.toDateEmp.value).diff(this.fromDateEmp.value, 'days'));
    }
  }

  transliterateDirect(event) {
    const target = this.employerWorkDetailsFormFroup.get(`${event.target.id}_mr`);
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

  async dismissModal(){
    if (this.modalData.mode === 'update') {
      this.formResponse.formState = 'update';
      this.formResponse.formData = this.employerWorkDetailsFormFroup;
      await this.mdlController.dismiss(this.formResponse);
    } else {
      this.formResponse.formState = 'delete';
      await this.mdlController.dismiss(this.formResponse);
    }
  }

  async saveModal(){
    if(this.employerWorkDetailsFormFroup.valid){
      if (this.modalData.mode === 'update') {
        this.formResponse.formState = 'update';
        this.formResponse.formData = this.employerWorkDetailsFormFroup;
        await this.mdlController.dismiss(this.formResponse);
      } else {
        this.formResponse.formState = 'add';
        this.formResponse.formData = this.employerWorkDetailsFormFroup;
        await this.mdlController.dismiss(this.formResponse);
      }
    }else{
      this.employerWorkDetailsFormFroup.markAllAsTouched()
      alert('Please fill all the details properly');
    }
  }

  handleDropdown(event) {
    const target = this.employerWorkDetailsFormFroup.get(`${event.target.id}_mr`);
    target.patchValue(`${event.target.value}`);
  }

  //getters
  get typeOfEmployerEmp() {return this.employerWorkDetailsFormFroup.get('typeOfEmployerEmp');}
  get fullNameOfIssuerEmp() {return this.employerWorkDetailsFormFroup.get('fullNameOfIssuerEmp');}
  get fullNameOfIssuerEmp_mr() { return this.employerWorkDetailsFormFroup.get('fullNameOfIssuerEmp_mr'); }
  get registrationNumberEmp() {return this.employerWorkDetailsFormFroup.get('registrationNumberEmp');}
  get registrationTypeEmp() {return this.employerWorkDetailsFormFroup.get('registrationTypeEmp');}
  get mobileNumberOfIssuerEmp() {return this.employerWorkDetailsFormFroup.get('mobileNumberOfIssuerEmp');}
  get documentRefNumberEmp() {return this.employerWorkDetailsFormFroup.get('documentRefNumberEmp');}
  get fromDateEmp() {return this.employerWorkDetailsFormFroup.get('fromDateEmp');}
  get toDateEmp() {return this.employerWorkDetailsFormFroup.get('toDateEmp'); }
  get workingDays() { return this.employerWorkDetailsFormFroup.get('workingDays')}
}
import { Component, OnInit, ViewChild, QueryList, ViewChildren, AfterViewInit, ViewContainerRef, ComponentRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';

import { states } from '../models/states';
import { Modes } from '../../assets/modes';
import { serverUrl} from '../../assets/config';

import * as moment from 'moment';

import { ValidationService } from '../services/validation.service';
import { TransliterationService } from '../services/transliteration.service';
import { FormControlDirective } from '../directives/form-control.directive';
import { SuggestionBoxComponent } from '../components/suggestion-box/suggestion-box.component';
import { RegistrationService } from '../services/registration.service';
import { UserManagementService } from '../services/user-management.service';
import { HttpService } from '../services/http.service';
import { UserInfo } from '../../assets/common.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, AfterViewInit {

  @ViewChildren(FormControlDirective) listOfControlRefs: QueryList<any>;

  @ViewChild('suggestionbox', { read: ViewContainerRef, static: true }) suggestionBoxRef: ViewContainerRef;
  public parentViewContainer: ViewContainerRef;
  public registrationFormGroup: FormGroup;
  public endDateForDob: any;
  public startDateForDob: any;
  public startDate: any;
  public todaysDate: any;
  public dateOfBirth: any;
  public attachmentDetails:any =[];
  bankDetails: any = {
    BANK: '',
    BRANCH: '',
    Address: ''
  };
  public registrationObj: any;
  public mandatoryFieldsFlag: boolean;
  public isIfscCodeFound: boolean;
  public statewiseListArray = states;
  public states: any[] = [];
  public districts: any[] = [];
  public talukasRes: any[] = [];
  public postOfficeArrayRes: any[] = [];
  public pincodeArrayRes: any[] =[]
  public talukasPer: any[] = [];
  public postOfficeArrayPer: any[] = [];
  public pincodeArrayPer: any[] = []
  public talukasEmp: any[] = [];
  
  public genderOptions: string[] = [];
  public genderOptionsMarathi: string[] = [];
  public maritalStatusOptions: string[] = [];
  public maritalStatusOptionsMarathi: string[] = [];
  public rationCardTypeOptions: string[] = [];
  public rationCardTypeOptionsMarathi: string[] = [];
  public categoryOptions: string[] = [];
  public categoryOptionsMarathi: string[] = [];
  public familyHeaderOptions: string[];
  public familyRelationOptions:string[]=[];
  public familyRelationOptionsMarathi:string[]=[]
  public educationOptions:string[] = [];
  public educationOptionsMarathi: string[] = [];
  public natureOfWorkOptions: string[] = [];
  public natureOfWorkOptionsMarathi: string[] = [];
  public typeOfIssuerOptions: string[] = [];
  public typeOfIssuerOptionsMarathi: string[] = [];
  public registrationTypeOptions: string[] = [];
  public registrationTypeOptionsMarathi: string[] = [];
  public workerTypeOptions: string[];
  public workerTypeOptionsMarathi: string[];
  public currentImage: any;


    //Transliterate Variables 

  public uploadedImage: File;
  public uploadedImageUrl: string;
  public uploadedbankPassbook: string;
  public uploadedWorkCertificate: string;
  public uploadedSupportingDocument: string;

  public selectedApplicationData: any;

  public files: {
    applicantPhoto: File,
    suppDocument: File,
    workCertificate: File,
    bankPassbook: File
  } = {
      applicantPhoto: null,
      suppDocument: null,
      workCertificate: null,
      bankPassbook: null
    };

  public fileOptions: {
    applicantPhoto: any,
    suppDocument: any,
    workCertificate: any,
    bankPassbook: any
  } = {
      applicantPhoto: null,
      suppDocument: null,
      workCertificate: null,
      bankPassbook: null
    };

  public suggestionBox: ComponentRef<SuggestionBoxComponent>;

  getterObj = {};

  public userType;
  public userTypeId;
  public modes: Modes;
  public rejectNoteFlag = false;
  public editFormFlag;
  public genderList: any[] = [];

  constructor(private validationService: ValidationService,
              private transliterate: TransliterationService,
              private router: Router,
              private registration: RegistrationService,
              private userMgmntService: UserManagementService,
              private httpService: HttpService,
              private camera: Camera) {

    // fetch the list of gender from database
    this.httpService.getGenders().subscribe((genderArrObj: any) => {
      for (const i of genderArrObj) {
        this.genderOptions[i.gender] = i.gender_id;
        this.genderOptionsMarathi[i.gender_mr] = i.gender_id;
      }
    }, err => console.log(err));

    // fetch the list of marital-status from database
    this.httpService.getMaritalStatus().subscribe((maritalStatusArrObj: any) => {
      for (const i of maritalStatusArrObj) {
        this.maritalStatusOptions[i.status]=i.id;
        this.maritalStatusOptionsMarathi[i.status_mr]=i.id;
      }
    }, err => console.log(err));

    // fetch the list of Ration Card Types from database
    this.httpService.getRationCardTypes().subscribe((rationCardArrObj: any) => {
      for (const i of rationCardArrObj) {
        this.rationCardTypeOptions[i.ration_card_type]=i.id;
        this.rationCardTypeOptionsMarathi[i.ration_card_type_mr]=i.id;
      }
    }, err => console.log(err));

    // fetch the list of categories from database
    this.httpService.getCategory().subscribe((categoryArrObj: any) => {
      for (const i of categoryArrObj) {
        this.categoryOptions[i.category]=i.id;
        this.categoryOptionsMarathi[i.category_mr]=i.id;
      }
    }, err => console.log(err));


    // tslint:disable-next-line: max-line-length
    this.familyHeaderOptions = ['SNo.', 'First Name', 'First Name Marathi', 'Surname', 'Surname Marathi', 'Father/ Husband Name', 'Father/ Husband Name Marathi', 'DOB', 'Age (year)', 'Relation', 'Profession', 'Education', 'Nominee', 'Delete'];

    this.httpService.getFamilyRelations().subscribe((familyRelationArrObj:any)=>{
      for(const  i of familyRelationArrObj){
        this.familyRelationOptions[i.relation_title_en] = i.family_relation_id;
        this.familyRelationOptionsMarathi[i.relation_title_mr] = i.family_relation_id;
      }
    })

    this.httpService.getEducation().subscribe((educationArrObj: any) => {
      for (const i of educationArrObj) {
        this.educationOptions[i.education_level_en] = i.education_level_id;
        this.educationOptionsMarathi[i.education_level_mr] = i.education_level_id;
      }
    })


    // fetch the list of Nature of Work from database
    this.httpService.getNatureOfWork().subscribe((natureOfWorkArrObj: any) => {
      for (const i of natureOfWorkArrObj) {
        this.natureOfWorkOptions[i.type_of_worker_title] = i.type_of_worker_id;
        this.natureOfWorkOptionsMarathi[i.type_of_worker_title_mr] = i.type_of_worker_id;
      }
    }, err => console.log(err));

    // fetch the list of Issuer types from database
    this.httpService.getIssuerTypes().subscribe((issuerTypesArrObj: any) => {
      for (const i of issuerTypesArrObj) {
        this.typeOfIssuerOptions[i.type_of_issuer]=i.id;
        this.typeOfIssuerOptionsMarathi[i.type_of_issuer_mr] = i.id;
      }
    }, err => console.log(err));
    // fetch the list of issuer type registration from database
    this.httpService.getIssuerRegistrationTypes().subscribe((issuerRegistrationTypesArrObj: any) => {
      for (const i of issuerRegistrationTypesArrObj) {
        this.registrationTypeOptions[i.registration_type]=i.id;
        this.registrationTypeOptionsMarathi[i.registration_type_mr]=i.id;
      }
    }, err => console.log(err));

    // fetch the list of states from database
    this.httpService.getStates().subscribe((statesArrObj: any) => {
        // create state-name:state-id key-value in states
      for (const i of statesArrObj) this.states[i.state_name] = i.state_id;
    }, err => console.log(err));

    this.registrationFormGroup = new FormGroup({
      bocw_id: new FormControl(''),
      personalDetails: this.personalDetailsFormFroup(),
      familyDetails: new FormArray([this.familyDetailsFormGroup()]),
      bankDetails: this.bankDetailsFormFroup(),
      employerDetails: this.employerDetailsFormFroup(),
      supportingDocuments: this.supportingDocumentsFormFroup(),
    });

    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.startDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.attachmentDetails = [
      {
        document_en: `Proof of age (Aadhar card / passport / PAN card / driver's license / birth certificate / school leaving certificate) One of these`,
        document_mr: `वयाबाबतचा पुरावा (आधारकार्ड / पारपत्र / पॅनकार्ड / वाहनचालक परवाना / जन्माचा दाखला / शाळा सोडल्याचे प्रमाणपत्र) यापैकी एक`,
        attachmentType: [],
        uploaded: false,
        required: true
      },
      {
        document_en: `Certificate of working 90 days or more in the previous year (Authorized by the owner / village worker / M / s.
         Certificate of Authority made) one of these`,
        document_mr: `मागील वर्षात ९० किंवा अधिक दिवस काम केल्याचे प्रमाणपत्र (मालकाचे / ग्रामसेवक / म.न .पा./ न. पा. ने प्राधिकृत
          केलेल्या अधिकाऱ्याचे प्रमाणपत्र) यापैकी एक`,
        attachmentType: [],
        uploaded: false,
        required: true
      },
      {
        document_en: `Resident Evidence (Aadhar Card / Passport / Driver's License / Credit Card / Electricity Payment of the previous month /
         Gram Panchayat Certificate) One of these`,
        document_mr: `रहिवासी पुरावा (आधारकार्ड / पारपत्र / वाहनचालक परवाना / शिधापत्रिका / मागील महिन्याचे विद्युत देयक /
          ग्रामपंचायत दाखला ) यापैकी एक`,
        attachmentType: [],
        uploaded: false,
        required: true
      },
      {
        document_en: `Photo ID Proof (Aadhar Card / Passport / Driver's License / PAN Card / Voter ID Card)`,
        document_mr: `फोटो आयडी पुरावा (आधार कार्ड / पारपत्र / वाहनचालक परवाना / पॅनकार्ड / मतदाता ओळखपत्र) एकाकी एक`,
        attachmentType: [],
        uploaded: false,
        required: true
      },
      {
        document_en: `Xerox of bank passbook`,
        document_mr: `बँक पासबुक ची झेरॉक्स`,
        attachmentType: [],
        uploaded: false,
        required: false
      }
    ];

    

    this.httpService.getDocumentTypes().subscribe((attDetailsArrObj: any) => {
      for (const i of attDetailsArrObj) {
        switch (i.document_types_id) {
          case 1: this.attachmentDetails[0].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            this.attachmentDetails[2].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            this.attachmentDetails[3].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 2: this.attachmentDetails[0].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            this.attachmentDetails[2].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            this.attachmentDetails[3].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 3: this.attachmentDetails[0].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            this.attachmentDetails[3].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 4: this.attachmentDetails[0].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            this.attachmentDetails[2].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            this.attachmentDetails[3].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 5: this.attachmentDetails[0].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 6: this.attachmentDetails[0].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 7: this.attachmentDetails[1].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 8: this.attachmentDetails[1].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 9: this.attachmentDetails[1].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 10: this.attachmentDetails[1].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 11: this.attachmentDetails[2].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 12: this.attachmentDetails[2].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 13: this.attachmentDetails[2].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 14: this.attachmentDetails[3].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
          case 15: this.attachmentDetails[4].attachmentType.push({ key: i.document_title_en + '/' + i.document_title_mr, value: i.document_types_id });
            break;
        }

      }
    }, err => console.log(err));

    const attachmentList = this.registrationFormGroup.get('supportingDocuments').get('attachmentList') as FormArray;
    for (const i in this.attachmentDetails) {
      attachmentList.push(this.attachmentListFormGroup());
    }
  }

  ngOnInit() {
    // this.userMgmntService.getUserTypes().subscribe(
    //   (userTypes: any) => {
    //     this.userType = userTypes.find(x => x._id === localStorage.getItem('userType')).description;
    //     this.userTypeId = userTypes.find(x => x._id === localStorage.getItem('userType'))._id;
    //   },
    //   err => console.log(err)
    // );
    this.state.patchValue('21');
    this.relation.patchValue('Self'); this.relation.disable();
    this.relation_mr.patchValue('स्वतः'); this.relation_mr.disable();
    // this.userMgmntService.getUserTypes().subscribe(
    //   (userTypes: any) => {
    //     this.userType = userTypes.find(x => x._id === localStorage.getItem('userType')).description;
    //     if (!!this.userType && this.userType === 'Applicant') {
    //       this.getApplicantsDetails();
    //     } else if (!!this.userType && (this.userType === 'Data Entry Operator' || this.userType === 'Field Agents')) {
    //       if (!this.selectedApplicationData) this.modes = Modes.create;
    //       else this.modes = Modes.update;
    //     } else if (!!this.userType && (this.userType === 'Principal Secretary' || this.userType === 'Commissioner' || this.userType === 'Secretary/CEO' || this.userType === 'ACL' || this.userType === 'GLO' || this.userType === 'Asst Account Officer' || this.userType === 'Clerk' || this.userType === 'WFC I/c')) {
    //       this.modes = Modes.read;
    //     }

    //     this.checkModes();
    //   },
    //   err => console.log(err)
    // );

    this.httpService.getDistricts(21).subscribe((districtsArrObj: any) => {
      // create district-name:district-id key-value in district
      for (const i of districtsArrObj) this.districts[i.district_name] = i.district_id;
    }, err => console.log(err));


    // residential address
    this.district.valueChanges.subscribe(value => {
      this.talukasRes = [];
      this.postOfficeArrayRes = [];
      if (this.state.value && value){
        // create taluka-name:taluka-id key-value in talukaRes
        this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
          for (const i of talukaArrObj) this.talukasRes[i.taluka_name] = i.taluka_id;
        }, err => console.log(err))
      }
      else this.talukasRes = [];
    });


    this.taluka.valueChanges.subscribe(value => {
      this.postOfficeArrayRes=[]
      if(this.state.value && this.district.value && value){
          // create post-office-name:post-office-id key-value in postOfficeArrayRes
          this.httpService.getPostOffices(value).subscribe((postOfficeArrObj:any)=>{
            for (const i of postOfficeArrObj) {
              this.postOfficeArrayRes[i.post_office_name] = i.post_office_id;
              this.pincodeArrayRes[i.post_office_id]=i.pincode
            }
          },err => console.log(err));
      }
    });
    
    this.postOffice.valueChanges.subscribe(value => {
      if(this.state.value && this.district.value && this.taluka.value){
        this.pincode.patchValue(this.pincodeArrayRes[value]);
      }
    });


    // // permanent address
    this.statePer.valueChanges.subscribe(value => {
      if (value === 'MAHARASHTRA' || value === '21') {
        this.migrant.patchValue(false);
        this.migrant_mr.patchValue(false);
      } else {
        this.migrant.patchValue(true);
        this.migrant_mr.patchValue(true);
      }
    });

    this.districtPer.valueChanges.subscribe(value => {
      this.talukasPer = [];
      if (this.statePer.value && value) {
        // create taluka-name:taluka-id key-value in talukaRes
        this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
          for (const i of talukaArrObj) {
            this.talukasPer[i.taluka_name] = i.taluka_id;
          }
        }, err => console.log(err))
      }
      else {
        this.talukasPer = [];
      }
    });

    this.talukaPer.valueChanges.subscribe(value => {
      this.postOfficeArrayPer = []
      if (this.statePer.value && this.districtPer.value && value) {
        // create post-office-name:post-office-id key-value in postOfficeArrayRes
        this.httpService.getPostOffices(value).subscribe((postOfficeArrObj: any) => {

          for (const i of postOfficeArrObj) {
            this.postOfficeArrayPer[i.post_office_name] = i.post_office_id;
            this.pincodeArrayPer[i.post_office_id] = i.pincode
          }
        }, err => console.log(err));
      }else{
        this.postOfficeArrayPer = [];
      }
    });

    this.postOfficePer.valueChanges.subscribe(value => {
      if (this.statePer.value && this.districtPer.value && this.talukaPer.value) {
        this.pincode.patchValue(this.pincodeArrayPer[value]);
      }
    });

    // employer detail
    this.districtEmp.valueChanges.subscribe(value => {
      this.talukasEmp = [];
      this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
        for (const i of talukaArrObj) {
          this.talukasEmp[i.taluka_name] = i.taluka_id;
        }
      }, err => console.log(err))
    });

    this.appointmentDateEmp.valueChanges.subscribe(value=>{
      const val = new Date(value).toJSON().slice(0, 10).split('-');
      const dob = val[0] + '-' + val[1] + '-' + val[2]
      this.registrationFormGroup.get('employerDetails').get('appointmentDateEmp').patchValue(dob, {emitEvent:false})
    },err=>console.log(err));

    this.dispatchDateEmp.valueChanges.subscribe(value => {
      const val = new Date(value).toJSON().slice(0, 10).split('-');
      const dob = val[0] + '-' + val[1] + '-' + val[2]
      this.registrationFormGroup.get('employerDetails').get('dispatchDateEmp').patchValue(dob, { emitEvent: false })
    },err=>console.log(err));

  }

  ngAfterViewInit() {
    const list = this.listOfControlRefs.toArray();
    for (const el of list) {
      if (el.viewRef.element.nativeElement.classList.contains('transliterate')) {
        el.viewRef.element.nativeElement.addEventListener('ionBlur', (event) => {
          this.transliterateValue(event);

        });
      } else {

        this.copyValue(el);
      }
    }
  }


  getApplicantsDetails() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.httpService.getApplicantsDetails(user._id).subscribe(
      data => {
        this.selectedApplicationData = data;
        this.modes = Modes.update;
      },
      err => console.log(err)
    );
  }

  checkModes() {
    switch (this.modes) {
      case 'update': {
        this.registrationFormGroup.patchValue(this.selectedApplicationData);
        this.viewAttachedDocuments();
        break;
      }
      case 'read': {
        this.registrationFormGroup.patchValue(this.selectedApplicationData);
        this.viewAttachedDocuments();
        this.registrationFormGroup.disable();
        break;
      }
      default:
        break;
    }
  }

   viewAttachedDocuments() {
    const docs = this.selectedApplicationData.supportingDocuments;
    for (const item in docs) {
      if (!!docs[item]) {
        switch (item) {
          case 'applicantPhoto':
            this.uploadedImageUrl = `${serverUrl}registration-and-renewal/getfile/${this.selectedApplicationData._id}/${docs[item]}?x-access-token=${localStorage.getItem('token')}`;
            break;
          case 'bankPassbook':
            this.uploadedbankPassbook = `${serverUrl}registration-and-renewal/getfile/${this.selectedApplicationData._id}/${docs[item]}?x-access-token=${localStorage.getItem('token')}`;
            break;
          case 'suppDocument':
            this.uploadedSupportingDocument = `${serverUrl}registration-and-renewal/getfile/${this.selectedApplicationData._id}/${docs[item]}?x-access-token=${localStorage.getItem('token')}`;
            break;
          case 'workCertificate':
            this.uploadedWorkCertificate = `${serverUrl}registration-and-renewal/getfile/${this.selectedApplicationData._id}/${docs[item]}?x-access-token=${localStorage.getItem('token')}`;
            break;
        }
      }
    }
  }

  transliterateDirect(event) {
    if (event.target.classList.contains('transliterate')) {
      this.transliterateValue(event);
    } else {
      this.copyValue(event);
    }
  }

  transliterateDTP(event) { // Ditrcit taluka post-office    
    const targetsArray = event.target.id.split('-');
    console.log(event)
    let target: any;
    let DTPObject:any;
    console.log(targetsArray)
    debugger
    //choose if it is district/taluka/postoffice
    
    if (targetsArray[2]==='district' || targetsArray[1]==='districtEmp')
        DTPObject=this.districts
    else if (targetsArray[2] ==='taluka' || targetsArray[1]==='talukaEmp')
        DTPObject=this.talukasRes
    else DTPObject=this.postOfficeArrayRes;
    
    //set formControl
    if (targetsArray.length === 2) {
      target = this.registrationFormGroup.get(targetsArray[0]).get(`${targetsArray[1]}_mr`);
    } else target = this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`)

    //get the string for id
    const DTPValue = Object.keys(DTPObject).find(key => DTPObject[key] === event.target.value);
    // if (event.target.id.split('-').length === 2) {
    //   target = this.registrationFormGroup.get(targetsArray[0]).get(`${targetsArray[1]}_mr`);
    // } else if (event.target.id.split('-').length === 3) {
    //   target = this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`)
    // } else {
    //   target = this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(targetsArray[2]).get(`${targetsArray[3]}_mr`);
    // }

    try {
      this.transliterate.transliterateText(DTPValue, 'NAME').subscribe((response: any) => {
        const result = response.split(';').map((item) => {
          return item.split('^')[0];
        });        
        target.patchValue(result.join(' '));
      });
    } catch {
      target.patchValue('');
    }
    console.log(target.value);
        //console.log(this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`).value);
  }

  transliterateValue(event) {
    let target: any;
    const targetsArray = event.target.id.split('-');
    if (event.target.id.split('-').length === 2) {
      target = this.registrationFormGroup.get(targetsArray[0]).get(`${targetsArray[1]}_mr`);
    } else if (event.target.id.split('-').length === 3) {
      target = this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`);
    } else {
      target = this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(targetsArray[2]).get(`${targetsArray[3]}_mr`);
    }

    try {
      this.transliterate.transliterateText(event.target.value, 'NAME').subscribe((response: any) => {
        console.log(response);
        const result = response.split(';').map((item) => {
          return item.split('^')[0];
        });

        target.patchValue(result.join(' '));
      });
    } catch {
      target.patchValue('');
    }
  }

  copyValue(x) {
    let idArray;
    if (x.viewRef) {
      idArray = x.viewRef.element.nativeElement.id.split('-');
    } else {
      idArray = x.target.id.split('-');
    }

    if (idArray.length === 2) {
      const control = this.registrationFormGroup.get(idArray[0]).get(idArray[1]);
      control.valueChanges.subscribe((changes) => {
        control.patchValue(changes, { emitEvent: false });
      });
    } else if (idArray.length === 3) {
      const control = this.registrationFormGroup.get(idArray[0]).get(idArray[1]).get(idArray[2]);
      control.valueChanges.subscribe((changes) => {
        control.patchValue(changes, { emitEvent: false });
      });
    // tslint:disable-next-line: align
    } if (idArray.length === 4) {
      const control = this.registrationFormGroup.get(idArray[0]).get(idArray[1]).get(idArray[2]).get(idArray[3]);
      control.valueChanges.subscribe((changes) => {
        control.patchValue(changes, { emitEvent: false });
      });
    }
  }

  handleSpecialDropdowns(event) {
    const idArray = event.target.id.split('-');
    if (idArray.length === 2) {
      this.registrationFormGroup.get(idArray[0]).get(`${idArray[1]}_mr`).patchValue(event.target.value, { emitEvent: false });
      
      console.log(this.registrationFormGroup.get(idArray[0]).get(`${idArray[1]}_mr`).value);
    } else if (idArray.length === 3) {
      this.registrationFormGroup.get(idArray[0]).get(idArray[1]).get(`${idArray[2]}_mr`).patchValue(event.target.value, { emitEvent: false });
      console.log(this.registrationFormGroup.get(idArray[0]).get(idArray[1]).get(`${idArray[2]}_mr`).value);
    }
  }

  // getSpecialDropDownValue(value: string) {
  //   return this.specialOptions.marathi[this.specialOptions.english.indexOf(value)];
  // }

  calculateAge() {

    const val = new Date(this.registrationFormGroup.get('personalDetails').get('dobPersonal').value).toJSON().slice(0, 10).split('-');
    const dob = moment(
      val[0] + '-' + val[1] + '-' + val[2],
      'YYYY-MM-DD'
    );
    const dobServer= val[0]+ '-' + val[1] + '-' + val[2]   //stores date to show in ion-datetime
    if (dob) {
      this.registrationFormGroup.get('personalDetails').get('dobPersonal').patchValue(dobServer, { emitEvent: false });
      const age = moment().diff(moment(dob, 'YYYY-MM-DD'), 'years');
      if (dob) {
        if (age > 17 && age < 61) {
          this.registrationFormGroup.get('personalDetails').get('agePersonal').setValue(age);
        } else {
          alert('Applicant age should be greater than 18 and less than 60 ');
          this.registrationFormGroup.get('personalDetails').get('agePersonal').setValue('');
          this.registrationFormGroup.get('personalDetails').get('dobPersonal').setValue('');
        }
      }
    }
  }

  getter(formGroup) {
    const formValue = formGroup.value;
    const formKeys: string[] = Object.keys(formValue);
    for (const i in formKeys) {
      if (typeof (formValue[formKeys[i]]) === "object") {
        this.getter(formGroup.get(formKeys[i]));
      } else {
        this.getterObj[formKeys[i]] = formGroup.get(formKeys[i]);
      }
    }
  }

  copyAddress(event: any) {
    this.registrationFormGroup.get('personalDetails').get('permanentEqualsResidentialAddress').patchValue(this.registrationFormGroup.get('personalDetails').get('permanentEqualsResidentialAddress').value, { emitEvent: false });
    this.talukasPer = this.talukasRes;
    this.postOfficeArrayPer = this.postOfficeArrayRes;
    this.pincodeArrayPer= this.pincodeArrayRes
    this.migrant.patchValue(false);
    this.migrant_mr.patchValue(false);

    const resAddress = this.registrationFormGroup.get('personalDetails').get(
      'residentialAddress'
    );
    const permAddress = this.registrationFormGroup.get('personalDetails').get(
      'permanentAddress'
    );
    if (event.target.checked) {
      permAddress.patchValue(resAddress.value);
      permAddress.disable();
    } else {
      permAddress.patchValue(this.addressFormGroup().value);
      permAddress.enable();
    }
  }

   applyNominee(i: number) {
    const familyDetails = this.registrationFormGroup.get('familyDetails')['controls'];
    for (const j in familyDetails) {
      familyDetails[j].get('nominee').setValue('no');
    }
    this.registrationFormGroup.get('familyDetails').get(i.toString()).get('nominee').setValue('yes');
  }

  calculateAgeForFamilyDetails(i: string) {
    const val = this.registrationFormGroup.get('familyDetails').get(i.toString()).get('dobFamily').value;
    if (val) {
      const dob = moment(
        val.year + '-' + val.month + '-' + val.day,
        'YYYY-MM-DD'
      );
      const age = moment().diff(moment(dob, 'YYYY-MM-DD'), 'years');
      this.registrationFormGroup.get('familyDetails').get(i.toString()).get('ageFamily').setValue(age);
    }
  }

  deleteFamilyDetail(i: number) {
    const familyDetailsArray = this.registrationFormGroup.get('familyDetails') as FormArray;
    familyDetailsArray.removeAt(i);
    if (familyDetailsArray.length === 0) {
      familyDetailsArray.push(this.familyDetailsFormGroup());
    }
  }

  addMoreFamilyDetails() {
    const familyDetailsArray = this.registrationFormGroup.get('familyDetails') as FormArray;
    familyDetailsArray.push(this.familyDetailsFormGroup());
  }

  calculateAgeFamily(i: number) {
    const val = this.registrationFormGroup.value.familyDetails[i].dob;
    if (val) {
      const dob = moment(val.year + '-' + val.month + '-' + val.day, 'YYYY-MM-DD');
      const age = moment().diff(moment(dob, 'YYYY-MM-DD'), 'years');
      this.registrationFormGroup.get('familyDetails')['controls'][i].get('age').setValue(age);
    }
  }


  searchByIfscCode() {
    this.bankDetails = {
      BANK: '',
      BRANCH: '',
      Address: ''
    };
    this.registration.callIfscCodeApi(this.ifscCode.value).subscribe(bankDetails => {
      if (!!bankDetails) {
        this.isIfscCodeFound = true;
        this.bankDetails = bankDetails;
        this.registrationFormGroup.get('bankDetails').get('bankName').patchValue(this.bankDetails.BANK);
        this.registrationFormGroup.get('bankDetails').get('bankBranch').patchValue(this.bankDetails.BRANCH);
        this.registrationFormGroup.get('bankDetails').get('bankAddress').patchValue(this.bankDetails.ADDRESS);
      }
    },
      error1 => {
        alert('IFSC Code Not Found.Please fill bank details manually');
        this.bankDetails = {
          BANK: '',
          BRANCH: '',
          Address: ''
        };
        this.isIfscCodeFound = false;
      });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }

  selectAttachmentType(event: any, i: number) {
    const docTypeValue = event.target.value;
    this.registrationFormGroup.get('supportingDocuments')
      .get('attachmentList')
      .get(i.toString())
      .get('attached')
      .setValue(true);
    const attachmentList = this.registrationFormGroup.get('supportingDocuments').get(
      'attachmentList'
    ) as FormArray;
    this.attachmentDetails.forEach(attachment => {
      const index = this.attachmentDetails.indexOf(attachment);
      if (
        attachment.attachmentType.find(
          type => type.value.toString() === docTypeValue
        ) &&
        attachmentList.get([index]).get('attachmentType').value === ''
      ) {
        attachmentList
          .get([index])
          .get('attachmentType')
          .setValue(docTypeValue);
        attachmentList
          .get([index])
          .get('attached')
          .setValue(true);
      }
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.files[event.target.id] = file;
    this.fileOptions[event.target.id] = `${Date.now()}-${file.name}`;
  }

  save() {
    console.log(this.registrationFormGroup);
    debugger;
    if (this.registrationFormGroup.valid) {
      const formData = new FormData();
      // tslint:disable-next-line: forin
      for (const item in this.files) {
        if (this.files[item]) {
          formData.append('files', this.files[item], this.fileOptions[item]);
        }
        formData.append('files', JSON.stringify(this.registrationFormGroup.get('supportingDocuments').value));
        formData.append('fileOptions', JSON.stringify(this.fileOptions));

        formData.append('data', JSON.stringify(this.registrationFormGroup.getRawValue()));
      }
      this.httpService.saveData(formData).subscribe(
        (res: any) => {
          alert('Data Saved');
          console.log(res);
          this.router.navigate(['/home']);
        },
        (err: any) => console.error(err)
      );
    }
    else {
      alert('Form is not valid yet!');
    }
  }




  personalDetailsFormFroup(): FormGroup {
    return new FormGroup({
      firstNamePersonal: new FormControl('', this.validationService.createValidatorsArray('firstName')),
      firstNamePersonal_mr: new FormControl(''),
      middleNamePersonal: new FormControl('', this.validationService.createValidatorsArray('middleName')),
      middleNamePersonal_mr: new FormControl(''),
      lastNamePersonal: new FormControl('', this.validationService.createValidatorsArray('lastName')),
      lastNamePersonal_mr: new FormControl(''),
      genderPersonal: new FormControl('', this.validationService.createValidatorsArray('gender')),
      genderPersonal_mr: new FormControl(''),
      dobPersonal: new FormControl('', this.validationService.createValidatorsArray('dob')),
      agePersonal: new FormControl('', this.validationService.createValidatorsArray('age')),
      maritalStatusPersonal: new FormControl('', this.validationService.createValidatorsArray('maritalStatus')),
      maritalStatusPersonal_mr: new FormControl(''),
      rationCardNumberPersonal: new FormControl('', this.validationService.createValidatorsArray('rationCardNumber')),
      rationCardTypePersonal: new FormControl('', this.validationService.createValidatorsArray('rationCardType')),
      rationCardTypePersonal_mr: new FormControl(''),
      categoryPersonal: new FormControl('', this.validationService.createValidatorsArray('category')),
      categoryPersonal_mr: new FormControl(''),
      pfOrUanPersonal: new FormControl('', this.validationService.createValidatorsArray('pfOrUan')),
      esicNoPersonal: new FormControl('', this.validationService.createValidatorsArray('esicNo')),
      emailPersonal: new FormControl('', this.validationService.createValidatorsArray('email')),
      mobilePersonal: new FormControl('', this.validationService.createValidatorsArray('mobile')),
      aadharNoPersonal: new FormControl('', this.validationService.createValidatorsArray('aadharNo')),
      permanentEqualsResidentialAddress: new FormControl(false),
      registrationDatePersonal: new FormControl('', this.validationService.createValidatorsArray('registrationDate')),
      residentialAddress: this.addressFormGroup(),
      permanentAddress: this.addressFormGroup(),
    });
  }

  bankDetailsFormFroup(): FormGroup {
    return new FormGroup({
      ifscCode: new FormControl('', this.validationService.createValidatorsArray('ifscCode')),
      // fullName: new FormControl('', this.validationService.createValidatorsArray('fullName')),
      // fullName_mr: new FormControl(''),
      bankName: new FormControl('', this.validationService.createValidatorsArray('bankName')),
      bankBranch: new FormControl('', this.validationService.createValidatorsArray('bankBranch')),
      bankAddress: new FormControl('', this.validationService.createValidatorsArray('bankAddress')),
      micrCode: new FormControl('', this.validationService.createValidatorsArray('micrCode')),
      accountNumber: new FormControl('', this.validationService.createValidatorsArray('accountNumber'))
    });
  }

  familyDetailsFormGroup(): FormGroup {
    return new FormGroup({
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
    });
  }
  addressFormGroup(): FormGroup {
    return new FormGroup({
      houseNo: new FormControl('', this.validationService.createValidatorsArray('houseNo')),
      road: new FormControl('', this.validationService.createValidatorsArray('road')),
      area: new FormControl('', this.validationService.createValidatorsArray('area')),
      city: new FormControl('', this.validationService.createValidatorsArray('city')),
      importantPlace: new FormControl('', this.validationService.createValidatorsArray('importantPlace')),
      postOffice: new FormControl('', this.validationService.createValidatorsArray('postOffice')),
      taluka: new FormControl('', this.validationService.createValidatorsArray('taluka')),
      district: new FormControl('', this.validationService.createValidatorsArray('district')),
      state: new FormControl('', this.validationService.createValidatorsArray('state')),
      pincode: new FormControl('', this.validationService.createValidatorsArray('pincode')),
      stdcode: new FormControl('', this.validationService.createValidatorsArray('stdcode')),
      phone: new FormControl('', this.validationService.createValidatorsArray('phone')),
      houseNo_mr: new FormControl(''),
      road_mr: new FormControl(''),
      area_mr: new FormControl(''),
      city_mr: new FormControl(''),
      importantPlace_mr: new FormControl(''),
      postOffice_mr: new FormControl(''),
      taluka_mr: new FormControl(''),
      district_mr: new FormControl(''),
      state_mr: new FormControl('महाराष्ट्र'),
    });
  }

  employerDetailsFormFroup(): FormGroup {
    return new FormGroup({
      contractorNameEmp: new FormControl('', [Validators.pattern('[a-zA-z\\s]{1,60}')]),
      contractorCompanyNameEmp: new FormControl('', [Validators.maxLength(40)]),
      contractorPhoneEmp: new FormControl('', [Validators.pattern('^[0-9]{5,12}$')]),
      workPlaceEmp: new FormControl('', [Validators.maxLength(50)]),
      townEmp: new FormControl('', [Validators.required]),
      talukaEmp: new FormControl('', [Validators.required]),
      districtEmp: new FormControl('', [Validators.required]),
      pinCodeEmp: new FormControl('', [Validators.pattern('^\\d{6}$')]),
      appointmentDateEmp: new FormControl(null),
      remunerationPerDayEmp: new FormControl('', [Validators.maxLength(8)]),
      natureOfWorkEmp: new FormControl('', [Validators.required]),
      typeOfEmployerEmp: new FormControl(''),
      fullNameOfIssuerEmp: new FormControl('', [Validators.pattern('[a-zA-z\\s]{8,60}')]),
      registrationNumberEmp: new FormControl('', [Validators.pattern('^[0-9]{5,12}$')]),
      registrationTypeEmp: new FormControl(''),
      mobileNumberOfIssuerEmp: new FormControl('', [Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$')]),
      documentRefNumberEmp: new FormControl('', [Validators.maxLength(20)]),
      dispatchDateEmp: new FormControl(null),
      migrant: new FormControl(''),
      migrant_mr: new FormControl(''),
      MNREGACardNumberEmp: new FormControl(''),
      contractorNameEmp_mr: new FormControl(''),
      contractorCompanyNameEmp_mr: new FormControl(''),
      workPlaceEmp_mr: new FormControl(''),
      townEmp_mr: new FormControl(''),
      talukaEmp_mr: new FormControl(''),
      districtEmp_mr: new FormControl(''),
      natureOfWorkEmp_mr: new FormControl(''),
      typeOfEmployerEmp_mr: new FormControl(''),
      fullNameOfIssuerEmp_mr: new FormControl(''),
      registrationTypeEmp_mr: new FormControl('')
    });
  }

  attachmentListFormGroup(): FormGroup {
    return new FormGroup({
      attachmentType: new FormControl(''),
      attached: new FormControl('')
    });
  }

  supportingDocumentsFormFroup(): FormGroup {
    return new FormGroup({
      attachmentList: new FormArray([]),
      supportingDocuments: new FormControl(''),
      applicantPhoto: new FormControl(''),
      registrationReceipt: new FormControl('')
    });
  }

    // Getters

  get firstName() {
    return this.registrationFormGroup.get('personalDetails').get('firstName');
  }


  // personal getters
  get firstNamePersonal() { return this.registrationFormGroup.get('personalDetails').get('firstNamePersonal'); }
  get firstNamePersonal_mr() { return this.registrationFormGroup.get('personalDetails').get('firstNamePersonal_mr'); }
  get middleNamePersonal() { return this.registrationFormGroup.get('personalDetails').get('middleNamePersonal'); }
  get middleNamePersonal_mr() { return this.registrationFormGroup.get('personalDetails').get('middleNamePersonal_mr'); }
  get lastNamePersonal() { return this.registrationFormGroup.get('personalDetails').get('lastNamePersonal'); }
  get lastNamePersonal_mr() { return this.registrationFormGroup.get('personalDetails').get('lastNamePersonal_mr'); }
  get genderPersonal() { return this.registrationFormGroup.get('personalDetails').get('genderPersonal'); }
  get genderPersonal_mr() { return this.registrationFormGroup.get('personalDetails').get('genderPersonal_mr'); }
  get dobPersonal() { return this.registrationFormGroup.get('personalDetails').get('dobPersonal'); }
  get agePersonal() { return this.registrationFormGroup.get('personalDetails').get('agePersonal'); }
  get maritalStatusPersonal() { return this.registrationFormGroup.get('personalDetails').get('maritalStatusPersonal'); }
  get maritalStatusPersonal_mr() { return this.registrationFormGroup.get('personalDetails').get('maritalStatusPersonal_mr'); }
  get rationCardNumberPersonal() { return this.registrationFormGroup.get('personalDetails').get('rationCardNumberPersonal'); }
  get rationCardTypePersonal() { return this.registrationFormGroup.get('personalDetails').get('rationCardTypePersonal'); }
  get rationCardTypePersonal_mr() { return this.registrationFormGroup.get('personalDetails').get('rationCardTypePersonal_mr'); }
  get categoryPersonal() { return this.registrationFormGroup.get('personalDetails').get('categoryPersonal'); }
  get categoryPersonal_mr() { return this.registrationFormGroup.get('personalDetails').get('categoryPersonal_mr'); }
  get pfOrUanPersonal() { return this.registrationFormGroup.get('personalDetails').get('pfOrUanPersonal'); }
  get esicNoPersonal() { return this.registrationFormGroup.get('personalDetails').get('esicNoPersonal'); }
  get emailPersonal() { return this.registrationFormGroup.get('personalDetails').get('emailPersonal'); }
  get mobilePersonal() { return this.registrationFormGroup.get('personalDetails').get('mobilePersonal'); }
  get aadharNoPersonal() { return this.registrationFormGroup.get('personalDetails').get('aadharNoPersonal'); }
  get registrationDatePersonal() { return this.registrationFormGroup.get('personalDetails').get('registrationDatePersonal'); }


  // personal residential address
  get houseNo() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('houseNo'); }
  get road() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('road'); }
  get area() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('area'); }
  get city() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('city'); }
  get importantPlace() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('importantPlace'); }
  get postOffice() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('postOffice'); }
  get taluka() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('taluka'); }
  get district() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('district'); }
  get state() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('state'); }
  get pincode() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('pincode'); }
  get stdcode() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('stdcode'); }
  get phone() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('phone'); }
  get houseNo_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('houseNo_mr'); }
  get road_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('road_mr'); }
  get area_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('area_mr'); }
  get city_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('city_mr'); }
  get importantPlace_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('importantPlace_mr'); }
  get postOffice_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('postOffice_mr'); }
  get taluka_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('taluka_mr'); }
  get district_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('district_mr'); }
  get state_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('state_mr'); }


  // personal permanent address
  get houseNoPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('houseNo'); }
  get roadPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('road'); }
  get areaPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('area'); }
  get cityPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('city'); }
  get importantPlacePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('importantPlace'); }
  get postOfficePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('postOffice'); }
  get talukaPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('taluka'); }
  get districtPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('district'); }
  get statePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('state'); }
  get pincodePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('pincode'); }
  get stdcodePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('stdcode'); }
  get phonePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('phone'); }
  get houseNo_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('houseNo_mr'); }
  get road_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('road_mr'); }
  get area_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('area_mr'); }
  get city_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('city_mr'); }
  get importantPlace_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('importantPlace_mr'); }
  get postOffice_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('postOffice_mr'); }
  get taluka_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('taluka_mr'); }
  get district_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('district_mr'); }
  get state_mrPer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('state_mr'); }


  // employer getters
  get contractorNameEmp() { return this.registrationFormGroup.get('employerDetails').get('contractorNameEmp'); }
  get contractorCompanyNameEmp() { return this.registrationFormGroup.get('employerDetails').get('contractorCompanyNameEmp'); }
  get contractorPhoneEmp() { return this.registrationFormGroup.get('employerDetails').get('contractorPhoneEmp'); }
  get workPlaceEmp() { return this.registrationFormGroup.get('employerDetails').get('workPlaceEmp'); }
  get townEmp() { return this.registrationFormGroup.get('employerDetails').get('townEmp'); }
  get talukaEmp() { return this.registrationFormGroup.get('employerDetails').get('talukaEmp'); }
  get districtEmp() { return this.registrationFormGroup.get('employerDetails').get('districtEmp'); }
  get pinCodeEmp() { return this.registrationFormGroup.get('employerDetails').get('pinCodeEmp'); }
  get appointmentDateEmp() { return this.registrationFormGroup.get('employerDetails').get('appointmentDateEmp'); }
  get remunerationPerDayEmp() { return this.registrationFormGroup.get('employerDetails').get('remunerationPerDayEmp'); }
  get natureOfWorkEmp() { return this.registrationFormGroup.get('employerDetails').get('natureOfWorkEmp'); }
  get typeOfEmployerEmp() { return this.registrationFormGroup.get('employerDetails').get('typeOfEmployerEmp'); }
  get fullNameOfIssuerEmp() { return this.registrationFormGroup.get('employerDetails').get('fullNameOfIssuerEmp'); }
  get registrationNumberEmp() { return this.registrationFormGroup.get('employerDetails').get('registrationNumberEmp'); }
  get registrationTypeEmp() { return this.registrationFormGroup.get('employerDetails').get('registrationTypeEmp'); }
  get mobileNumberOfIssuerEmp() { return this.registrationFormGroup.get('employerDetails').get('mobileNumberOfIssuerEmp'); }
  get documentRefNumberEmp() { return this.registrationFormGroup.get('employerDetails').get('documentRefNumberEmp'); }
  get dispatchDateEmp() { return this.registrationFormGroup.get('employerDetails').get('dispatchDateEmp'); }
  get migrant() { return this.registrationFormGroup.get('employerDetails').get('migrant') }
  get MNREGACardNumberEmp() { return this.registrationFormGroup.get('employerDetails').get('MNREGACardNumberEmp'); }
  get contractorNameEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('contractorNameEmp_mr'); }
  get contractorCompanyNameEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('contractorCompanyNameEmp_mr'); }
  get workPlaceEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('workPlaceEmp_mr'); }
  get townEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('townEmp_mr'); }
  get talukaEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('talukaEmp_mr'); }
  get districtEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('districtEmp_mr'); }
  get natureOfWorkEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('natureOfWorkEmp_mr'); }
  get typeOfEmployerEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('typeOfEmployerEmp_mr'); }
  get fullNameOfIssuerEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('fullNameOfIssuerEmp_mr'); }
  get registrationTypeEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('registrationTypeEmp_mr'); }
  get migrant_mr() { return this.registrationFormGroup.get('employerDetails').get('migrant_mr');}
  
  //FamilyDetails Getter
  get firstNameFamily() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('firstNameFamily'); }
  get firstNameFamily_mr() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('firstNameFamily_mr'); }
  get surname() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('surname'); }
  get surname_mr() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('surname_mr'); }
  get ageFamily() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('ageFamily'); }
  get dobFamily() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('dobFamily'); }
  get relation() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('relation'); }
  get relation_mr() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('relation_mr'); }
  get fatherOrHusbandName() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('fatherOrHusbandName'); }
  get fatherOrHusbandName_mr() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('fatherOrHusbandName_mr'); }


  // BankDetail getter

  get fullName() {
    return this.registrationFormGroup.get('bankDetails').get('fullName');
  }

  get ifscCode() {
    return this.registrationFormGroup.get('bankDetails').get('ifscCode');
  }

  get bankName() {
    return this.registrationFormGroup.get('bankDetails').get('bankName');
  }

  get bankBranch() {
    return this.registrationFormGroup.get('bankDetails').get('bankBranch');
  }

  get bankAddress() {
    return this.registrationFormGroup.get('bankDetails').get('bankAddress');
  }

  get micrCode() {
    return this.registrationFormGroup.get('bankDetails').get('micrCode');
  }

  get accountNumber() {
    return this.registrationFormGroup.get('bankDetails').get('accountNumber');
  }

  get placeOfRegistration() {
    return this.registrationFormGroup.get('bankDetails').get('placeOfRegistration');
  }

  get dateOfRegistration() {
    return this.registrationFormGroup.get('bankDetails').get('dateOfRegistration');
  }



}

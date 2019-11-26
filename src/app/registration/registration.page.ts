import * as moment from 'moment';
import * as uuidv4 from 'uuid/v4';
import { Component, OnInit, ViewChild, QueryList, ViewChildren, AfterViewInit, ViewContainerRef, ComponentRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { states } from '../models/states';
import { Modes } from '../../assets/modes';
import { serverUrl } from '../../assets/config';
import { ValidationService } from '../services/validation.service';
import { TransliterationService } from '../services/transliteration.service';
import { FormControlDirective } from '../directives/form-control.directive';
import { SuggestionBoxComponent } from '../components/suggestion-box/suggestion-box.component';
import { RegistrationService } from '../services/registration.service';
import { UserManagementService } from '../services/user-management.service';
import { HttpService } from '../services/http.service';
import { UserInfo, familyModalData, EmployerModalData } from '../../assets/common.interface';
import { FamilyModalPage } from '../family-modal/family-modal.page';
import { EmployerModalPage } from '../employer-modal/employer-modal.page';
import { Subscription } from 'rxjs';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

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
  public maxTodaysDate: any;
  public endDate: any;
  public maxAppointmentDate: any;
  public minAppointmentDate: any;
  public appointmentDate: any;
  public minFromDate: string;
  public maxToDate: string;
  public dateOfBirth: any;
  public attachmentDetails: any = [];
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
  public elseStateFlag: boolean;
  public districts: any[] = [];
  public talukasRes: any[] = [];
  public postOfficeArrayRes: any[] = [];
  public pincodeArrayRes: any[] = [];
  public talukasPer: any[] = [];
  public postOfficeArrayPer: any[] = [];
  public pincodeArrayPer: any[] = [];
  public talukasEmp: any[] = [];
  public talukasIssuerEmp:any[] = [];
  public talukasIssuerGram:any[]=[];

  public genderOptions: string[] = [];
  public genderOptionsMarathi: string[] = [];
  public maritalStatusOptions: string[] = [];
  public maritalStatusOptionsMarathi: string[] = [];
  public rationCardTypeOptions: string[] = [];
  public rationCardTypeOptionsMarathi: string[] = [];
  public categoryOptions: string[] = [];
  public categoryOptionsMarathi: string[] = [];
  public familyHeaderOptions: string[];
  public familyHeaderOptionsMarathi: string[];
  public familyRelationOptions: string[] = [];
  public familyRelationOptionsMarathi: string[] = [];
  public educationOptions: string[] = [];
  public educationOptionsMarathi: string[] = [];
  public typeOfWorkOptions: string[] = [];
  public typeOfWorkOptionsMarathi: string[] = [];
  public natureOfWorkOptions: string[] = [];
  public natureOfWorkOptionsMarathi: string[] = [];
  public Days90HeaderOptions: string[] = [];

  public registrationTypeEmpArray: any[];
  public workingDay: number;
  public workingDayFlag: boolean;
  public issuers: any[];

  public typeOfIssuerOptions: string[] = [];
  public typeOfIssuerOptionsMarathi: string[] = [];
  public registrationTypeOptions: string[] = [];
  public registrationTypeOptionsMarathi: string[] = [];
  public workerTypeOptions: string[];
  public workerTypeOptionsMarathi: string[];
  public currentImage: any;


  public uploadedImage: File;
  public uploadedImageUrl: string;
  public uploadedbankPassbook: string;
  public uploadedWorkCertificate: string;
  public uploadedSupportingDocument: string;

  public selectedApplicationData: any;

  public files: {
    applicantPhoto: File,
    supportingDocuments: File,
    workCertificate: File,
    bankPassbook: File
  } = {
      applicantPhoto: null,
      supportingDocuments: null,
      workCertificate: null,
      bankPassbook: null
    };

  public fileOptions: {
    applicantPhoto: any,
    supportingDocuments: any,
    workCertificate: any,
    bankPassbook: any
  } = {
      applicantPhoto: null,
      supportingDocuments: null,
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
  public JWTToken: any;
  public wfcID: any;

  public mobileNo: number;
  public aadharNo: number;

  constructor(
    private validationService: ValidationService,
    private transliterate: TransliterationService,
    private router: Router,
    private route: ActivatedRoute,
    private registration: RegistrationService,
    private userMgmntService: UserManagementService,
    private httpService: HttpService,
    private mdlController: ModalController,
    private camera: Camera,
    private storage: Storage,
    private network: Network,
    private dialogs: Dialogs,
    private toast: Toast,
    private fileChooser: FileChooser) {

    // network subscribers check the status of network even its type
    this.network.onDisconnect().subscribe(() => { });
    this.network.onConnect().subscribe(() => { });


    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.mobilePersonal.setValue(this.router.getCurrentNavigation().extras.state.mobile);
        this.aadharNoPersonal.setValue(this.router.getCurrentNavigation().extras.state.aadhar);
        this.aadharNoFamily.setValue(this.router.getCurrentNavigation().extras.state.aadhar);
      } else {
        this.router.navigate(['/verification']);
      }
    });

    // re-route to homepage if not logged-in
    this.storage.get('token').then((val) => {
      if (val === null)
        this.router.navigate(['/home']);
      else
        this.JWTToken = val;
    });


    // fetch the list of gender from database
    this.httpService.getGenders().subscribe((genderArrObj: any) => {
      for (const i of genderArrObj) {
        this.genderOptions[Number(i.gender_id)] = i.gender;
        this.genderOptionsMarathi[Number(i.gender_id)] = i.gender_mr;
      }
    }, err => console.log(err));

    // fetch the list of marital-status from database
    this.httpService.getMaritalStatus().subscribe((maritalStatusArrObj: any) => {
      for (const i of maritalStatusArrObj) {
        this.maritalStatusOptions[Number(i.id)] = i.status;
        this.maritalStatusOptionsMarathi[Number(i.id)] = i.status_mr;
      }
    }, err => console.log(err));

    // fetch the list of Ration Card Types from database
    this.httpService.getRationCardTypes().subscribe((rationCardArrObj: any) => {
      for (const i of rationCardArrObj) {
        this.rationCardTypeOptions[Number(i.id)] = i.ration_card_type;
        this.rationCardTypeOptionsMarathi[Number(i.id)] = i.ration_card_type_mr;
      }
    }, err => console.log(err));

    // fetch the list of categories from database
    this.httpService.getCategory().subscribe((categoryArrObj: any) => {
      for (const i of categoryArrObj) {
        this.categoryOptions[Number(i.id)] = i.category;
        this.categoryOptionsMarathi[Number(i.id)] = i.category_mr;
      }
    }, err => console.log(err));

    // fetch the list of family-relations from database
    // tslint:disable-next-line: max-line-length
    this.httpService.getFamilyRelations().subscribe((familyRelationArrObj: any) => {
      for (const i of familyRelationArrObj) {
        this.familyRelationOptions[Number(i.family_relation_id)] = i.relation_title_en;
        this.familyRelationOptionsMarathi[Number(i.family_relation_id)] = i.relation_title_mr;
      }
    });

    this.httpService.getEducation().subscribe((educationArrObj: any) => {
      for (const i of educationArrObj) {
        this.educationOptions[Number(i.education_level_id)] = i.education_level_en;
        this.educationOptionsMarathi[Number(i.education_level_id)] = i.education_level_mr;
      }
    });


    // fetch the list of Nature of Work from database
    this.httpService.getTypeOfWork().subscribe((typeOfWorkArrObj: any) => {
      for (const i of typeOfWorkArrObj) {
        this.typeOfWorkOptions[Number(i.type_of_worker_id)] = i.type_of_worker_title;
        this.typeOfWorkOptionsMarathi[Number(i.type_of_worker_id)] = i.type_of_worker_title_mr;
      }
    }, err => console.log(err));
    // fetch the list of Nature of Work from database
    this.httpService.getNatureOfWork().subscribe((natureOfWorkArrObj: any) => {
      for (const i of natureOfWorkArrObj) {
        this.natureOfWorkOptions[Number(i.id)] = i.nature_of_work;
        this.natureOfWorkOptionsMarathi[Number(i.id)] = i.nature_of_work_mr;
      }
    }, err => console.log(err));

    this.Days90HeaderOptions = ['SNo.', 'Type of Issuer', 'Full Name', 'Issuer Reg. No.', 'Registration Type', 'Mobile number', 'Document Ref.No', 'From Date', 'To Date'];

    // fetch the list of Issuer types from database
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
      employerWorkDetails: new FormArray([this.employerWorkDetailsFormFroup()]),
      supportingDocuments: this.supportingDocumentsFormFroup(),
    });

    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.startDate = this.changeToIonDateTime(60, 'years');
    this.endDate = this.changeToIonDateTime(18, 'years');
    this.maxAppointmentDate = this.changeToIonDateTime(3, 'months');
    this.minAppointmentDate = this.changeToIonDateTime(18, 'years');
    this.maxTodaysDate = this.changeToIonDateTime(0, 'years');
    this.minFromDate = this.changeToIonDateTime(1, 'years')

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
      const suppDocAtachmentsFormArray = this.registrationFormGroup.get('supportingDocuments').get('attachmentList') as FormArray;
      suppDocAtachmentsFormArray.get(i.toString()).get('serial_no').patchValue(parseInt(i) + 1);
    }
  }

  ngOnInit() {

    this.elseStateFlag = false;
    this.workingDayFlag = true;
    this.workingDay = 0;
    this.state.patchValue('21');
    this.state_mr.patchValue('महाराष्ट्र');
    this.relation.patchValue('1');
    this.relation.disable();
    this.relation_mr.patchValue('1');
    this.relation_mr.disable();
    this.mobilePersonal.disable();
    this.aadharNoFamily.disable();
    this.aadharNoPersonal.disable();

    this.httpService.getDistricts(21).subscribe((districtsArrObj: any) => {
      // create district-name:district-id key-value in district
      for (const i of districtsArrObj) this.districts[i.district_name] = i.district_id;
    }, err => console.log(err));

    // residential address
    this.district.valueChanges.subscribe(value => {
      this.talukasRes = [];
      this.postOfficeArrayRes = [];
      if (this.state.value && value) {
        // create taluka-name:taluka-id key-value in talukaRes
        this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
          for (const i of talukaArrObj) this.talukasRes[i.taluka_name] = i.taluka_id;

        }, err => console.log(err));
      } else this.talukasRes = [];
    });


    this.taluka.valueChanges.subscribe(value => {
      this.postOfficeArrayRes = [];
      if (this.state.value && this.district.value && value) {
        // create post-office-name:post-office-id key-value in postOfficeArrayRes
        this.httpService.getPostOffices(value).subscribe((postOfficeArrObj: any) => {
          for (const i of postOfficeArrObj) {
            this.postOfficeArrayRes[i.post_office_name] = i.post_office_id;
            this.pincodeArrayRes[i.post_office_id] = i.pincode;
          }
        }, err => console.log(err));
      }
    });

    this.postOffice.valueChanges.subscribe(value => {
      if (this.state.value && this.district.value && this.taluka.value) {
        this.pincode.patchValue(this.pincodeArrayRes[value]);
      }
    });

    // // permanent address
    this.statePer.valueChanges.subscribe(value => {
      const rationCardNoControl = this.registrationFormGroup.get('personalDetails').get('rationCardNumberPersonal');
      const rationCardTypeControl = this.registrationFormGroup.get('personalDetails').get('rationCardTypePersonal');

      if (value === 'MAHARASHTRA' || value === '21' || value === 21) {
        this.statePer.patchValue(21, { emitEvent: false });
        this.elseStateFlag = false;
        this.migrant.patchValue(false);
        this.migrant_mr.patchValue(false);
        rationCardNoControl.setErrors({ required: true, minlength: true });
        rationCardNoControl.setValidators([Validators.required, Validators.minLength(8)]);
        rationCardTypeControl.setErrors({ required: true });
        rationCardTypeControl.setValidators([Validators.required]);
      } else {
        this.elseStateFlag = true;
        this.migrant.patchValue(true);
        this.migrant_mr.patchValue(true);
        rationCardNoControl.setErrors(null);
        rationCardNoControl.setValidators([]);
  
        rationCardTypeControl.setErrors(null);
        rationCardTypeControl.setValidators([]);
      }
    });

    this.districtPer.valueChanges.subscribe(value => {
      this.talukasPer = [];
      if (typeof value === 'number') {
        const districtValue = Object.keys(this.districts).find(key => this.districts[key] === value);
        this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('district').setValue(districtValue, { emitEvent: false });
      }
      if (typeof value === 'string') {
        value = this.districts[value];
      }
      if (this.statePer.value && value) {
        this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
          for (const i of talukaArrObj) {
            this.talukasPer[i.taluka_name] = i.taluka_id;
          }
        }, err => console.log(err));
      } else {
        this.talukasPer = [];
      }
    });

    this.talukaPer.valueChanges.subscribe(value => {
      this.postOfficeArrayPer = [];
      setTimeout(() => {
        if (typeof value === 'number') {
          const talukaValue = Object.keys(this.talukasPer).find(key => this.talukasPer[key] === value);
          this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('taluka').setValue(talukaValue, { emitEvent: false });
        }
        if (typeof value === 'string') {
          value = this.talukasPer[value];
        }
        if (this.statePer.value && this.districtPer.value && value) {
          this.httpService.getPostOffices(value).subscribe((postOfficeArrObj: any) => {
            for (const i of postOfficeArrObj) {
              this.postOfficeArrayPer[i.post_office_name] = i.post_office_id;
              this.pincodeArrayPer[i.post_office_name] = i.pincode;
            }
          }, err => console.log(err));
        } else {
          this.postOfficeArrayPer = [];
        }
      }, 1000);
    });

    this.postOfficePer.valueChanges.subscribe(value => {
      if (typeof value === 'number') {
        setTimeout(() => {
          if (this.statePer.value && this.districtPer.value && this.talukaPer.value) {
            const postOfficeValue = Object.keys(this.postOfficeArrayPer).find(key => this.postOfficeArrayPer[key] === value);
            this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('postOffice').setValue(postOfficeValue, { emitEvent: false });
            // this.pincode.patchValue(this.pincodeArrayPer[value]);
          }
        }, 2000);
      }
      this.pincodePer.patchValue(this.pincodeArrayPer[value]);
    });

    // employer detail
    this.districtEmp.valueChanges.subscribe(value => {
      this.talukasEmp = [];
      this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
        for (const i of talukaArrObj) {
          this.talukasEmp[i.taluka_name] = i.taluka_id;
        }
      }, err => console.log(err));
    });

    this.typeOfIssuer.valueChanges.subscribe((typeOfIssuerId)=>{
      if(typeOfIssuerId==='2'){
        this.registeredWith.reset();
        this.registrationNoOfIssuer.reset();
        this.nameOfEmployer.reset();
        this.nameOfEmployer_mr.reset();
        this.talukaOfEmployer.reset();
        this.talukaOfEmployer_mr.reset()
        this.districtOfEmployer.reset();
        this.districtOfEmployer_mr.reset();
      } else {
        this.nameOfGramPanchayat.reset();
        this.nameOfGramPanchayat_mr.reset();
        this.talukaOfGramPanchayat.reset();
        this.talukaOfGramPanchayat_mr.reset();
        this.districtOfGramPanchayat.reset();
        this.districtOfGramPanchayat_mr.reset();
      }
    })

    this.districtOfEmployer.valueChanges.subscribe(value => {
      this.talukasIssuerEmp = [];
      this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
        for (const i of talukaArrObj) {
          this.talukasIssuerEmp[i.taluka_name] = i.taluka_id;
        }
      }, err => console.log(err));
    });

    this.districtOfGramPanchayat.valueChanges.subscribe(value => {
      this.talukasIssuerGram = [];
      this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
        for (const i of talukaArrObj) {
          this.talukasIssuerGram[i.taluka_name] = i.taluka_id;
        }
      }, err => console.log(err));
    });

    this.appointmentDateEmp.valueChanges.subscribe(value => {
      if (moment(value).diff(this.minFromDate, 'years') === 0) {
        this.minFromDate = moment(value).format('YYYY-MM-DD');
      }
      this.appointmentDate = moment(value).format('YYYY-MM-DD');
      this.registrationFormGroup.get('employerDetails').get('appointmentDateEmp').patchValue(this.appointmentDate, { emitEvent: false });
    }, err => console.log(err));

    this.dispatchDateEmp.valueChanges.subscribe(value => {
      this.maxToDate = moment(value).format('YYYY-MM-DD');
      this.registrationFormGroup.get('employerDetails').get('dispatchDateEmp').patchValue(this.maxToDate, { emitEvent: false });
    }, err => console.log(err));

    this.isBocwRegistered(0);
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
    this.httpService.getApplicantsDetails(user._id, this.JWTToken).subscribe(
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
          case 'supportingDocuments':
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

  transliterateFamilyDetails(event) {
    const targetsArray = event.target.id.split('-');
    if (targetsArray[2] === 'relation') {
      this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`).patchValue(this.familyRelationOptionsMarathi[event.target.value]);
    } else if (targetsArray[2] === 'education') {
      this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`).patchValue(this.educationOptionsMarathi[event.target.value]);
    }

  }

  transliterateDTP(event) { // Ditrcit taluka post-office
    const targetsArray = event.target.id.split('-');
    let target: any;
    let DTPObject: any;
    // choose if it is district/taluka/postoffice
    if (targetsArray[2] === 'district' || targetsArray[1] === 'districtEmp')
      DTPObject = this.districts;
    else if (targetsArray[2] === 'taluka')
      DTPObject = this.talukasRes;
    else if (targetsArray[2] === 'state') DTPObject = this.states;
    else if (targetsArray[1] === 'talukaEmp') DTPObject = this.talukasEmp;
    else DTPObject = this.postOfficeArrayRes;


    // set formControl
    if (targetsArray.length === 2) {
      target = this.registrationFormGroup.get(targetsArray[0]).get(`${targetsArray[1]}_mr`);
    } else target = this.registrationFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`);

    // get the string for id
    const DTPValue = typeof event.target.value === 'string' ? event.target.value : Object.keys(DTPObject).find(key => DTPObject[key] === event.target.value);

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
        const result = response.split(';').map((item) => {
          return item.split('^')[0];
        });
        switch (event.target.id) {
          case 'personalDetails-firstNamePersonal':
            this.firstNameFamily.patchValue(event.target.value, { emitEvent: false });
            this.firstNameFamily.disable();
            this.firstNameFamily_mr.patchValue(result.join(' '));
            this.firstNameFamily_mr.disable();
            break;
          case 'personalDetails-middleNamePersonal':
            this.fatherOrHusbandName.patchValue(event.target.value, { emitEvent: false });
            this.fatherOrHusbandName_mr.patchValue(result.join(' '));
            break;
          case 'personalDetails-lastNamePersonal':
            this.surname.patchValue(event.target.value, { emitEvent: false });
            this.surname.disable();
            this.surname_mr.patchValue(result.join(' '));
            this.surname_mr.disable();
            break;
        }

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
    const value = Number(event.target.value);
    if (idArray.length === 2) {
      this.registrationFormGroup.get(idArray[0]).get(`${idArray[1]}_mr`).patchValue(value, { emitEvent: false });
    } else if (idArray.length === 3) {
      this.registrationFormGroup.get(idArray[0]).get(idArray[1]).get(`${idArray[2]}_mr`).patchValue(value, { emitEvent: false });
    }
  }

  calculateAge() {
    if (this.registrationFormGroup.get('personalDetails').get('dobPersonal').value) {
      const dob = moment(this.registrationFormGroup.get('personalDetails').get('dobPersonal').value).format('YYYY-MM-DD');
      if (dob) {
        this.registrationFormGroup.get('personalDetails').get('dobPersonal').patchValue(dob, { emitEvent: false });
        const age = moment().diff(dob, 'years');
        if (dob) {
          if (age > 17 && age < 61) {
            this.dobFamily.patchValue(this.registrationFormGroup.get('personalDetails').get('dobPersonal').value, { emitEvent: false });
            this.dobFamily.disable();
            this.ageFamily.patchValue(age);
            this.registrationFormGroup.get('personalDetails').get('agePersonal').setValue(age);
          } else {
            this.dialogs.alert('Applicant age should be greater than 18 and less than 60 ');
            alert('Applicant age should be greater than 18 and less than 60 ')
            this.registrationFormGroup.get('personalDetails').get('agePersonal').setValue('');
            this.registrationFormGroup.get('personalDetails').get('dobPersonal').setValue('');
          }
        }
      }
    } else {
      // alert('select date');
    }
    this.minAppointmentDate = this.changeToIonDateTime(Number(this.agePersonal.value) - 18, 'years');
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
    this.pincodeArrayPer = this.pincodeArrayRes;
    this.migrant.patchValue(false);
    this.migrant_mr.patchValue(false);

    const resAddress: any = this.registrationFormGroup.get('personalDetails').get(
      'residentialAddress'
    );
    const permAddress = this.registrationFormGroup.get('personalDetails').get(
      'permanentAddress'
    );
    if (event.target.checked) {
      permAddress.patchValue(resAddress.getRawValue());
      permAddress.disable();
    } else {
      permAddress.reset();
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

  isBocwRegistered(index: number) {
    if (this.registrationFormGroup.get('familyDetails')['controls'][index].get('isRegisteredInBOCW').value) {
      this.registrationFormGroup.get('familyDetails')['controls'][index].get('bocwRegistrationNo').enable()
    } else {
      this.registrationFormGroup.get('familyDetails')['controls'][index].get('isRegisteredInBOCW').value = false
      this.registrationFormGroup.get('familyDetails')['controls'][index].get('bocwRegistrationNo').disable();
    }

  }

  calculateAgeForFamilyDetails(i: string) {
    const val = moment(this.registrationFormGroup.get('familyDetails').get(i.toString()).get('dobFamily').value).format('YYYY-MM-DD');
    if (val) {
      const age = moment().diff(val, 'years');
      this.registrationFormGroup.get('familyDetails').get(i.toString()).get('ageFamily').setValue(age);
    }
  }

  async showFamilyModal(index: number, mode: string, familyForm?: any) {

    const familyDetail: familyModalData = {
      index,
      mode,
      familyDetail: familyForm
    };
    const familyModal = await this.mdlController.create({
      component: FamilyModalPage,
      componentProps: {
        modalData: familyDetail
      }
    });
    const familyDetailsArray = this.registrationFormGroup.get('familyDetails') as FormArray;
    await familyModal.present();
    familyModal.onDidDismiss()
      .then(res => {
        if (res.data.formState === 'add') {
          familyDetailsArray.push(this.familyDetailsFormGroup());
          this.registrationFormGroup.get('familyDetails').get(`${index}`).patchValue(res.data.formData.value);
          if (this.registrationFormGroup.get('familyDetails').get(`${index}`).get('nominee').value === 'yes') {
            this.applyNominee(index)
          }
        } else if (res.data.formState === 'delete') this.deleteFamilyDetail(index);
        else {
          this.registrationFormGroup.get('familyDetails').get(`${index}`).patchValue(res.data.formData.value);
          if (this.registrationFormGroup.get('familyDetails').get(`${index}`).get('nominee').value === 'yes') {
            this.applyNominee(index)
          }
        }
      }
      );
  }

  addMoreFamilyDetails() {
    const familyDetailsArray = this.registrationFormGroup.get('familyDetails') as FormArray;
    this.showFamilyModal(familyDetailsArray.length, 'add');
  }

  editFamilyDetail(i: number) {
    this.showFamilyModal(i, 'update', this.registrationFormGroup.get('familyDetails').get(`${i}`));
  }

  deleteFamilyDetail(i: number) {
    if (i === 0) {
      return;
    } else {
      const familyDetailsArray = this.registrationFormGroup.get('familyDetails') as FormArray;
      familyDetailsArray.removeAt(i);
      if (familyDetailsArray.length === 0) {
        familyDetailsArray.push(this.familyDetailsFormGroup());
      }
    }
  }

  changeToIonDateTime(diff: any, timeUnit: string) {
    const date = moment(
      new Date(this.todaysDate.year, this.todaysDate.month - 1, this.todaysDate.day))
      .subtract(diff, timeUnit).format('DD/MM/YYYY').split('/');

    if (Number(date[1]) < 10 && Number(date[0]) < 10) return `${Number(date[2])}-0${Number(date[1])}-0${Number(date[0])}`;
    else if (Number(date[1]) < 10 && Number(date[0]) >= 10) return `${Number(date[2])}-0${Number(date[1])}-${Number(date[0])}`;
    else if (Number(date[1]) >= 10 && Number(date[0]) < 10) return `${Number(date[2])}-${Number(date[1])}-0${Number(date[0])}`;
    else return `${Number(date[2])}-${Number(date[1])}-${Number(date[0])}`;
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
        this.dialogs.alert('IFSC Code Not Found.Please fill bank details manually');
        alert('IFSC Code Not Found.Please fill bank details manually');
        this.bankDetails = {
          BANK: '',
          BRANCH: '',
          Address: ''
        };
        this.isIfscCodeFound = false;
      });
  }

  async showEmployerModal(index: number, mode: string, employerForm?: any) {
    const employerData: EmployerModalData = {
      index,
      mode,
      employerDetail: employerForm,
      appointmentDate: this.minFromDate,
      dispatchDate: this.maxToDate,
      fromDate: index > 0 ? this.registrationFormGroup.get('employerWorkDetails').get(`${index - 1}`).get('fromDateEmp').value : this.minFromDate,
      toDate: index > 0 ? this.registrationFormGroup.get('employerWorkDetails').get(`${index - 1}`).get('toDateEmp').value : this.maxToDate,
    };

    const employerModal = await this.mdlController.create({
      component: EmployerModalPage,
      componentProps: {
        modalData: employerData
      }
    });
    const workerDetailsArray = this.registrationFormGroup.get('employerWorkDetails') as FormArray;
    await employerModal.present();
    employerModal.onDidDismiss()
      .then(res => {
        if (res.data.formState === 'add') {
          workerDetailsArray.push(this.employerWorkDetailsFormFroup());
          this.registrationFormGroup.get('employerWorkDetails').get(`${index}`).setValue(res.data.formData.value);
          this.calculateDayForWorkDetails(`${index}`);
        } else if (res.data.formState === 'delete') this.deleteWorkerDetail(index);
        else {
          this.registrationFormGroup.get('employerWorkDetails').get(`${index}`).setValue(res.data.formData.value);
        }
      });
  }

  addMoreWorkerDetails() {
    const workerDetailsArray = this.registrationFormGroup.get('employerWorkDetails') as FormArray;
    this.showEmployerModal(workerDetailsArray.length, 'add');
  }

  editWorkerDetail(i: number) {
    if (this.appointmentDateEmp.value && this.dispatchDateEmp.value) {
      this.showEmployerModal(i, 'update', this.registrationFormGroup.get('employerWorkDetails').get(`${i}`));
    } else if (this.appointmentDateEmp.value) {
      alert('Please choose the dispatch date');
    } else {
      alert('Please choose the appointment date');
    }
  }

  deleteWorkerDetail(i: number) {
    const workerDetailsArray = this.registrationFormGroup.get('employerWorkDetails') as FormArray;
    workerDetailsArray.removeAt(i);
    let totalWorkingDays = 0;
    const employerWorkDetailsArr = this.registrationFormGroup.get('employerWorkDetails').value;
    for (const each in employerWorkDetailsArr) {
      totalWorkingDays += Number(employerWorkDetailsArr[each].workingDays);
    }
    this.workingDay = totalWorkingDays;
    if (workerDetailsArray.length === 0) {
      workerDetailsArray.push(this.employerWorkDetailsFormFroup());
    }
  }

  minFDate(i: number) {
    return i === 0 ? this.minFromDate : this.registrationFormGroup.get('employerWorkDetails').get((i - 1).toString()).get('toDateEmp').value;
  }

  maxFDate(i: number) {
    // if (i == 0)
    return this.maxToDate;
    // else return this.registrationFormGroup.get('employerWorkDetails').get((i - 1).toString()).get('toDateEmp').value
  }

  minTDate(i: number) {
    // if (i === 0)
    return this.registrationFormGroup.get('employerWorkDetails').get((i).toString()).get('fromDateEmp').value;
  }

  maxTDate(i: number) {
    // if (i == 0)
    return this.maxToDate;
  }

  calculateDayForWorkDetails(i: string) {
    // tslint:disable-next-line: max-line-length
    const fromDate = moment(this.registrationFormGroup.get('employerWorkDetails').get(i.toString()).get('fromDateEmp').value).format('YYYY-MM-DD');
    // tslint:disable-next-line: max-line-length
    const toDate = this.registrationFormGroup.get('employerWorkDetails').get(i.toString()).get('toDateEmp').value ? moment(this.registrationFormGroup.get('employerWorkDetails').get(i.toString()).get('toDateEmp').value).format('YYYY-MM-DD') : null;
    if (fromDate && toDate) {
      this.registrationFormGroup.get('employerWorkDetails').get(i.toString()).get('fromDateEmp').patchValue(fromDate, { emitEvent: false });
      this.registrationFormGroup.get('employerWorkDetails').get(i.toString()).get('toDateEmp').patchValue(toDate, { emitEvent: false });
      const difference = moment(toDate).diff(fromDate, 'days') + 1;
      this.registrationFormGroup.get('employerWorkDetails').get(i.toString()).get('workingDays').patchValue(difference);
      let totalWorkingDays = 0;
      const employerWorkDetailsArr = this.registrationFormGroup.get('employerWorkDetails').value;
      for (const each in employerWorkDetailsArr) {
        totalWorkingDays += Number(employerWorkDetailsArr[each].workingDays);
      }
      this.workingDay = totalWorkingDays;
      if (this.workingDay < 90) {
        // alert('Working days is less than 90');
        this.workingDayFlag = true;
      } else {
        this.workingDayFlag = false;
      }
    }
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 800,
      targetWidth: 600
    };
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpg;base64,' + imageData;
      const fileImage = this.b64toFile(imageData);
      this.files.applicantPhoto = fileImage;
      this.fileOptions.applicantPhoto = `${uuidv4()}.${fileImage.name.split('.')[length]}.png`;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }

  b64toFile = (b64Data, contentType = 'image/jpg', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const file = this.blobToFile(blob, `${Date.now()}-img.jpg`);
    return file;
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    // Cast to a File() type
    return theBlob as File;
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
    this.toast.show('File uploaded successfully', '1000', 'bottom').subscribe((toast) => {
    });
    this.files[event.target.id] = file;
    this.fileOptions[event.target.id] = `${uuidv4()}.${file.name.split('.')[length]}.pdf`;
    // if (event.target.files[0].size > 0 && event.target.files[0].size < 2097152 && (file.type === 'application/pdf' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === "image/png")) {
    //   this.toast.show('File uploaded successfully', '1000', 'bottom').subscribe((toast) => {
    //   });
    //   this.files[event.target.id] = file;
    //   this.fileOptions[event.target.id] = `${uuidv4()}.${file.name.split('.')[length]}.pdf`;
    // } else if (file.type !== 'application/pdf' && file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== "image/png") {
    //   this.registrationFormGroup.get(event.target.id).patchValue(null);
    //   this.toast.show('File Should Be PDF or JPG or PNG', '2000', 'bottom').subscribe((toast) => {
    //   });

    // } else {
    //   this.registrationFormGroup.get('supportingDocuments').get(event.target.id).patchValue(null);
    //   this.toast.show('File Should Be Less Than 2MB', '2000', 'bottom').subscribe((toast) => {
    //   });

    // }
  }

  public joinWfcNames(wfcs) {
    const wfcNames = wfcs.map((wf) => {
      return wf.office_name;
    });
    return wfcNames.join(' or ');
  }

  save() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
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
          formData.append('modeOfApplication', 'By Field Agent');
        }
        this.httpService.saveData(formData, this.JWTToken).subscribe(
          (res: any) => {
            this.dialogs.alert(`Data Captured 👍🙂. Your Acknowledgement Number is ${res[1][0].acknowledgement_no}. Please visit below WFC with original documents for verification : ${this.joinWfcNames(res[0])}`);
            alert(`Data Captured 👍🙂. Your Acknowledgement Number is ${res[1][0].acknowledgement_no}. Please visit below WFC with original documents for verification : ${this.joinWfcNames(res[0])}`)
            // this.router.navigate(['/dashboard']);
          },
          (err: any) => console.error(err)
        );
      } else {
        this.registrationFormGroup.markAllAsTouched();

        if (this.workingDay < 90){
          alert('Working Days are less than ')
        }else{
          alert('The form is invalid. Please fill all the * mark fields with appropriate details')
        }
      }
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
      aadharNoFamily: new FormControl('', [Validators.maxLength(12), Validators.pattern('^[0-9]{12}$')]),
      isRegisteredInBOCW: new FormControl(''),
      bocwRegistrationNo: new FormControl('', [Validators.maxLength(12), Validators.minLength(12)])
    });
  }

  addressFormGroup(): FormGroup {
    return new FormGroup({
      houseNo: new FormControl('', this.validationService.createValidatorsArray('houseNo')),
      road: new FormControl('', this.validationService.createValidatorsArray('road')),
      area: new FormControl('', this.validationService.createValidatorsArray('area')),
      city: new FormControl('', this.validationService.createValidatorsArray('city')),
      importantPlace: new FormControl('', this.validationService.createValidatorsArray('importantPlace')),
      state: new FormControl('', this.validationService.createValidatorsArray('state')),
      district: new FormControl('', this.validationService.createValidatorsArray('district')),
      taluka: new FormControl('', this.validationService.createValidatorsArray('taluka')),
      postOffice: new FormControl('', this.validationService.createValidatorsArray('postOffice')),
      pincode: new FormControl('', this.validationService.createValidatorsArray('pincode')),
      stdcode: new FormControl('', this.validationService.createValidatorsArray('stdcode')),
      phone: new FormControl('', this.validationService.createValidatorsArray('phone')),
      typeOfResidence: new FormControl('', [Validators.required]),
      typeOfHouse: new FormControl('', [Validators.required]),
      typeOfResidence_mr: new FormControl(''),
      typeOfHouse_mr: new FormControl(''),
      houseNo_mr: new FormControl(''),
      road_mr: new FormControl(''),
      area_mr: new FormControl(''),
      city_mr: new FormControl(''),
      importantPlace_mr: new FormControl(''),
      postOffice_mr: new FormControl(''),
      taluka_mr: new FormControl(''),
      district_mr: new FormControl(''),
      state_mr: new FormControl(''),
    });
  }

  employerDetailsFormFroup(): FormGroup {
    return new FormGroup({
      contractorNameEmp: new FormControl('', this.validationService.createValidatorsArray('contractorNameEmp')),
      contractorCompanyNameEmp: new FormControl('', this.validationService.createValidatorsArray('contractorCompanyNameEmp')),
      contractorPhoneEmp: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      workPlaceEmp: new FormControl('', [Validators.maxLength(50)]),
      townEmp: new FormControl('', [Validators.required]),
      talukaEmp: new FormControl('', [Validators.required]),
      districtEmp: new FormControl('', [Validators.required]),
      pinCodeEmp: new FormControl('', [Validators.required, Validators.pattern('^\\d{6}$')]),
      appointmentDateEmp: new FormControl(null, [Validators.required]),
      dispatchDateEmp: new FormControl(null),
      remunerationPerDayEmp: new FormControl('', [Validators.required,Validators.maxLength(8)]),
      natureOfWorkEmp: new FormControl('', [Validators.required]),
      migrant: new FormControl(''),
      migrant_mr: new FormControl(''),
      MNREGACardNumberEmp: new FormControl(''),
      contractorNameEmp_mr: new FormControl(''),
      contractorCompanyNameEmp_mr: new FormControl(''),
      workPlaceEmp_mr: new FormControl(''),
      typeOfWorkEmp: new FormControl('', [Validators.required]),
      typeOfWorkEmp_mr: new FormControl(''),
      townEmp_mr: new FormControl(''),
      talukaEmp_mr: new FormControl(''),
      districtEmp_mr: new FormControl(''),
      natureOfWorkEmp_mr: new FormControl(''),
      typeOfIssuer: new FormControl('', [Validators.required]),
      typeOfIssuer_mr: new FormControl(''),
      registeredWith: new FormControl(''),
      registrationNoOfIssuer: new FormControl(''),
      dispatchNo: new FormControl(''),
      dispatchDate: new FormControl(''),
      nameOfEmployer: new FormControl(''),
      nameOfEmployer_mr: new FormControl(''),
      districtOfEmployer: new FormControl(''),
      districtOfEmployer_mr: new FormControl(''),
      talukaOfEmployer: new FormControl(''),
      talukaOfEmployer_mr: new FormControl(''),
      nameOfGramPanchayat: new FormControl(''),
      nameOfGramPanchayat_mr: new FormControl(''),
      districtOfGramPanchayat: new FormControl(''),
      districtOfGramPanchayat_mr: new FormControl(''),
      talukaOfGramPanchayat: new FormControl(''),
      talukaOfGramPanchayat_mr: new FormControl(''),
    });
  }

  employerWorkDetailsFormFroup(): FormGroup {
    return new FormGroup({
      typeOfEmployerEmp: new FormControl('', [Validators.required]),
      fullNameOfIssuerEmp: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z\\s]{8,50}')]),
      mobileNumberOfIssuerEmp: new FormControl('', [Validators.required, Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$')]),
      fromDateEmp: new FormControl(null, [Validators.required]),
      toDateEmp: new FormControl(null, [Validators.required]),
      typeOfEmployerEmp_mr: new FormControl(''),
      fullNameOfIssuerEmp_mr: new FormControl(''),
      workingDays: new FormControl('')
    });
  }

  attachmentListFormGroup(): FormGroup {
    return new FormGroup({
      attachment_id: new FormControl(''),
      attachmentType: new FormControl(''),
      attached: new FormControl(''),
      serial_no: new FormControl()
    });
  }

  supportingDocumentsFormFroup(): FormGroup {
    return new FormGroup({
      attachmentList: new FormArray([]),
      supportingDocuments: new FormControl(''),
      applicantPhoto: new FormControl(''),
      registrationReceipt: new FormControl(''),
      bankPassbook: new FormControl(''),
      workCertificate: new FormControl('')
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
  get typeOfResidence() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('typeOfResidence'); }
  get typeOfHouse() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('typeOfHouse'); }
  get typeOfResidence_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('typeOfResidence_mr'); }
  get typeOfHouse_mr() { return this.registrationFormGroup.get('personalDetails').get('residentialAddress').get('typeOfHouse_mr'); }
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
  get typeOfResidencePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('typeOfResidence'); }
  get typeOfResidencePer_mr() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('typeOfResidence_mr'); }
  get typeOfHousePer() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('typeOfHouse'); }
  get typeOfHousePer_mr() { return this.registrationFormGroup.get('personalDetails').get('permanentAddress').get('typeOfHouse_mr'); }
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
  get typeOfWorkEmp() { return this.registrationFormGroup.get('employerDetails').get('typeOfWorkEmp'); }
  get typeOfWorkEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('typeOfWorkEmp_mr'); }
  get appointmentDateEmp() { return this.registrationFormGroup.get('employerDetails').get('appointmentDateEmp'); }
  get dispatchDateEmp() { return this.registrationFormGroup.get('employerDetails').get('dispatchDateEmp'); }
  get remunerationPerDayEmp() { return this.registrationFormGroup.get('employerDetails').get('remunerationPerDayEmp'); }
  get natureOfWorkEmp() { return this.registrationFormGroup.get('employerDetails').get('natureOfWorkEmp'); }
  get typeOfIssuer() { return this.registrationFormGroup.get('employerDetails').get('typeOfIssuer'); }
  get typeOfIssuer_mr() { return this.registrationFormGroup.get('employerDetails').get('typeOfIssuer_mr'); }

  get registeredWith() {
    return this.registrationFormGroup.get('employerDetails').get('registeredWith');
  }

  get registrationNoOfIssuer() {
    return this.registrationFormGroup.get('employerDetails').get('registrationNoOfIssuer');
  }

  get dispatchNo() {
    return this.registrationFormGroup.get('employerDetails').get('dispatchNo');
  }

  get dispatchDate() {
    return this.registrationFormGroup.get('employerDetails').get('dispatchDate');
  }

  get nameOfEmployer() {
    return this.registrationFormGroup.get('employerDetails').get('nameOfEmployer');
  }

  get nameOfEmployer_mr() {
    return this.registrationFormGroup.get('employerDetails').get('nameOfEmployer_mr');
  }

  get districtOfEmployer() {
    return this.registrationFormGroup.get('employerDetails').get('districtOfEmployer');
  }

  get districtOfEmployer_mr() {
    return this.registrationFormGroup.get('employerDetails').get('districtOfEmployer_mr');
  }

  get talukaOfEmployer() {
    return this.registrationFormGroup.get('employerDetails').get('talukaOfEmployer');
  }

  get talukaOfEmployer_mr() {
    return this.registrationFormGroup.get('employerDetails').get('talukaOfEmployer_mr');
  }

  get nameOfGramPanchayat() {
    return this.registrationFormGroup.get('employerDetails').get('nameOfGramPanchayat');
  }

  get nameOfGramPanchayat_mr() {
    return this.registrationFormGroup.get('employerDetails').get('nameOfGramPanchayat_mr');
  }

  get districtOfGramPanchayat() {
    return this.registrationFormGroup.get('employerDetails').get('districtOfGramPanchayat');
  }

  get districtOfGramPanchayat_mr() {
    return this.registrationFormGroup.get('employerDetails').get('districtOfGramPanchayat_mr');
  }

  get talukaOfGramPanchayat() {
    return this.registrationFormGroup.get('employerDetails').get('talukaOfGramPanchayat');
  }

  get talukaOfGramPanchayat_mr() {
    return this.registrationFormGroup.get('employerDetails').get('talukaOfGramPanchayat_mr');
  }

  get typeOfEmployerEmp() {
    return this.registrationFormGroup.get('employerWorkDetails')['controls'][0].get('typeOfEmployerEmp');
  }

  get typeOfEmployerEmp_mr() { 
    return this.registrationFormGroup.get('employerWorkDetails')['controls'][0].get('typeOfEmployerEmp_mr'); 
  }

  get fullNameOfIssuerEmp() {
    return this.registrationFormGroup.get('employerWorkDetails')['controls'][0].get('fullNameOfIssuerEmp');
  }

  get fullNameOfIssuerEmp_mr() { 
    return this.registrationFormGroup.get('employerWorkDetails')['controls'][0].get('fullNameOfIssuerEmp_mr'); 
  }

  get mobileNumberOfIssuerEmp() {
    return this.registrationFormGroup.get('employerWorkDetails')['controls'][0].get('mobileNumberOfIssuerEmp');
  }

  get fromDateEmp() {
    return this.registrationFormGroup.get('employerWorkDetails')['controls'][0].get('fromDateEmp');
  }

  get toDateEmp() {
    return this.registrationFormGroup.get('employerWorkDetails')['controls'][0].get('toDateEmp');
  }


  get migrant() { return this.registrationFormGroup.get('employerDetails').get('migrant'); }
  get MNREGACardNumberEmp() { return this.registrationFormGroup.get('employerDetails').get('MNREGACardNumberEmp'); }
  get contractorNameEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('contractorNameEmp_mr'); }
  get contractorCompanyNameEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('contractorCompanyNameEmp_mr'); }
  get workPlaceEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('workPlaceEmp_mr'); }
  get townEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('townEmp_mr'); }
  get talukaEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('talukaEmp_mr'); }
  get districtEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('districtEmp_mr'); }
  get natureOfWorkEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('natureOfWorkEmp_mr'); }
  get registrationTypeEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('registrationTypeEmp_mr'); }
  get migrant_mr() { return this.registrationFormGroup.get('employerDetails').get('migrant_mr'); }

  // FamilyDetails Getter
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
  get aadharNoFamily() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('aadharNoFamily'); }
  get education() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('education'); }
  get education_mr() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('education_mr'); }
  get profession() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('profession'); }
  get profession_mr() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('profession_mr'); }
  get nominee() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('nominee'); }
  get isRegisteredInBOCW() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('isRegisteredInBOCW'); }
  get bocwRegistrationNo() { return this.registrationFormGroup.get('familyDetails')['controls'][0].get('bocwRegistrationNo'); }

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

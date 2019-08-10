import { Component, OnInit, ViewChild, QueryList, ViewChildren, AfterViewInit, ViewContainerRef } from '@angular/core';
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
  public attachmentDetails: any[];
  bankDetails: any = {
    BANK: '',
    BRANCH: '',
    Address: ''
  };
  public registrationObj: any;
  public mandatoryFieldsFlag: boolean;
  public isIfscCodeFound: boolean;
  public statewiseListArray = states;
  public states: string[];
  public districts: string[];
  public talukasRes: string[];
  public postOfficeArrayRes: string[];
  public talukasPer: string[];
  public postOfficeArrayPer: string[];
  public talukasEmp: string[];
  public genderOptions: string[] =[];
  public genderOptionsMarathi: string[]=[];
  public maritalStatusOptions: string[];
  public maritalStatusOptionsMarathi: string[];
  public rationCardTypeOptions: string[];
  public rationCardTypeOptionsMarathi: string[];
  public categoryOptions: string[];
  public categoryOptionsMarathi: string[];
  public familyHeaderOptions: string[];
  public natureOfWorkOptions: string[];
  public natureOfWorkOptionsMarathi: string[];
  public typeOfIssuerOptions: string[];
  public typeOfIssuerOptionsMarathi: string[];
  public registrationTypeOptions: string[];
  public registrationTypeOptionsMarathi: string[];
  public workerTypeOptions: string[];
  public workerTypeOptionsMarathi: string[];
  public currentImage: any;
  public specialOptions = {
    // tslint:disable-next-line: max-line-length
    english: ['Male', 'Female', 'Other', 'Single', 'Married', 'Divorced', 'Widow', 'Widower', 'SC', 'ST', 'NT', 'OBC', 'Open', 'Contractor/Developer', 'Gramsevak', 'Person with authorization by municipality or municipal corporation', 'others', 'BOCW Act', 'Contract Act', 'Migrant', 'Local Resident', 'Buildings',
      'Streets',
      'Roads',
      'Railways',
      'Tramways',
      'Airfields',
      'Irrigation',
      'Drainage',
      'Embankment And Navigation Works',
      'Flood Control Works (Including Storm Water Drainage Works)',
      'Generation',
      'Transmission And Distribution Of Power',
      'Water Works (Including Channels For Distribution Of Water)',
      'Oil And Gas Installations',
      'Electric Lines',
      'Wireless',
      'Radio',
      'Television',
      'Telephone',
      'Telegraph and Overseas Communications',
      'Dams',
      'Canals',
      'Reservoirs',
      'Watercourses',
      'Tunnels',
      'Bridges',
      'Viaducts',
      'Aquaducts',
      'Pipelines',
      'Towers',
      'Cooling Towers',
      'Transmission Towers and Such Other Work',
      'Cutting the stone, breaking it and crushing the stone finely',
      'Cutting and polishing of tiles or tiles',
      'Carpentry with paint, varnish, etc',
      'Gutter and plumbing works',
      'Electrical works including wiring, distribution, tensioning, etc',
      'Installation and repair of fire extinguishers',
      'Installation and repair of air conditioning equipment',
      'Installation of automatic lifts, etc',
      'Installation of security doors and equipment',
      'Preparation and installation of iron or metal grills, windows, doors',
      'Construction of irrigation infrastructure',
      'Interior work (including decorative) including carpentry, virtual ceilings, lighting, plaster of Paris',
      'Cutting glass, plastering glass and installing glass panels',
      'Preparation of bricks, roofs, etc., not covered under the Factories Act, 1948',
      'Installation of energy efficient equipment like solar panels etc',
      'Installation of modular units for use in places like cooking',
      'Preparation and installation of cement concrete material etc',
      'Construction of sports or recreational facilities including swimming pool, golf course etc',
      'Construction or erection of information panels, road furniture, passenger shelters or bus stations, signal systems',
      'Construction of Rotaries, Installation of Fountains etc',
      'Construction of public parks, sidewalks, picturesque terrain etc',
      'Yellow Card (below the poverty line)',
      'Antyodaya food scheme card',
      'Annapurna food scheme card',
      'Orange Ration Card',
      'None of these',
      'Self',
      'Father',
      'Mother',
      'Wife',
      'Husband',
      'Brother',
      'Sister',
      'Sister In Law(Brother Wife)',
      'Sister In Law(Husband Sister)',
      'Son',
      'Daughter',
      'Daughter In Law',
      'Brother In Law',
      'Grandson',
      'Granddaughter',
      'Mother in law',
      'Father in law',
      'Post Graduate',
      'Medical Graduate',
      'Engineering Graduate',
      'Phd',
      'Graduate',
      'Diploma',
      'ITI',
      'HSC',
      '11th',
      'SSC',
      '9th',
      '8th',
      '7th',
      '6th',
      '5th',
      '4th',
      '3rd',
      '2nd',
      '1st',
      'Not Educated'
    ],
    // tslint:disable-next-line: max-line-length
    marathi: ['पुरुष', 'स्त्री', 'इतर', 'अविवाहित', 'विवाहित', 'घटस्फोटित', 'विधवा', 'विधुर', 'अनुसूचित जाती', 'अनुसूचित जमाती', 'एनटी', 'इमाव', 'खुला', 'ठेकेदार/विकासक', 'ग्रामसेवक', 'नगरपालिका अथवा महानगरपालिकेद्वारे अधिकृतता असलेले व्यक्ती', 'इतर', 'बीओसीडब्ल्यू कायदा', 'कॉन्ट्रॅक्ट कायदा', 'स्थलांतरीत', 'स्थानिक निवासी', 'इमारती',
      'रस्त्यावर',
      'रस्ते',
      'रेल्वे',
      'ट्रामवे',
      'एअरफील्ड',
      'सिंचन',
      'ड्रेनेज',
      'तटबंध आणि नेव्हिगेशन वर्क्स',
      'स्टॉर्म वॉटर ड्रेनेज वर्क्ससह',
      'निर्मिती',
      'पारेषण आणि पॉवर वितरण',
      'पाणी वितरणासाठी चॅनल समाविष्ट करण',
      'तेल आणि गॅसची स्थापना',
      'इलेक्ट्रिक लाईन्स',
      'वायरलेस',
      'रेडिओ',
      'दूरदर्शन',
      'दूरध्वनी',
      'टेलीग्राफ आणि ओव्हरसीज कम्युनिकेशन्स',
      'डॅम',
      'नद्या',
      'रक्षक',
      'पाणीपुरवठा',
      'टनेल',
      'पुल',
      'पदवीधर',
      'जलविद्युत',
      'पाइपलाइन',
      'टावर्स',
      'कूलिंग टॉवर्स',
      'ट्रान्समिशन टावर्स आणि अशा इतर कार्य',
      'दगड कापणे, फोडणे व दगडाचा बारीक चुरा करणे',
      'लादी किंवा टाईल्स कापणे व पॉलिश करणे',
      'रंग, वॉर्निश लावणे, इत्यादीसह सुतारकाम',
      'गटार व नळजोडणीची कामे',
      'वायरिंग, वितरण, तावदान बसविणे इत्यादीसहित विद्युत कामे',
      'अग्निशमन यंत्रणा बसविणे व तिची दुरुस्ती करणे',
      'वातानुकूलित यंत्रणा बसविणे व तिची दुरुस्ती करणे',
      'उद्वाहने, स्वयंचलित जिने इत्यादी बसविणे',
      'सुरक्षा दरवाजे उपकरणे इत्यादी बसविणे',
      'लोखंडाच्या किंवा धातुच्या ग्रिल्स, खिडक्या, दरवाजे तयार करणे व बसविणे',
      'जलसंचयन संरचनेचे बांधकाम करणे',
      'सुतारकाम करणे, आभाशी छत, प्रकाश व्यवस्था, प्लास्टर ऑफ पेरीस यांसहित अंतर्गत (सजावटीचे) काम',
      'काच कापणे, काचरोगण लावणे व काचेची तावदाने बसविणे',
      'कारखाना अधिनियम, 1948 खाली समावेश नसलेल्या विटा, छप्परांवरील कौल इत्यादी तयार करणे',
      'सौर तावदाने इत्यादींसारखी ऊर्जाक्षम उपकरण बसविणे',
      'स्वयंपाकखोली सारख्या ठिकाणी वापरण्यासाठी मोडुलर (आधुनिक) युनिट बसविणे',
      'सिमेन्ट काँक्रिटच्या साचेबद्ध वस्तू इत्यादी तयार करणे व बसविणे',
      'जलतरण तलाव, गोल्फचे मैदान इत्यादीसह खेळ किंवा मनोरंजनाच्या सुविधांचे बांधकाम करणे',
      'माहिती फलक, रोड फर्निचर, प्रवाशी निवारे किंवा बसस्थानके, सिग्नल यंत्रणा इत्यादी बांधणे किंवा उभारणे',
      'रोटरीजचे बांधकाम करणे, कारंजे बसविणे इत्यादी',
      'सार्वजनिक उद्याने, पदपथ, रमणीय भू-प्रदेश इत्यादींचे बांधकाम',
      'दारिद्र रेषेखालील पिवळे',
      'अंत्योदय अन्न योजना',
      'अन्नपूर्णा शिधापत्रिका',
      'केशरी शिधापत्रिका (रु. १ लाखापर्यंत वार्षिक उत्पन्न असलेली)',
      'यापैकी एकही नाही',
      'स्वतः',
      'वडील',
      'आई',
      'पत्नी',
      'पती',
      'भाऊ',
      'बहीण',
      'वहिनी',
      'ननंद',
      'मुलगा',
      'मुलगी',
      'सून',
      'देवर',
      'नातु',
      'नात',
      'सासू',
      'सासरा',
      'पदव्युत्तर पदवी',
      'वैद्यकीय पदवीधर',
      'अभियांत्रिकी पदवी',
      'पीएचडी',
      'पदवीधर',
      'डिप्लोमा',
      'आय.टी.आय',
      'एचएससी',
      '११ वी',
      'एसएससी',
      '९ वी',
      '८ वी',
      '७ वी',
      '६ वी',
      '५ वी',
      '४ थी',
      '३ री',
      '२ री',
      '१ ली',
      'अशिक्षित'
    ]
  };
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
  getterObj = {};

  public userType;
  public userTypeId;
  public modes: Modes;
  public rejectNoteFlag = false;
  public editFormFlag;
  public genderList:any[]=[];

  constructor(private validationService: ValidationService,
              private transliterate: TransliterationService,
              private router: Router,
              private registration: RegistrationService,
              private userMgmntService: UserManagementService,
              private httpService: HttpService,
              private camera: Camera) {

   
    this.genderOptions = ['Female', 'Male', 'Other'];
    this.genderOptionsMarathi = ['पुरुष', 'स्त्री', 'इतर'];
    this.maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widow', 'Widower'];
    this.maritalStatusOptionsMarathi = ['अविवाहित', 'विवाहित', 'घटस्फोटित', 'विधवा', 'विधुर'];
    // tslint:disable-next-line: max-line-length
    this.rationCardTypeOptions = ['Yellow Card (below the poverty line)', 'Antyodaya food scheme card', 'Annapurna food scheme card', 'Orange Ration Card', 'None of these'];
  // tslint:disable-next-line: max-line-length
    this.rationCardTypeOptionsMarathi = ['दारिद्र रेषेखालील पिवळे', 'अंत्योदय अन्न योजना', 'अन्नपूर्णा शिधापत्रिका', 'केशरी शिधापत्रिका (रु. १ लाखापर्यंत वार्षिक उत्पन्न असलेली)', 'यापैकी एकही नाही'];
    this.categoryOptions = ['SC', 'ST', 'NT', 'OBC', 'Open'];
    this.categoryOptionsMarathi = ['अनुसूचित जाती', 'अनुसूचित जमाती', 'एनटी', 'इमाव', 'खुला'];
    // tslint:disable-next-line: max-line-length
    this.familyHeaderOptions = ['SNo.', 'First Name', 'First Name Marathi', 'Surname', 'Surname Marathi', 'Father/ Husband Name', 'Father/ Husband Name Marathi', 'DOB', 'Age (year)', 'Relation', 'Profession', 'Education', 'Nominee', 'Delete'];
      // tslint:disable-next-line: max-line-length
    this.natureOfWorkOptions = ['Buildings', 'Streets', 'Roads', 'Railways', 'Tramways', 'Airfields', 'Irrigation', 'Drainage', 'Embankment And Navigation Works', 'Flood Control Works (Including Storm Water Drainage Works)', 'Transmission And Distribution Of Power', 'Water Works (Including Channels For Distribution Of Water)', 'Oil And Gas Installations', 'Electric Lines', 'Wireless', 'Radio', 'Television', 'Telephone', 'Telegraph and Overseas Communications', 'Dams', 'Canals', 'Reservoirs', 'Watercourses', 'Tunnels', 'Bridges', 'Viaducts', 'Aquaducts', 'Pipelines', 'Towers', 'Cooling Towers', 'Transmission Towers and Such Other Work', 'Cutting the stone, breaking it and crushing the stone finely.', 'Cutting and polishing of tiles or tiles.', 'Carpentry with paint, varnish, etc.', 'Gutter and plumbing works.', 'Electrical works including wiring, distribution, tensioning, etc.', 'Installation and repair of fire extinguishers.', 'Installation and repair of air conditioning equipment.', 'Installation of automatic lifts, etc.', 'Installation of security doors and equipment.', 'Preparation and installation of iron or metal grills, windows,doors.', 'Construction of irrigation infrastructure.', 'Interior work (including decorative) including carpentry, virtual ceilings, lighting, plaster of Paris.', 'Cutting glass, plastering glass and installing glass panels.', 'Preparation of bricks, roofs, etc., not covered under the Factories Act, 1948.', 'Installation of energy efficient equipment like solar panels etc.', 'Installation of modular units for use in places like cooking.', 'Preparation and installation of cement concrete material etc.', 'Construction of sports or recreational facilities including swimming pool, golf course etc.', 'Construction or erection of information panels, road furniture, passenger shelters or bus stations, signal systems.', 'Construction of Rotaries, Installation of Fountains etc.', 'Construction of public parks, sidewalks, picturesque terrain etc'];
      // tslint:disable-next-line: max-line-length
    this.natureOfWorkOptionsMarathi = ['इमारती', 'रस्त्यावर', 'रस्ते', 'रेल्वे', 'ट्रामवे', 'एअरफील्ड', 'सिंचन', 'ड्रेनेज', 'तटबंध आणि नेव्हिगेशन वर्क्स', 'स्टॉर्म वॉटर ड्रेनेज वर्क्ससह', 'निर्मिती', 'पारेषण आणि पॉवर वितरण', 'पाणी वितरणासाठी चॅनल समाविष्ट करण', 'तेल आणि गॅसची स्थापना', 'इलेक्ट्रिक लाईन्स', 'वायरलेस', 'रेडिओ', 'दूरदर्शन', 'टेलीग्राफ आणि ओव्हरसीज कम्युनिकेशन्स', 'डॅम', 'नद्या', 'रक्षक', 'पाणीपुरवठा', 'टनेल', 'पुल', 'पदवीधर', 'जलविद्युत', 'पाइपलाइन', 'टावर्स', 'कूलिंग टॉवर्स', 'ट्रान्समिशन टावर्स आणि अशा इतर कार्य', 'दगड कापणे, फोडणे व दगडाचा बारीक चुरा करणे.', 'लादी किंवा टाईल्स कापणे व पॉलिश करणे.', 'रंग, वॉर्निश लावणे, इत्यादीसह सुतारकाम.', 'गटार व नळजोडणीची कामे.', 'वायरिंग, वितरण, तावदान बसविणे इत्यादीसहित विद्युत कामे.', 'अग्निशमन यंत्रणा बसविणे व तिची दुरुस्ती करणे.', 'वातानुकूलित यंत्रणा बसविणे व तिची दुरुस्ती करणे.', 'उद्वाहने, स्वयंचलित जिने इत्यादी बसविणे.', 'सुरक्षा दरवाजे उपकरणे इत्यादी बसविणे.', 'लोखंडाच्या किंवा धातुच्या ग्रिल्स, खिडक्या, दरवाजे तयार करणे व बसविणे.', 'जलसंचयन संरचनेचे बांधकाम करणे.', 'सुतारकाम करणे, आभाशी छत, प्रकाश व्यवस्था, प्लास्टर ऑफ पेरीस यांसहित अंतर्गत(सजावटीचे) काम.', 'काच कापणे, काचरोगण लावणे व काचेची तावदाने बसविणे.', 'कारखाना अधिनियम, 1948 खाली समावेश नसलेल्या विटा, छप्परांवरील कौल इत्यादी तयार करणे.', 'सौर तावदाने इत्यादींसारखी ऊर्जाक्षम उपकरण बसविणे.', 'स्वयंपाकखोली सारख्या ठिकाणी वापरण्यासाठी मोडुलर (आधुनिक) युनिट बसविणे.', 'सिमेन्ट काँक्रिटच्या साचेबद्ध वस्तू इत्यादी तयार करणे व बसविणे.', 'जलतरण तलाव, गोल्फचे मैदान इत्यादीसह खेळ किंवा मनोरंजनाच्या सुविधांचे बांधकाम करणे.', 'माहिती फलक, रोड फर्निचर, प्रवाशी निवारे किंवा बसस्थानके, सिग्नल यंत्रणा इत्यादी बांधणे किंवा उभारणे.', 'रोटरीजचे बांधकाम करणे, कारंजे बसविणे इत्यादी.', 'सार्वजनिक उद्याने, पदपथ, रमणीय भू-प्रदेश इत्यादींचे बांधकाम'];
     // tslint:disable-next-line: max-line-length
    this.typeOfIssuerOptions = ['Contractor/Developer', 'Gramsevak', 'Person with authorization by municipality or municipal corporation', 'Others'];
    this.typeOfIssuerOptionsMarathi = ['ठेकेदार/विकासक', 'ग्रामसेवक', 'नगरपालिका अथवा महानगरपालिकेद्वारे अधिकृतता असलेले व्यक्ती', 'इतर'];
    this.registrationTypeOptions = ['BOCW Act', 'Contract Act'];
    this.registrationTypeOptionsMarathi = ['बीओसीडब्ल्यू कायदा', 'कॉन्ट्रॅक्ट कायदा'];
    this.workerTypeOptions = ['Migrant', 'Local Resident'];
    this.workerTypeOptionsMarathi = ['स्थलांतरीत',  'स्थानिक निवासी'];

    this.registrationFormGroup = new FormGroup({
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
        attachmentType: [
          { key: `Aadhar card / आधारकार्ड`, value: 1 },
          { key: `Passport / पारपत्र`, value: 2 },
          { key: `PAN Card / पॅनकार्ड`, value: 3 },
          { key: `Driving Licence / वाहनचालक परवाना`, value: 4 },
          { key: `Birth Certificate / जन्माचा दाखला`, value: 5 },
          {
            key: `School Leaving Certificate / शाळा सोडल्याचे प्रमाणपत्र`,
            value: 6
          }
        ],
        uploaded: false,
        required: true
      },
      {
        document_en: `Certificate of working 90 days or more in the previous year (Authorized by the owner / village worker / M / s.
         Certificate of Authority made) one of these`,
        document_mr: `मागील वर्षात ९० किंवा अधिक दिवस काम केल्याचे प्रमाणपत्र (मालकाचे / ग्रामसेवक / म.न .पा./ न. पा. ने प्राधिकृत
          केलेल्या अधिकाऱ्याचे प्रमाणपत्र) यापैकी एक`,
        attachmentType: [
          { key: `Owner's Certificate / मालकाचे`, value: 7 },
          { key: `Gramsevak Certificate / ग्रामसेवक`, value: 8 },
          { key: `MNC Certificate / म.न.पा.`, value: 9 },
          {
            key: `Nagar palika office Certificate / न. पा. ने प्राधिकृत केलेल्या अधिकाऱ्याचे प्रमाणपत्र`,
            value: 10
          }
        ],
        uploaded: false,
        required: true
      },
      {
        document_en: `Resident Evidence (Aadhar Card / Passport / Driver's License / Credit Card / Electricity Payment of the previous month /
         Gram Panchayat Certificate) One of these`,
        document_mr: `रहिवासी पुरावा (आधारकार्ड / पारपत्र / वाहनचालक परवाना / शिधापत्रिका / मागील महिन्याचे विद्युत देयक /
          ग्रामपंचायत दाखला ) यापैकी एक`,
        attachmentType: [
          { key: `Aadhar card / आधारकार्ड`, value: 1 },
          { key: `Passport / पारपत्र`, value: 2 },
          { key: `Driving Licence / वाहनचालक परवाना`, value: 4 },
          { key: `Ration Card / शिधापत्रिका`, value: 11 },
          {
            key: `Last two month Light Bill / मागील महिन्याचे विद्युत देयक`,
            value: 12
          },
          { key: `Grampanchayat Certificate / ग्रामपंचायत दाखला`, value: 13 }
        ],
        uploaded: false,
        required: true
      },
      {
        document_en: `Photo ID Proof (Aadhar Card / Passport / Driver's License / PAN Card / Voter ID Card)`,
        document_mr: `फोटो आयडी पुरावा (आधार कार्ड / पारपत्र / वाहनचालक परवाना / पॅनकार्ड / मतदाता ओळखपत्र) एकाकी एक`,
        attachmentType: [
          { key: `Aadhar card / आधारकार्ड`, value: 1 },
          { key: `Passport / पारपत्र`, value: 2 },
          { key: `Driving Licence / वाहनचालक परवाना`, value: 4 },
          { key: `Pan Card / पॅनकार्ड`, value: 3 },
          { key: `Election Card / मतदाता ओळखपत्र`, value: 14 }
        ],
        uploaded: false,
        required: true
      },
      {
        document_en: `Xerox of bank passbook`,
        document_mr: `बँक पासबुक ची झेरॉक्स`,
        attachmentType: [
          { key: `Bank Passbook Xerox / बँक पासबुक ची झेरॉक्स`, value: 15 }
        ],
        uploaded: false,
        required: false
      }
    ];

    this.states = Object.keys(states);

    const attachmentList = this.registrationFormGroup.get('supportingDocuments').get('attachmentList') as FormArray;
    for (const i in this.attachmentDetails) {
      attachmentList.push(this.attachmentListFormGroup());
    }
  }

  ngOnInit() {
    this.userMgmntService.getUserTypes().subscribe(
      (userTypes: any) => {
        this.userType = userTypes.find(x => x._id === localStorage.getItem('userType')).description;
        this.userTypeId = userTypes.find(x => x._id === localStorage.getItem('userType'))._id;
      },
      err => console.log(err)
    );
    this.state.setValue('MAHARASHTRA');
    this.relation.patchValue('Self'); this.relation.disable();
    this.relation_mr.patchValue('स्वतः'); this.relation_mr.disable();
    this.userMgmntService.getUserTypes().subscribe(
      (userTypes: any) => {
        this.userType = userTypes.find(x => x._id === localStorage.getItem('userType')).description;
        if (!!this.userType && this.userType === 'Applicant') {
          this.getApplicantsDetails();
        } else if (!!this.userType && (this.userType === 'Data Entry Operator' || this.userType === 'Field Agents')) {
          if (!this.selectedApplicationData) this.modes = Modes.create;
          else this.modes = Modes.update;
        } else if (!!this.userType && (this.userType === 'Principal Secretary' || this.userType === 'Commissioner' || this.userType === 'Secretary/CEO' || this.userType === 'ACL' || this.userType === 'GLO' || this.userType === 'Asst Account Officer' || this.userType === 'Clerk' || this.userType === 'WFC I/c')) {
          this.modes = Modes.read;
        }

        this.checkModes();
      },
      err => console.log(err)
    );

    this.districts = Object.keys(this.statewiseListArray.MAHARASHTRA.district);

    // residential address
    this.district.valueChanges.subscribe(value => {
      this.talukasRes = this.state.value && value ? Object.keys(this.statewiseListArray[this.state.value].district[value].taluka) : [];
    });
    this.taluka.valueChanges.subscribe(value => {
      this.postOfficeArrayRes = this.state.value && this.district.value && value ? this.statewiseListArray[this.state.value].district[this.district.value].taluka[value].map(x => Object.keys(x)[0]) : [];
    });
    this.postOffice.valueChanges.subscribe(value => {
      const obj = this.state.value && this.district.value && this.taluka.value ? this.statewiseListArray[this.state.value].district[this.district.value].taluka[this.taluka.value].find(x => x.hasOwnProperty(value)) : {};
      this.pincode.patchValue(obj[value]);
    });

    // permanent address
    this.statePer.valueChanges.subscribe(value => {
      this.districts = value ? Object.keys(this.statewiseListArray[value].district) : [];
    });
    this.districtPer.valueChanges.subscribe(value => {
      this.talukasPer = this.statePer.value && value ? Object.keys(this.statewiseListArray[this.statePer.value].district[value].taluka) : [];
    });
    this.talukaPer.valueChanges.subscribe(value => {
      this.postOfficeArrayPer = this.statePer.value && this.districtPer.value && value ? this.statewiseListArray[this.statePer.value].district[this.districtPer.value].taluka[value].map(x => Object.keys(x)[0]) : [];
    });
    this.postOfficePer.valueChanges.subscribe(value => {
      const obj = this.statePer.value && this.districtPer.value && this.talukaPer.value ? this.statewiseListArray[this.statePer.value].district[this.districtPer.value].taluka[this.talukaPer.value].find(x => x.hasOwnProperty(value)) : {};
      this.pincodePer.patchValue(obj[value]);
    });

    // employer detail
    this.districtEmp.valueChanges.subscribe(value => {
      this.talukasEmp = Object.keys(this.statewiseListArray['MAHARASHTRA'].district[value].taluka);
    });

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
      this.registrationFormGroup.get(idArray[0]).get(`${idArray[1]}_mr`).patchValue(this.getSpecialDropDownValue(event.target.value), { emitEvent: false });
    } else if (idArray.length === 3) {
      this.registrationFormGroup.get(idArray[0]).get(idArray[1]).get(`${idArray[2]}_mr`).patchValue(this.getSpecialDropDownValue(event.target.value), { emitEvent: false });
    }
  }

  getSpecialDropDownValue(value: string) {
    return this.specialOptions.marathi[this.specialOptions.english.indexOf(value)];
  }

  calculateAge() {
    const val = new Date(this.registrationFormGroup.get('personalDetails').get('dobPersonal').value).toJSON().slice(0, 10).split('-');
    if (val) {
      const dob = moment(
        val[0] + '-' + val[1] + '-' + val[2],
        'YYYY-MM-DD'
      );
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
    // tslint:disable-next-line: max-line-length
    this.talukasPer = this.state.value && this.district.value ? Object.keys(this.statewiseListArray[this.state.value].district[this.district.value].taluka) : [];
    // tslint:disable-next-line: max-line-length
    this.postOfficeArrayPer = this.state.value && this.district.value && this.taluka.value ? this.statewiseListArray[this.state.value].district[this.district.value].taluka[this.taluka.value].map(x => Object.keys(x)[0]) : [];
    const resAddress = this.registrationFormGroup.get('personalDetails').get(
      'residentialAddress'
    );
    const permAddress = this.registrationFormGroup.get('personalDetails').get(
      'permanentAddress'
    );
    if (event.target.checked) {
      console.log('Patch Value');
      permAddress.patchValue(resAddress.value);
      permAddress.disable();
    } else {
      console.log('else');
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


  capitaliseIFSCCode() {
    let value = this.ifscCode.value;
    value = value.toString().toUpperCase();
    this.ifscCode.setValue(value);
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

  save() {
    debugger;
    
    console.log(this.registrationFormGroup);
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
      typeOfWorkerEmp: new FormControl('', [Validators.required]),
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
      registrationTypeEmp_mr: new FormControl(''),
      typeOfWorkerEmp_mr: new FormControl('')
    });
  }

  attachmentListFormGroup(): FormGroup {
    return new FormGroup({
      attachmentType: new FormControl(''),
      // file: new FormControl('', [Validators.required]),
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
  get typeOfWorkerEmp() { return this.registrationFormGroup.get('employerDetails').get('typeOfWorkerEmp'); }
  get MNREGACardNumberEmp() { return this.registrationFormGroup.get('employerDetails').get('MNREGACardNumberEmp'); }
  get contractorNameEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('contractorNameEmp_mr_mr'); }
  get contractorCompanyNameEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('contractorCompanyNameEmp_mr_mr'); }
  get workPlaceEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('workPlaceEmp_mr_mr'); }
  get townEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('townEmp_mr'); }
  get talukaEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('talukaEmp_mr'); }
  get districtEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('districtEmp_mr'); }
  get natureOfWorkEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('natureOfWorkEmp_mr'); }
  get typeOfEmployerEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('typeOfEmployerEmp_mr'); }
  get fullNameOfIssuerEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('fullNameOfIssuerEmp_mr'); }
  get registrationTypeEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('registrationTypeEmp_mr'); }
  get typeOfWorkerEmp_mr() { return this.registrationFormGroup.get('employerDetails').get('typeOfWorkerEmp_mr'); }

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

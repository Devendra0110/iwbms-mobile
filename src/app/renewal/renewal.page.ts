import * as moment from 'moment';
import * as sanscript from '@sanskrit-coders/sanscript';
import * as uuidv4 from 'uuid/v4';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';

import { Dialogs } from '@ionic-native/dialogs/ngx';
import { EmployerModalData } from '../../assets/common.interface';
import { EmployerModalPage } from '../employer-modal/employer-modal.page';
import { HttpService } from '../services/http.service';
import { Network } from '@ionic-native/network/ngx';
import { RenewalService } from '../services/renewal.service';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
import { Toast } from '@ionic-native/toast/ngx';
import { TransliterationService } from '../services/transliteration.service';
import { ValidationService } from '../services/validation.service';
import { serverUrl } from '../../assets/config';
import { states } from '../models/states';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.page.html',
  styleUrls: ['./renewal.page.scss'],
})
export class RenewalPage implements OnInit {

  public JWTToken: any;
  public renewalFormGroup: FormGroup;
  public todaysDate: any;
  public maxAppointmentDispatchDate: any;
  public minAppointmentDate: any;
  public minDispatchDate: any;
  public dispatchDateFlag: boolean;
  public readableDispatchDate: string;
  public registrationDetails: any;
  public selectedRenewalData: any;
  public districts: any[] = [];
  public talukas: any[] = [];
  public talukasIssuerEmp: any[] = [];
  public talukasIssuerGram: any[] = [];
  public talukasMuncipal: any[] = [];
  public natureOfWorkEmpArray: any[];
  public issuers: any[];
  public issuersRegistrationTypes: any[];
  public statewiseListArray = states;
  public token_id: any;
  public appointmentDate: any;
  public minFromDate: string;
  public maxToDate: string;
  public typeOfWorkOptions: string[] = [];
  public typeOfWorkOptionsMarathi: string[] = [];
  public natureOfWorkOptions: string[] = [];
  public natureOfWorkOptionsMarathi: string[] = [];
  public typeOfIssuerOptions: string[] = [];
  public typeOfIssuerOptionsMarathi: string[] = [];
  public registrationTypeOptions:string[] = [];
  public registrationTypeOptionsMarathi:string[] = []
  public uploadedSupportingDocuments: any;
  public workingDay: number;
  public workingDayFlag: boolean;
  public specialOptions = {
    english: ['Male', 'Female', 'Other', 'Single', 'Married', 'Divorced', 'Widow', 'Widower', 'SC', 'ST', 'NT', 'OBC', 'Open', 'Contractor/Developer', 'Gramsevak', 'Person with authorization by municipality or municipal corporation', 'others', 'BOCW Act', 'Contract Act', 'Migrant', 'Local Resident', 'Buildings', 'Streets', 'Roads', 'Railways', 'Tramways', 'Airfields', 'Irrigation', 'Drainage', 'Embankment And Navigation Works', 'Flood Control Works (Including Storm Water Drainage Works)', 'Generation', 'Transmission And Distribution Of Power', 'Water Works (Including Channels For Distribution Of Water)', 'Oil And Gas Installations', 'Electric Lines', 'Wireless', 'Radio', 'Television', 'Telephone', 'Telegraph and Overseas Communications', 'Dams', 'Canals', 'Reservoirs', 'Watercourses', 'Tunnels', 'Bridges', 'Viaducts', 'Aquaducts', 'Pipelines', 'Towers', 'Cooling Towers', 'Transmission Towers and Such Other Work', 'Cutting the stone, breaking it and crushing the stone finely', 'Cutting and polishing of tiles or tiles', 'Carpentry with paint, varnish, etc', 'Gutter and plumbing works', 'Electrical works including wiring, distribution, tensioning, etc', 'Installation and repair of fire extinguishers', 'Installation and repair of air conditioning equipment', 'Installation of automatic lifts, etc', 'Installation of security doors and equipment', 'Preparation and installation of iron or metal grills, windows, doors', 'Construction of irrigation infrastructure', 'Interior work (including decorative) including carpentry, virtual ceilings, lighting, plaster of Paris', 'Cutting glass, plastering glass and installing glass panels', 'Preparation of bricks, roofs, etc., not covered under the Factories Act, 1948', 'Installation of energy efficient equipment like solar panels etc', 'Installation of modular units for use in places like cooking', 'Preparation and installation of cement concrete material etc', 'Construction of sports or recreational facilities including swimming pool, golf course etc', 'Construction or erection of information panels, road furniture, passenger shelters or bus stations, signal systems', 'Construction of Rotaries, Installation of Fountains etc', 'Construction of public parks, sidewalks, picturesque terrain etc', 'Yellow Card (below the poverty line)', 'Antyodaya food scheme card', 'Annapurna food scheme card', 'Orange Ration Card', 'None of these', 'Self', 'Father', 'Mother', 'Wife', 'Husband', 'Brother', 'Sister', 'Sister In Law(Brother Wife)', 'Sister In Law(Husband Sister)', 'Son', 'Daughter', 'Daughter In Law', 'Brother In Law', 'Grandson', 'Granddaughter', 'Mother in law', 'Father in law', 'Post Graduate', 'Medical Graduate', 'Engineering Graduate', 'Phd', 'Graduate', 'Diploma', 'ITI', 'HSC', '11th', 'SSC', '9th', '8th', '7th', '6th', '5th', '4th', '3rd', '2nd', '1st', 'Not Educated'],
    marathi: ['पुरुष', 'स्त्री', 'इतर', 'अविवाहित', 'विवाहित', 'घटस्फोटित', 'विधवा', 'विधुर', 'अनुसूचित जाती', 'अनुसूचित जमाती', 'एनटी', 'इमाव', 'खुला', 'ठेकेदार/विकासक', 'ग्रामसेवक', 'नगरपालिका अथवा महानगरपालिकेद्वारे अधिकृतता असलेले व्यक्ती', 'इतर', 'बीओसीडब्ल्यू कायदा', 'कॉन्ट्रॅक्ट कायदा', 'स्थलांतरीत', 'स्थानिक निवासी', 'इमारती', 'रस्त्यावर', 'रस्ते', 'रेल्वे', 'ट्रामवे', 'एअरफील्ड', 'सिंचन', 'ड्रेनेज', 'तटबंध आणि नेव्हिगेशन वर्क्स', 'स्टॉर्म वॉटर ड्रेनेज वर्क्ससह', 'निर्मिती', 'पारेषण आणि पॉवर वितरण', 'पाणी वितरणासाठी चॅनल समाविष्ट करण', 'तेल आणि गॅसची स्थापना', 'इलेक्ट्रिक लाईन्स', 'वायरलेस', 'रेडिओ', 'दूरदर्शन', 'दूरध्वनी', 'टेलीग्राफ आणि ओव्हरसीज कम्युनिकेशन्स', 'डॅम', 'नद्या', 'रक्षक', 'पाणीपुरवठा', 'टनेल', 'पुल', 'पदवीधर', 'जलविद्युत', 'पाइपलाइन', 'टावर्स', 'कूलिंग टॉवर्स', 'ट्रान्समिशन टावर्स आणि अशा इतर कार्य', 'दगड कापणे, फोडणे व दगडाचा बारीक चुरा करणे', 'लादी किंवा टाईल्स कापणे व पॉलिश करणे', 'रंग, वॉर्निश लावणे, इत्यादीसह सुतारकाम', 'गटार व नळजोडणीची कामे', 'वायरिंग, वितरण, तावदान बसविणे इत्यादीसहित विद्युत कामे', 'अग्निशमन यंत्रणा बसविणे व तिची दुरुस्ती करणे', 'वातानुकूलित यंत्रणा बसविणे व तिची दुरुस्ती करणे', 'उद्वाहने, स्वयंचलित जिने इत्यादी बसविणे', 'सुरक्षा दरवाजे उपकरणे इत्यादी बसविणे', 'लोखंडाच्या किंवा धातुच्या ग्रिल्स, खिडक्या, दरवाजे तयार करणे व बसविणे', 'जलसंचयन संरचनेचे बांधकाम करणे', 'सुतारकाम करणे, आभाशी छत, प्रकाश व्यवस्था, प्लास्टर ऑफ पेरीस यांसहित अंतर्गत (सजावटीचे) काम', 'काच कापणे, काचरोगण लावणे व काचेची तावदाने बसविणे', 'कारखाना अधिनियम, 1948 खाली समावेश नसलेल्या विटा, छप्परांवरील कौल इत्यादी तयार करणे', 'सौर तावदाने इत्यादींसारखी ऊर्जाक्षम उपकरण बसविणे', 'स्वयंपाकखोली सारख्या ठिकाणी वापरण्यासाठी मोडुलर (आधुनिक) युनिट बसविणे', 'सिमेन्ट काँक्रिटच्या साचेबद्ध वस्तू इत्यादी तयार करणे व बसविणे', 'जलतरण तलाव, गोल्फचे मैदान इत्यादीसह खेळ किंवा मनोरंजनाच्या सुविधांचे बांधकाम करणे', 'माहिती फलक, रोड फर्निचर, प्रवाशी निवारे किंवा बसस्थानके, सिग्नल यंत्रणा इत्यादी बांधणे किंवा उभारणे', 'रोटरीजचे बांधकाम करणे, कारंजे बसविणे इत्यादी', 'सार्वजनिक उद्याने, पदपथ, रमणीय भू-प्रदेश इत्यादींचे बांधकाम', 'दारिद्र रेषेखालील पिवळे', 'अंत्योदय अन्न योजना', 'अन्नपूर्णा शिधापत्रिका', 'केशरी शिधापत्रिका (रु. १ लाखापर्यंत वार्षिक उत्पन्न असलेली)', 'यापैकी एकही नाही', 'स्वतः', 'वडील', 'आई', 'पत्नी', 'पती', 'भाऊ', 'बहीण', 'वहिनी', 'ननंद', 'मुलगा', 'मुलगी', 'सून', 'देवर', 'नातु', 'नात', 'सासू', 'सासरा', 'पदव्युत्तर पदवी', 'वैद्यकीय पदवीधर', 'अभियांत्रिकी पदवी', 'पीएचडी', 'पदवीधर', 'डिप्लोमा', 'आय.टी.आय', 'एचएससी', '११ वी', 'एसएससी', '९ वी', '८ वी', '७ वी', '६ वी', '५ वी', '४ थी', '३ री', '२ री', '१ ली', 'अशिक्षित']
  };
  public files: { workCertificate: File, yellowBook: File, selfDeclarationFile: File };
  public fileOptions: { workCertificate: string, yellowBook: string, selfDeclarationFile: string }; 
  public mode: any = {
    create: false,
    read: false,
    update: false
  };

  constructor(
    private validationService: ValidationService,
    private transliterate: TransliterationService,
    private router: Router,
    private route: ActivatedRoute,
    private renewalService: RenewalService,
    private mdlController: ModalController,
    private storage: Storage,
    private network: Network,
    private dialogs: Dialogs,
    private toast: Toast,
    private httpService: HttpService,
  ) {
    // network subscribers check the status of network even its type
    this.network.onDisconnect().subscribe(() => { });
    this.network.onConnect().subscribe(() => { });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.registrationNo.setValue(this.router.getCurrentNavigation().extras.state.registrationNo);
      } else {
        this.router.navigate(['/verification']);
      }
    });

    // re-route to homepage if not logged-in
    this.storage.get('token').then((val) => {
      if (val === null) {
        this.router.navigate(['/home']);
      } else {
        this.JWTToken = val;
      }
    });

    this.renewalFormGroup = new FormGroup({
      contractorNameEmp: new FormControl('', this.validationService.createValidatorsArray('contractorNameEmp')),
      contractorCompanyNameEmp: new FormControl('', this.validationService.createValidatorsArray('contractorCompanyNameEmp')),
      selfDeclarationFile: new FormControl('', [Validators.required]),
      workCertificate: new FormControl('', [Validators.required]),
      yellowBook: new FormControl('', []),
      employerWorkDetails: new FormArray([this.employerWorkDetailsFormFroup()]),
      registrationNo: new FormControl('', this.validationService.createValidatorsArray('regNo')),
      contractorPhoneEmp: new FormControl('', this.validationService.createValidatorsArray('contractorPhoneEmp')),
      workPlaceEmp: new FormControl('', this.validationService.createValidatorsArray('workPlaceEmp')),
      townEmp: new FormControl('', this.validationService.createValidatorsArray('city')),
      talukaEmp: new FormControl('', this.validationService.createValidatorsArray('taluka')),
      districtEmp: new FormControl('', this.validationService.createValidatorsArray('district')),
      pinCodeEmp: new FormControl('', this.validationService.createValidatorsArray('pinCodeEmp')),
      appointmentDateEmp: new FormControl(null, this.validationService.createValidatorsArray('appointmentDateEmp')),
      dispatchDateEmp: new FormControl(null, this.validationService.createValidatorsArray('dispatchDateEmp')),
      remunerationPerDayEmp: new FormControl('', this.validationService.createValidatorsArray('remunerationPerDayEmp')),
      natureOfWorkEmp: new FormControl('', this.validationService.createValidatorsArray('natureOfWorkEmp')),
      contractorNameEmp_mr: new FormControl(''),
      contractorCompanyNameEmp_mr: new FormControl(''),
      workPlaceEmp_mr: new FormControl(''),
      townEmp_mr: new FormControl(''),
      talukaEmp_mr: new FormControl(''),
      districtEmp_mr: new FormControl(''),
      natureOfWorkEmp_mr: new FormControl(''),
      typeOfIssuer: new FormControl('', [Validators.required]),
      typeOfIssuer_mr: new FormControl(''),
      registeredWith: new FormControl(''),
      registrationNoOfIssuer: new FormControl(''),
      dispatchNo: new FormControl('', this.validationService.createValidatorsArray('dispatchNo')),
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
      nameOfMunicipalCorporation: new FormControl(''),
      nameOfMunicipalCorporation_mr: new FormControl(''),
      districtOfMunicipalCorporation: new FormControl(''),
      districtOfMunicipalCorporation_mr: new FormControl(''),
      talukaOfMunicipalCorporation: new FormControl(''),
      talukaOfMunicipalCorporation_mr: new FormControl(''),
      selfDeclaration: new FormControl(''),
      verifyDocumentCheck: new FormControl('', [Validators.required]),
      typeOfWorkEmp: new FormControl('', [Validators.required]),
      typeOfWorkEmp_mr: new FormControl(''),
      moreThan90Days: new FormControl('', [Validators.required])
    });
    this.registrationNo.setValue('MH323240000002');
    this.fileOptions = { workCertificate: null, yellowBook: null, selfDeclarationFile: null };
    this.files = { workCertificate: null, yellowBook: null, selfDeclarationFile: null };

    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.minDispatchDate = moment().subtract(1, 'years').add(90, 'days').format('YYYY-MM-DD')
    this.readableDispatchDate = moment(this.minDispatchDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
    this.dispatchDateFlag = false;
    this.minFromDate = this.changeToIonDateTime(1, 'years')
    this.maxAppointmentDispatchDate = this.changeToIonDateTime(0, 'year');
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
  }

  ngOnInit() {

    this.httpService.getDistricts(21).subscribe((districtsArrObj: any) => {
      // create district-name:district-id key-value in district
      for (const i of districtsArrObj) this.districts[i.district_name] = i.district_id;
    }, err => console.log(err));
    
    this.districtEmp.valueChanges.subscribe(value => {
      this.talukas = [];
      this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
        for (const i of talukaArrObj) {
          this.talukas[i.taluka_name] = i.taluka_id;
        }
      }, err => console.log(err));
    });


    this.typeOfIssuer.valueChanges.subscribe((typeOfIssuerId) => {
      this.nameOfGramPanchayat.reset();
      this.nameOfGramPanchayat_mr.reset();
      this.districtOfGramPanchayat.reset();
      this.districtOfGramPanchayat_mr.reset();
      this.talukaOfGramPanchayat.reset();
      this.talukaOfGramPanchayat_mr.reset();
      this.nameOfMunicipalCorporation.reset();
      this.nameOfMunicipalCorporation_mr.reset();
      this.districtOfMunicipalCorporation.reset();
      this.districtOfMunicipalCorporation_mr.reset();
      this.talukaOfMunicipalCorporation.reset();
      this.talukaOfMunicipalCorporation_mr.reset();
      this.nameOfEmployer.reset();
      this.nameOfEmployer_mr.reset();
      this.districtOfEmployer.reset();
      this.districtOfEmployer_mr.reset();
      this.talukaOfEmployer.reset();
      this.talukaOfEmployer_mr.reset();
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

    this.districtOfMunicipalCorporation.valueChanges.subscribe(value => {
      this.talukasMuncipal = [];
      this.httpService.getTalukas(value).subscribe((talukaArrObj: any) => {
        for (const i of talukaArrObj) {
          this.talukasMuncipal[i.taluka_name] = i.taluka_id;
        }
      }, err => console.log(err));
    });

    this.appointmentDateEmp.valueChanges.subscribe(value => {
      if (moment(value).diff(moment(this.minFromDate, 'YYYY-MM-DD'), 'days') > 0) {
        this.minFromDate = moment(value).format('YYYY-MM-DD');
      } else {
        this.minFromDate = this.changeToIonDateTime(1, 'years')
      }
      this.appointmentDate = moment(value).format('YYYY-MM-DD');
      this.renewalFormGroup.get('appointmentDateEmp').patchValue(this.appointmentDate, { emitEvent: false });
    }, err => console.log(err));

    this.dispatchDateEmp.valueChanges.subscribe(value => {
      this.maxToDate = moment(value).format('YYYY-MM-DD');
      this.renewalFormGroup.get('dispatchDateEmp').patchValue(this.maxToDate, { emitEvent: false });
      this.dispatchDateFlag = moment(this.maxToDate, 'YYYY-MM-DD').diff(moment(this.minDispatchDate, 'YYYY-MM-DD'), 'days') < 0 ? true : false;
    }, err => console.log(err));

  }

  public minFDate(index: number): string {
    if (index === 0) {
      if (this.registrationDetails) {
        const registrationDate = this.registrationDetails.registration_date;
        const date = moment(registrationDate).subtract(1, 'year').format('DD/MM/YYYY');
        const splittedDate = date.split('/');
        return this.getIonDate(splittedDate);
      } else {
        return this.changeToIonDateTime(1, 'years');
      }
    } else {
      return this.renewalFormGroup.get('employerWorkDetails').get((index - 1).toString()).get('toDateEmp').value;
    }
  }

  public maxFDate(index: number): any {
    return this.dispatchDateEmp.value;
  }

  public minTDate(index: number): any {
    return this.renewalFormGroup.get('employerWorkDetails').get(index.toString()).get('fromDateEmp').value;
  }

  public maxTDate(index: number): any {
    return this.dispatchDateEmp.value;
  }

  

  changeToIonDateTime(diff: any, timeUnit: string) {
    const date = moment(
      new Date(this.todaysDate.year, this.todaysDate.month - 1, this.todaysDate.day))
      .subtract(diff, timeUnit).format('DD/MM/YYYY').split('/');
    return this.getIonDate(date);
  }

    getIonDate(date: any): string {
      if (Number(date[1]) < 10 && Number(date[0]) < 10) return `${Number(date[2])}-0${Number(date[1])}-0${Number(date[0])}`;
      else if (Number(date[1]) < 10 && Number(date[0]) >= 10) return `${Number(date[2])}-0${Number(date[1])}-${Number(date[0])}`;
      else if (Number(date[1]) >= 10 && Number(date[0]) < 10) return `${Number(date[2])}-${Number(date[1])}-0${Number(date[0])}`;
      else return `${Number(date[2])}-${Number(date[1])}-${Number(date[0])}`;
    }

  employerWorkDetailsFormFroup(): FormGroup {
    return new FormGroup({
      typeOfEmployerEmp: new FormControl('', [Validators.required]),
      fullNameOfIssuerEmp: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z\\s]{8,50}')]),
      mobileNumberOfIssuerEmp: new FormControl('', [Validators.required, Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$')]),
      fromDateEmp: new FormControl(null, Validators.required),
      toDateEmp: new FormControl(null, Validators.required),
      typeOfEmployerEmp_mr: new FormControl(''),
      fullNameOfIssuerEmp_mr: new FormControl(''),
      workingDays: new FormControl('')
    });
  }

  setMinAppointmentDate(dob: string) {
    const minAppointmentDate = moment(dob).add(18, 'years').format('DD/MM/YYYY').split('/');
    this.minAppointmentDate = this.getIonDate(minAppointmentDate);
  }


  throw90DaysError() {
    if (this.workingDay <= 90) {
      this.dialogs.alert('Working days should be more than 90 days');
      this.workingDayFlag = false;
    } else {
      this.moreThan90Days.setErrors(null);
      this.workingDayFlag = true;
    }
  }

  calculateDayForWorkDetails(i: string) {
    // tslint:disable-next-line: max-line-length
    const fromDate = moment(this.renewalFormGroup.get('employerWorkDetails').get(i.toString()).get('fromDateEmp').value).format('YYYY-MM-DD');
    // tslint:disable-next-line: max-line-length
    const toDate = this.renewalFormGroup.get('employerWorkDetails').get(i.toString()).get('toDateEmp').value ? moment(this.renewalFormGroup.get('employerWorkDetails').get(i.toString()).get('toDateEmp').value).format('YYYY-MM-DD') : null;
    if (fromDate && toDate) {
      this.renewalFormGroup.get('employerWorkDetails').get(i.toString()).get('fromDateEmp').patchValue(fromDate, { emitEvent: false });
      this.renewalFormGroup.get('employerWorkDetails').get(i.toString()).get('toDateEmp').patchValue(toDate, { emitEvent: false });
      const difference = moment(toDate).diff(fromDate, 'days') + 1;
      this.renewalFormGroup.get('employerWorkDetails').get(i.toString()).get('workingDays').patchValue(difference);
      let totalWorkingDays = 0;
      const employerWorkDetailsArr = this.renewalFormGroup.get('employerWorkDetails').value;
      for (const each in employerWorkDetailsArr) {
        totalWorkingDays += Number(employerWorkDetailsArr[each].workingDays);
      }
      this.workingDay = totalWorkingDays;
      if (this.workingDay < 90) {
        // alert('Working days is less than 90');
        this.workingDayFlag = true;
      } else {
        this.workingDayFlag = false;
        this.moreThan90Days.clearValidators()
        this.moreThan90Days.reset();
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
    const targetsArray = event.target.id;
    let target: any;
    let DTPObject: any;
    // choose if it is district/taluka/postoffice
    if (targetsArray === 'districtEmp' || targetsArray ==='districtOfGramPanchayat' ||targetsArray ==='districtOfMunicipalCorporation' || targetsArray ==='districtOfEmployer')
      DTPObject = this.districts;
    else if (targetsArray === 'talukaOfEmployer') DTPObject = this.talukasIssuerEmp;
    else if (targetsArray === 'talukaOfGramPanchayat') DTPObject = this.talukasIssuerGram;
    else if (targetsArray === 'talukaOfMunicipalCorporation') DTPObject = this.talukasMuncipal;
    else if (targetsArray === 'talukaEmp')
      DTPObject = this.talukas;


    // set formControl
      target = this.renewalFormGroup.get(`${targetsArray}_mr`);

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
    if (targetsArray.length === 1) {
      target = this.renewalFormGroup.get(`${targetsArray[0]}_mr`);
    } else if (targetsArray.length === 2) {
      target = this.renewalFormGroup.get(targetsArray[0]).get(`${targetsArray[1]}_mr`);
    } else if (targetsArray.length === 3) {
      target = this.renewalFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(`${targetsArray[2]}_mr`);
    } else {
      target = this.renewalFormGroup.get(targetsArray[0]).get(targetsArray[1]).get(targetsArray[2]).get(`${targetsArray[3]}_mr`);
    }
    try {
      this.transliterate.transliterateText(event.target.value, 'NAME').subscribe((response: any) => {

        const result = response.split(';').map((item) => {
          return item.split('^')[0];
        });

        target.patchValue(result.join(' '));
      }, (error) => {
        target.patchValue(sanscript.t(event.target.value, 'itrans', 'devanagari'));
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
      const control = this.renewalFormGroup.get(idArray[0]).get(idArray[1]);
      control.valueChanges.subscribe((changes) => {
        control.patchValue(changes, { emitEvent: false });
      });
    } else if (idArray.length === 3) {
      const control = this.renewalFormGroup.get(idArray[0]).get(idArray[1]).get(idArray[2]);
      control.valueChanges.subscribe((changes) => {
        control.patchValue(changes, { emitEvent: false });
      });
    }
    if (idArray.length === 4) {
      const control = this.renewalFormGroup.get(idArray[0]).get(idArray[1]).get(idArray[2]).get(idArray[3]);
      control.valueChanges.subscribe((changes) => {
        control.patchValue(changes, { emitEvent: false });
      });
    }
  }

  handleSpecialDropdowns(event) {
    const idArray = event.target.id.split('-');
    const value = Number(event.target.value);
    if (idArray.length === 2) {
      this.renewalFormGroup.get(idArray[0]).get(`${idArray[1]}_mr`).patchValue(value, { emitEvent: false });
    } else if (idArray.length === 3) {
      this.renewalFormGroup.get(idArray[0]).get(idArray[1]).get(`${idArray[2]}_mr`).patchValue(value, { emitEvent: false });
    }else{
      this.renewalFormGroup.get(`${idArray[0]}_mr`).patchValue(value, { emitEvent: false });
    }
  }

  getSpecialDropDownValue(value: string) {
    return this.specialOptions.marathi[this.specialOptions.english.indexOf(value)];
  }

  async showEmployerModal(index: number, mode: string, employerForm?: any) {
    const employerData: EmployerModalData = {
      index,
      mode,
      employerDetail: employerForm,
      appointmentDate: this.minFromDate,
      dispatchDate: this.maxToDate,
      fromDate: index > 0 ? this.renewalFormGroup.get('employerWorkDetails').get(`${index - 1}`).get('fromDateEmp').value : this.minFromDate,
      toDate: index > 0 ? this.renewalFormGroup.get('employerWorkDetails').get(`${index - 1}`).get('toDateEmp').value : this.maxToDate,
    };

    const employerModal = await this.mdlController.create({
      component: EmployerModalPage,
      componentProps: {
        modalData: employerData
      }
    });
    const workerDetailsArray = this.renewalFormGroup.get('employerWorkDetails') as FormArray;
    await employerModal.present();
    employerModal.onDidDismiss()
      .then(res => {
        if (res.data.formState === 'add') {
          workerDetailsArray.push(this.employerWorkDetailsFormFroup());
          this.renewalFormGroup.get('employerWorkDetails').get(`${index}`).setValue(res.data.formData.value);
          this.calculateDayForWorkDetails(`${index}`);
        } else if (res.data.formState === 'delete') this.deleteWorkerDetail(index);
        else {
          this.renewalFormGroup.get('employerWorkDetails').get(`${index}`).setValue(res.data.formData.value);
        }
      });
  }

  addMoreWorkerDetails() {
    if (this.dispatchDateFlag || this.appointmentDateEmp.value === null || this.dispatchDateEmp.value === null) return;
    const workerDetailsArray = this.renewalFormGroup.get('employerWorkDetails') as FormArray;
    this.showEmployerModal(workerDetailsArray.length, 'add');
  }


  editWorkerDetail(i: number) {
    if (this.dispatchDateFlag || this.appointmentDateEmp.value === null || this.dispatchDateEmp.value === null) return;
    if (this.appointmentDateEmp.value && this.dispatchDateEmp.value) {
      this.showEmployerModal(i, 'update', this.renewalFormGroup.get('employerWorkDetails').get(`${i}`));
    } else if (this.appointmentDateEmp.value) {
      alert('Please choose the dispatch date');
    } else {
      alert('Please choose the appointment date');
    }
  }

  deleteWorkerDetail(i: number) {
    const workerDetailsArray = this.renewalFormGroup.get('employerWorkDetails') as FormArray;
    workerDetailsArray.removeAt(i);
    let totalWorkingDays = 0;
    const employerWorkDetailsArr = this.renewalFormGroup.get('employerWorkDetails').value;
    for (const each in employerWorkDetailsArr) {
      totalWorkingDays += Number(employerWorkDetailsArr[each].workingDays);
    }
    this.workingDay = totalWorkingDays;
    if (workerDetailsArray.length === 0) {
      workerDetailsArray.push(this.employerWorkDetailsFormFroup());
    }
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
    //   this.renewalFormGroup.get(event.target.id).patchValue(null);
    //   this.toast.show('File Should Be PDF or JPG or PNG', '2000', 'bottom').subscribe((toast) => {
    //   });

    // } else {
    //   this.renewalFormGroup.get('supportingDocuments').get(event.target.id).patchValue(null);
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

  async save() {
    if (this.network.type === 'none' || this.network.type === 'NONE') {
      this.dialogs.alert('Please check your internet connectivity.');
    } else {
      if (this.renewalFormGroup.valid) {
        const formData = new FormData();
        // tslint:disable-next-line: forin
        const filesFormData = new FormData();
        for (const item in this.files) {
          if (this.files[item]) {
            filesFormData.append('files', this.files[item], this.fileOptions[item]);
          }
        }
          formData.append('fileOptions', JSON.stringify(this.fileOptions));
          formData.append('data', JSON.stringify(this.renewalFormGroup.getRawValue()));
          formData.append('modeOfApplication', 'Renewal By Field Agent');

        try {
          await this.httpService.uploadFiles(filesFormData).toPromise();
        } catch (error) {
          this.dialogs.alert('Application not saved. An error occured while saving documents.');
          return;
        }
        this.httpService.saveRenewalData(formData, this.JWTToken).subscribe(
          (res: any) => {
            this.dialogs.alert(`Renewal Form is saved successfully 👍🙂. Please visit below WFC with original documents for verification : ${this.joinWfcNames(res)}`)
            this.router.navigate(['/dashboard']);
          },
          (err: any) => console.error(err)
        );
      } else {
        console.log(this.renewalFormGroup.controls);
        this.renewalFormGroup.markAllAsTouched();
        this.dialogs.alert('Form is not valid yet!');
      }
    }
  }



  get yellowBook() { return this.renewalFormGroup.get('yellowBook'); }
  get selfDeclarationFile() { return this.renewalFormGroup.get('selfDeclarationFile'); }
  get moreThan90Days() { return this.renewalFormGroup.get('moreThan90Days'); }
  get contractorNameEmp() { return this.renewalFormGroup.get('contractorNameEmp'); }
  // employer getters

  get contractorCompanyNameEmp() { return this.renewalFormGroup.get('contractorCompanyNameEmp'); }
  get contractorPhoneEmp() { return this.renewalFormGroup.get('contractorPhoneEmp'); }
  get workPlaceEmp() { return this.renewalFormGroup.get('workPlaceEmp'); }
  get townEmp() { return this.renewalFormGroup.get('townEmp'); }
  get talukaEmp() { return this.renewalFormGroup.get('talukaEmp'); }
  get districtEmp() { return this.renewalFormGroup.get('districtEmp'); }
  get pinCodeEmp() { return this.renewalFormGroup.get('pinCodeEmp'); }
  get appointmentDateEmp() { return this.renewalFormGroup.get('appointmentDateEmp'); }
  get remunerationPerDayEmp() { return this.renewalFormGroup.get('remunerationPerDayEmp'); }
  get natureOfWorkEmp() { return this.renewalFormGroup.get('natureOfWorkEmp'); }
  get dispatchDateEmp() { return this.renewalFormGroup.get('dispatchDateEmp'); }
  get MNREGACardNumberEmp() { return this.renewalFormGroup.get('MNREGACardNumberEmp'); }
  get contractorNameEmp_mr() { return this.renewalFormGroup.get('contractorNameEmp_mr'); }
  get contractorCompanyNameEmp_mr() { return this.renewalFormGroup.get('contractorCompanyNameEmp_mr'); }
  get workPlaceEmp_mr() { return this.renewalFormGroup.get('workPlaceEmp_mr'); }
  get townEmp_mr() { return this.renewalFormGroup.get('townEmp_mr'); }
  get talukaEmp_mr() { return this.renewalFormGroup.get('talukaEmp_mr'); }
  get districtEmp_mr() { return this.renewalFormGroup.get('districtEmp_mr'); }
  get natureOfWorkEmp_mr() { return this.renewalFormGroup.get('natureOfWorkEmp_mr'); }
  get typeOfIssuer() { return this.renewalFormGroup.get('typeOfIssuer'); }
  get typeOfIssuer_mr() { return this.renewalFormGroup.get('typeOfIssuer_mr'); }

  get registeredWith() {
    return this.renewalFormGroup.get('registeredWith');
  }

  get registrationNoOfIssuer() {
    return this.renewalFormGroup.get('registrationNoOfIssuer');
  }

  get dispatchNo() {
    return this.renewalFormGroup.get('dispatchNo');
  }

  get dispatchDate() {
    return this.renewalFormGroup.get('dispatchDate');
  }

  get nameOfEmployer() {
    return this.renewalFormGroup.get('nameOfEmployer');
  }

  get nameOfEmployer_mr() {
    return this.renewalFormGroup.get('nameOfEmployer_mr');
  }

  get districtOfEmployer() {
    return this.renewalFormGroup.get('districtOfEmployer');
  }

  get districtOfEmployer_mr() {
    return this.renewalFormGroup.get('districtOfEmployer_mr');
  }

  get talukaOfEmployer() {
    return this.renewalFormGroup.get('talukaOfEmployer');
  }

  get talukaOfEmployer_mr() {
    return this.renewalFormGroup.get('talukaOfEmployer_mr');
  }

  get nameOfGramPanchayat() {
    return this.renewalFormGroup.get('nameOfGramPanchayat');
  }

  get nameOfGramPanchayat_mr() {
    return this.renewalFormGroup.get('nameOfGramPanchayat_mr');
  }

  get districtOfGramPanchayat() {
    return this.renewalFormGroup.get('districtOfGramPanchayat');
  }

  get districtOfGramPanchayat_mr() {
    return this.renewalFormGroup.get('districtOfGramPanchayat_mr');
  }

  get talukaOfGramPanchayat() {
    return this.renewalFormGroup.get('talukaOfGramPanchayat');
  }

  get talukaOfGramPanchayat_mr() {
    return this.renewalFormGroup.get('talukaOfGramPanchayat_mr');
  }
  get nameOfMunicipalCorporation() {
    return this.renewalFormGroup.get('nameOfMunicipalCorporation');
  }

  get nameOfMunicipalCorporation_mr() {
    return this.renewalFormGroup.get('nameOfMunicipalCorporation_mr');
  }

  get districtOfMunicipalCorporation() {
    return this.renewalFormGroup.get('districtOfMunicipalCorporation');
  }

  get districtOfMunicipalCorporation_mr() {
    return this.renewalFormGroup.get('districtOfMunicipalCorporation_mr');
  }

  get talukaOfMunicipalCorporation() {
    return this.renewalFormGroup.get('talukaOfMunicipalCorporation');
  }

  get talukaOfMunicipalCorporation_mr() {
    return this.renewalFormGroup.get('talukaOfMunicipalCorporation_mr');
  }

  

  get typeOfEmployerEmp() { return this.renewalFormGroup.get('employerWorkDetails')['controls'][0].get('typeOfEmployerEmp'); }
  get fullNameOfIssuerEmp() { return this.renewalFormGroup.get('employerWorkDetails')['controls'][0].get('fullNameOfIssuerEmp'); }
  get mobileNumberOfIssuerEmp() { return this.renewalFormGroup.get('employerWorkDetails')['controls'][0].get('mobileNumberOfIssuerEmp'); }
  get toDateEmp() { return this.renewalFormGroup.get('employerWorkDetails')['controls'][0].get('toDateEmp'); }
  get fromDateEmp() { return this.renewalFormGroup.get('employerWorkDetails')['controls'][0].get('fromDateEmp'); }
  get typeOfEmployerEmp_mr() { return this.renewalFormGroup.get('employerWorkDetails')['controls'][0].get('typeOfEmployerEmp_mr'); }
  get fullNameOfIssuerEmp_mr() { return this.renewalFormGroup.get('employerWorkDetails')['controls'][0].get('fullNameOfIssuerEmp_mr'); }


  get workCertificate() { return this.renewalFormGroup.get('workCertificate'); }
  get verifyDocumentCheck() { return this.renewalFormGroup.get('verifyDocumentCheck'); }
  get typeOfWorkEmp() { return this.renewalFormGroup.get('typeOfWorkEmp'); }
  get typeOfWorkEmp_mr() { return this.renewalFormGroup.get('typeOfWorkEmp_mr'); }
  get registrationNo() { return this.renewalFormGroup.get('registrationNo'); }
}

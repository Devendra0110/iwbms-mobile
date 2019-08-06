import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public registrationFormGroup: FormGroup;

  constructor(private validationService: ValidationService) {
    this.registrationFormGroup = new FormGroup({
      personalDetails: this.personalDetailsFormFroup(),
      familyDetails: new FormArray([this.familyDetailsFormGroup()]),
      bankDetails: this.bankDetailsFormFroup(),
      employerDetails: this.employerDetailsFormFroup(),
      supportingDocuments: this.supportingDocumentsFormFroup(),
    });

  }

  ngOnInit() {
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
  supportingDocumentsFormFroup(): FormGroup {
    return new FormGroup({
      attachmentList: new FormArray([]),
      supportingDocuments: new FormControl(''),
      applicantPhoto: new FormControl(''),
      registrationReceipt: new FormControl('')
    });
  }

}

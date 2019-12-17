import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


  constructor() { }

  createValidatorsArray(key: string) {
    let validatorsArr = [];
    switch (key) {
      case 'aadharNo': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^\\d{12}$')
        ];
        break;
      }
      case 'firstName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z]{3,}$')
        ];
        break;
      }
      case 'middleName': {
        validatorsArr = [
          Validators.maxLength(20),
          Validators.pattern('^([A-Za-z]+\\s*)+$')
        ];
        break;
      }
      case 'lastName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z]{3,}$')
        ];
        break;
      }
      case 'gender': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'dob': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'maritalStatus': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'rationCardNumber': {
        validatorsArr = [
          Validators.maxLength(12),
          Validators.minLength(8),
          Validators.pattern('^([0-9]){8,12}\\s*$')
        ];
        break;
      }
      case 'rationCardType' :{
        validatorsArr = [        ];
        break;
      }
      case 'category': {
        validatorsArr = [Validators.required
        ];
        break;
      }
      case 'pfOrUan': {
        validatorsArr = [Validators.maxLength(22), Validators.pattern('^([A-Z]{2})([A-Z]{3})([0-9]{1,7})([0-9]{3})?([0-9]{1,7})|[0-9]{12}$')];
        break;
      }
      case 'esicNo': {
        validatorsArr = [
          Validators.maxLength(17),
          Validators.pattern('^(\\d{4})(\\d{1,6})(\\d{3})(\\d{4})$')
        ];
        break;
      }
      case 'userName': {
        validatorsArr = [
          Validators.required,
          Validators.email
        ];
        break;
      }
      case 'email': {
        validatorsArr = [
          Validators.email
        ];
        break;
      }
      case 'mobile': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(
            '^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[67890]\\d{9}$'
          )
        ];
        break;
      }
      case 'remunerationPerDayEmp': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$')
        ];
        break;
      }
      case 'houseNo': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(40)
        ];
        break;
      }
      case 'road': {
        validatorsArr = [
          Validators.maxLength(40)
        ];
        break;
      }
      case 'area': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(40)
        ];
        break;
      }
      case 'city': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^([A-Za-z]+\\s*)+$'),
          Validators.maxLength(40)
        ];
        break;
      }
      case 'importantPlace': {
        validatorsArr = [
          Validators.maxLength(40)
        ];
        break;
      }
      case 'postOffice': {
        validatorsArr = [
          Validators.maxLength(40)
        ];
        break;
      }
      case 'taluka': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'district': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'state': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'stdcode': {
        validatorsArr = [Validators.maxLength(5), Validators.minLength(2),Validators.pattern('^[\\d]+$')];
        break;
      }
      case 'phone': {
        validatorsArr = [Validators.maxLength(8), Validators.minLength(5)];
        break;
      }
      // bankvalidation
      case 'ifscCode': {
        validatorsArr = [Validators.maxLength(11), Validators.minLength(11), Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')];
        break;
      }
      case 'fullName': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('[A-Za-z]+\\s{1}[A-Za-z]+(\\s{1}[A-Za-z]+)*')
        ];
        break;
      }
      case 'bankName': {
        validatorsArr = [Validators.required, 
          Validators.maxLength(60)];
        break;
      }
      case 'bankBranch': {
        validatorsArr = [Validators.required, 
          Validators.maxLength(60)];
        break;
      }
      case 'bankAddress': {
        validatorsArr = [Validators.required, 
          Validators.maxLength(255)];
        break;
      }
      case 'micrCode': {
        validatorsArr = [Validators.pattern('[0-9]{9}')];
        break;
      }
      case 'accountNumber': {
        validatorsArr = [Validators.required,
           Validators.pattern('^\\d{9,18}$')];
        break;
      }
      case 'contractorNameEmp' :{
        validatorsArr = [Validators.required, 
          Validators.pattern('^([A-Za-z]+\\s*)+$'),
        ];
        break;
      }
     
      
      case 'contractorCompanyNameEmp' :{
        validatorsArr = [Validators.required,
          Validators.pattern('^([A-Za-z]+\\s*)+$'),
          Validators.maxLength(100)
        ];
        break;
      }
      case 'contractorPhoneEmp' :{
        validatorsArr = [Validators.required, 
          Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[67890]\\d{9}$'),
          Validators.maxLength(10)
        ];
        break;
      }
      case 'workPlaceEmp' :{
        validatorsArr = [
          Validators.required,
          Validators.pattern('^([A-Za-z]+\\s*)+$'),
          Validators.maxLength(50)
        ];
        break;
      }
      case 'pinCodeEmp': {
        validatorsArr = [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$')
        ];
        break;
      }
      case 'dispatchNo': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[0-9]*$')
        ];
        break;
      }
      case 'appointmentDateEmp': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'dispatchDateEmp': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'natureOfWorkEmp': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'dispatchDateEmp': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }


      // FamilyDetails Validation
      case 'firstNameFamily': {
        validatorsArr = [Validators.required, Validators.maxLength(20)];
        break;
      }
      case 'firstName_marathi': {
        validatorsArr = [];
        break;
      }
      case 'fatherOrHusbandName': {
        validatorsArr = [Validators.maxLength(60), Validators.pattern('^([A-Za-z]+\\s*)+$')];
        break;
      }
      case 'fatherOrHusbandName_marathi': {
        validatorsArr = [];
        break;
      }
      case 'surname': {
        validatorsArr = [Validators.required, Validators.maxLength(20)];
        break;
      }
      case 'surname_marathi': {
        validatorsArr = [];
        break;
      }
      case 'ageFamily': {
        validatorsArr = [];
        break;
      }
      case 'age':{
        validatorsArr = [Validators.required];
        break;
      }
      case 'dobFamily': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'relation': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'profession': {
        validatorsArr = [
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-z]+$')
        ];
        break;
      }
      case 'education': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'nominee': {
        validatorsArr = [];
        break;
      }
      case 'verifyDocumentCheck': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('true')
        ];
        break;
      }


    }
    return validatorsArr;
  }

}

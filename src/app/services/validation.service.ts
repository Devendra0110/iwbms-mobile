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
          Validators.maxLength(20)
        ];
        break;
      }
      case 'middleName': {
        validatorsArr = [
          Validators.maxLength(20)
        ];
        break;
      }
      case 'lastName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(20)
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
        validatorsArr = [Validators.maxLength(14)
        ];
        break;
      }
      case 'category': {
        validatorsArr = [Validators.required
        ];
        break;
      }
      case 'pfOrUan': {
        validatorsArr = [Validators.maxLength(20)];
        break;
      }
      case 'esicNo': {
        validatorsArr = [Validators.maxLength(20)];
        break;
      }
      case 'email': {
        validatorsArr = [
          Validators.email,
          Validators.pattern(
            '^((?!\\.)[\\w-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$'
          )
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
          Validators.maxLength(40)
        ];
        break;
      }
      case 'importantPlace': {
        validatorsArr = [
          Validators.required,
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
        validatorsArr = [Validators.maxLength(3), Validators.minLength(2)];
        break;
      }
      case 'phone': {
        validatorsArr = [Validators.maxLength(8), Validators.minLength(5)];
        break;
      }
      // bankvalidation
      case 'ifscCode': {
        validatorsArr = [Validators.maxLength(11), Validators.minLength(11),Validators.required];
        break;
      }
      case 'fullName': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'bankName': {
        validatorsArr = [Validators.maxLength(40)];
        break;
      }
      case 'bankBranch': {
        validatorsArr = [Validators.maxLength(40)];
        break;
      }
      case 'bankAddress': {
        validatorsArr = [Validators.maxLength(255)];
        break;
      }
      case 'micrCode': {
        validatorsArr = [Validators.pattern('[0-9]{9}')];
        break;
      }
      case 'accountNumber': {
        validatorsArr = [Validators.required, Validators.pattern('^\\d{9,18}$')];
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
        validatorsArr = [Validators.maxLength(60)];
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
      case 'dobFamily': {
        validatorsArr = [];
        break;
      }
      case 'relation': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'profession': {
        validatorsArr = [];
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

    }
    return validatorsArr;
  }

}

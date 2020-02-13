import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationService } from './validation.service';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClaimValidationService {

  constructor(private http: HttpClient) { }

  callifscCodeBankApi(ifscCodeBank: string) {
    return this.http.get('https://ifsc.razorpay.com/' + ifscCodeBank);
  }

  createValidatorsArray(key: string) {
    let validatorsArr = [];
    switch (key) {

      case 'verifyDocumentCheck': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('true')
        ];
        break;
      }


      case 'firCertificate': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'benefitType': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      // CLAIM MAIN FORM
      case 'registration_no': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'registrationDatePersonal': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'selfDeclaration': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'renewalDate': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'firstNamePersonal': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[A-Za-z]+$')
        ];
        break;
      }
      case 'middleNamePersonal': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[A-Za-z]+$')
        ];
        break;
      }
      case 'lastNamePersonal': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[A-Za-z]+$')
        ];
        break;
      }
      case 'mobilePersonal': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[6789]\\d{9}$')

        ];
        break;
      }
      case 'maritalStatusPersonal': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'selectScheme': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'selectSchemeCategory': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      // **********************************************************************************

      // FINANCIAL VALIDATIONS
      case 'issuerType': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'issuingAuthority': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }


      case 'placeOfDeath': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(200),

        ];
        break;
      }

      case 'dateOfFir': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'FIRNo': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(20)
        ];
        break;
      }
      case 'policeStationAdd': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(200)
        ];
        break;
      }
      case 'deathCertificateNo': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(10)
        ];
        break;
      }
      case 'nomineeMobNumber': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('(0/91)?[6-9][0-9]{9}')

        ];
        break;
      }
      case 'spouseMobNumber': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('(0/91)?[6-9][0-9]{9}')

        ];
        break;
      }

      case 'currentDate': {
        validatorsArr = [Validators.required
        ];
        break;
      }


      case 'deathDate': {
        validatorsArr = [Validators.required,]
        break;
      }


      case 'declaration': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('true')
        ];
        break;
      }
      case 'placeOfDocIssue': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),

        ];
        break;
      }
      case 'deathCertificateIssueDate': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'today': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'date': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'startDate': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'endDate': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'fullName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(240),
        ];
        break;
      }
      case 'dobPersonal': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'agePersonal': {
        validatorsArr = [Validators.required];
        break;
      }
      case 'relation': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(50),

        ];
        break;
      }
      case 'profession': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z]+$'),
        ];
        break;
      }
      case 'aadharNumber': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(12),
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$'),
        ];
        break;
      }

      case 'rationCardType': {
        validatorsArr = [Validators.required];
        break;
      }

      case 'typeOfIllness': {
        validatorsArr = [Validators.required];
        break;
      }



      case 'rationCardNumber': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(8),
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$'),
        ];
        break;
      }

      case 'birthCertificateNumber': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[A-Z0-9\/-]*$'),

        ];
        break;
      }

      case 'education': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(50),

        ];
        break;
      }
      case 'ifscCodeBank': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'bankNameBank': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'bankBranchBank': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),

        ];
        break;
      }
      case 'bankAddressBank': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(200),

        ];
        break;
      }
      case 'accountNumberBank': {
        validatorsArr = [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(18)
        ];
        break;
      }
      case 'deathCertificateDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'proofOfDeathDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'scannedPassbookDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'aadharCardDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'marregePhoto': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }


      case 'amtOfLoan': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(8)
        ];
        break;
      }
      case 'insAmt': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(6)
        ];
        break;
      }
      case 'insCompName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),

        ];
        break;
      }
      case 'commenceDate': {
        validatorsArr = [
          Validators.required

        ];
        break;
      }
      case 'loanDate': {
        validatorsArr = [
          Validators.required

        ];
        break;
      }
      case 'loanPeriod': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(3),

        ];
        break;
      }
      case 'insuranceNo': {
        validatorsArr = [
          Validators.required

        ];
        break;
      }

      case 'nameOfOfficer': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),


        ];
        break;
      }
      case 'designation': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[A-Za-z]+$'),


        ];
        break;
      }
      case 'placeOfOffice': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),


        ];
        break;
      }
      case 'docName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[A-Za-z]+$'),

        ];
        break;
      }

      case 'proofOfLoan': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'pmAwaasCertificate': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'proofOfHouse': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'proofOfNoHouse': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      // *******************************************************************************************

      // EDUCATIONAL VALIDATIONS
      case 'childrenDetail': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }

      case 'certificates': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }

      // case 'receipt': {
      //   validatorsArr = [
      //     Validators.required,
      //   ];
      //   break;
      // }

      case 'admission': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      // case 'bookReceipt': {
      //   validatorsArr = [
      //     Validators.required
      //   ];
      //   break;
      // }

      case 'fileSelect': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'schoolIdDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'bonafideDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'school': {
        validatorsArr = [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(120),
          Validators.pattern('^[a-zA-Z_ ]*$')
        ];
        break;
      }

      case 'year': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$'),
          Validators.minLength(4),
          Validators.maxLength(4)
        ];
        break;
      }

      case 'yearOFDegree': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'dateOfAdmission': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'standard': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }

      case 'placeSchool': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(240),
        ];
        break;
      }

      case 'boardOfEducation': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^[a-zA-Z_ ]*$'),
          Validators.minLength(3),
          Validators.maxLength(200)
        ];
        break;
      }

      case 'seatNumber': {
        validatorsArr = [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern('^([a-zA-Z0-9_\s\-]*)$'),
        ];
        break;
      }

      case 'totalMarks': {
        validatorsArr = [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(4),
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')
        ];
        break;
      }

      case 'marksObtained': {
        validatorsArr = [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(4),
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')
        ];
        break;
      }

      case 'percentage': {
        validatorsArr = [
          Validators.maxLength(5),
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')
        ];
        break;
      }

      case 'college': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^([a-zA-Z_ ]*)$'),
          Validators.minLength(3),
          Validators.maxLength(240),
        ];
        break;
      }

      case 'placeCollege': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(240),
        ];
        break;
      }

      case 'institute': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^[a-zA-Z_ ]*$'),
          Validators.minLength(3),
          Validators.maxLength(120),
        ];
        break;
      }

      case 'placeInstitute': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(240),
        ];
        break;
      }

      case 'insPhNo': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(11),
        ];
        break;
      }

      case 'insEmail': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'),
          Validators.maxLength(150),
        ];
        break;
      }

      case 'regNoInstitute': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9_\s\-]*)$'),
        ];
        break;
      }

      case 'regAuthName': {
        validatorsArr = [
          Validators.required,
          Validators.pattern('^([a-zA-Z_ ]*)$'),
        ];
        break;
      }

      case 'familyRelation': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'attendanceCertificate': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'age': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'category': {
        validatorsArr = [];
        break;
      }

      case 'degreeName': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }

      case 'courseFee': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(4),
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')
        ];
        break;
      }

      // *********************************************************************************************



      // HEALTH VALIDATIONS
      case 'billAmount': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*\.?[0-9]{0,2}$')
        ];
        break;
      }

      case 'birthCertificateIssuedBy': {
        validatorsArr = [Validators.required];
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')
        break;
      }

      case 'firstNamePersonal': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[A-Za-z]+$')
        ];
        break;
      }
      case 'lastNamePersonal': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[A-Za-z]+$')

        ];
        break;
      }
      case 'dobPersonalHealth': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'dateOfDeliveryHealth': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'dischargeSum': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'panchnamaDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'typeOfDelivery': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'familyDetail': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'addressOfDelivery': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'nameOfHospital': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(240),
          Validators.pattern('^[a-zA-Z0-9 ]*$'),
          // Validators.pattern('[^0-9]+$')
        ];
        break;
      }
      case 'nameOfCertificateIssuer': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(240),
          Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')
        ];
        break;
      }
      case 'nameOfDoctor': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')
        ];
        break;
      }
      case 'typeOfDisability': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')
        ];
        break;
      }
      case 'nameOfAddiction': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')
        ];
        break;
      }
      case 'locationOfHospital': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          // Validators.pattern('^[a-zA-Z0-9 ]*$'),
        ];
        break;
      }
      case 'dateOfOp': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'nameOfMed': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')
        ];
        break;
      }
      case 'health3Form3Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'health3Form3Doc2': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'health4Form4Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'health4Form4Doc2': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'health6Form6Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'rationCardDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'rationCardNumberPersonal': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'rationCardTypePersonal': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'date': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case ' dateOfTreatment': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }



      case 'selectMaternityPlace': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'rehab': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(240),

        ];
        break;
      }
      case 'health1Form1Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'health2Form2Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'health2Form2Doc2': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'genderPersonal': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      // SOCIAL VALIDATIONS

      case 'dateOfMar': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'dateOfMarReg': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'marRegPlace': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120)

        ];
        break;
      }
      case 'marRegDocNo': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(20),
        ];
        break;
      }
      case 'fullNameSpouse': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(40),
        ];
        break;
      }
      case 'dobSpouse': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'ageSpouse': {
        validatorsArr = [
          Validators.required,
        ];
        break;
      }
      case 'relationSpouse': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'professionSpouse': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern('^[A-Za-z]+$'),
        ];
        break;
      }
      case 'educationSpouse': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }

      case 'husbandName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'wifeName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'childName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'schoolName': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'schoolLocation': {
        validatorsArr = [
          Validators.required,
          Validators.maxLength(120),
        ];
        break;
      }
      case 'standard': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'aadharNoPersonal': {
        validatorsArr = [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12)
        ];
        break;
      }
      case 'marriageDocNo': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'relationSelect': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm1Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm2Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm2Doc2': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm3Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm4Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

      case 'socialForm5Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm6Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm7Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm8Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'socialForm9Doc1': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }
      case 'aadharCardDoc': {
        validatorsArr = [
          Validators.required
        ];
        break;
      }

    }
    return validatorsArr;
  }
}


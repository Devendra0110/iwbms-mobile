import * as moment from 'moment';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ClaimValidationService } from 'src/app/services/claim-validation.service';
import { TransliterationService } from 'src/app/services/transliteration.service';
import { HttpService } from 'src/app/services/http.service';
import { ClaimService } from 'src/app/services/claim.service';
import { ClaimBasePage } from '../../../claim-base/claim-form.baseclass';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-claim-social1',
  templateUrl: './claim-social1.page.html',
  styleUrls: ['./claim-social1.page.scss'],
})
export class ClaimSocial1Page extends ClaimBasePage implements OnInit {

  public formGroup: FormGroup;
  public getFile: boolean;
  public marrageMinDate: string;
  public endDateFordobPersonal: any;
  public startDateFordobPersonal: any;
  public spouseDetails: any;
  public sysDate: string;
  public uploadedSocialForm2Doc1Url: string;
  public uploadedSocialForm2Doc2Url: string;
  public uploadedSelfDeclarationUrl: string;
  public uploadedAadharCardDocUrl: string;

  constructor(
    protected validationService: ClaimValidationService,
    protected transliterate: TransliterationService,
    protected httpService: HttpService,
    protected claimService: ClaimService,
    protected router: Router,
    protected storage: Storage,
    protected toast: Toast,
    protected dialogs: Dialogs
  ) {
    super(transliterate, httpService, claimService, router, storage, toast, dialogs);
    this.fileOptions = { socialForm2Doc1: '', socialForm2Doc2: '', selfDeclaration: '', aadharCardDoc: '' };
    this.files = { socialForm2Doc1: '', socialForm2Doc2: '', selfDeclaration: '', aadharCardDoc: '' };
    this.formGroup = new FormGroup({
      dateOfMar: new FormControl('', this.validationService.createValidatorsArray('dateOfMar')),
      dateOfMarReg: new FormControl('', this.validationService.createValidatorsArray('dateOfMarReg')),
      marRegPlace: new FormControl('', this.validationService.createValidatorsArray('marRegPlace')),
      marRegDocNo: new FormControl('', this.validationService.createValidatorsArray('marRegDocNo')),
      fullNameSpouse: new FormControl('', this.validationService.createValidatorsArray('fullNameSpouse')),
      dobSpouse: new FormControl('', this.validationService.createValidatorsArray('dobSpouse')),
      ageSpouse: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
      relationSpouse: new FormControl('', this.validationService.createValidatorsArray('relationSpouse')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      socialForm2Doc1: new FormControl('', this.validationService.createValidatorsArray('socialForm2Doc1')),
      socialForm2Doc2: new FormControl('', this.validationService.createValidatorsArray('socialForm2Doc2')),
      // declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      // marregePhoto: new FormControl('', this.validationService.createValidatorsArray('marregePhoto')),
      marRegPlace_mr: new FormControl('', this.validationService.createValidatorsArray('marRegPlace_mr')),
      fullNameSpouse_mr: new FormControl('', this.validationService.createValidatorsArray('fullNameSpouse_mr')),
      relationSpouse_mr: new FormControl('', this.validationService.createValidatorsArray('relationSpouse_mr')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck')),
    });
  }

  ngOnInit() {
    this.assignBenefits(true);
    this.sysDate = this.changeToIonDateTime(0, 'years')
    this.marrageMinDate = this.changeToIonDateTime(5, 'years');
    this.startDateFordobPersonal = this.changeToIonDateTime(18, 'years');
    this.endDateFordobPersonal = this.changeToIonDateTime(60, 'years');
    this.getRelationWithoutSubscribe().subscribe((data: any) => {
      this.getRelationArray = data;
      this.relationSpouse.patchValue(Number(this.spouseDetails.relation));
    });
    this.getEducation();
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.spouseDetails = this.familyDetailsArray.find((eachFamily: any) => eachFamily.category === 'spouse');
    this.dobSpouse.patchValue(moment(this.spouseDetails.dobFamily).format('YYYY-MM-DD'));
    this.fullNameSpouse.patchValue(`${this.spouseDetails.firstNameFamily} ${this.spouseDetails.surname}`)
    this.fullNameSpouse_mr.patchValue(`${this.spouseDetails.firstNameFamily_mr} ${this.spouseDetails.surname_mr}`)
    this.aadharNumber.patchValue(`${this.spouseDetails.aadharNoFamily}`)
    this.calculateAgePersonal();
    this.fullNameSpouse.disable();
    this.fullNameSpouse_mr.disable();
    this.aadharNumber.disable();
    this.dobSpouse.disable();
    this.relationSpouse.disable();
    this.dateReg = moment(this.user.registrationDatePersonal).format('YYYY-MM-DD');
  }

  calculateAgePersonal() {
    const age = this.calculateAge(this.dobSpouse.value)
    if (age > 18 && age < 100) {
      this.ageSpouse.patchValue(age);
      this.ageSpouse.disable();
    } else {
      // this.dialogs.
      alert('Applicant age should be greater than 18 and less than 60')
      this.dobSpouse.get('ageSpouse').setValue('');
      this.dobSpouse.get('dobSpouse').setValue('');
    }
  }

  public saveFormS01(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if (typeof this.user.registrationDatePersonal === 'string' && typeof this.user.dobPersonal === 'string') {
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,
        claimData: {
          dateOfMar: this.formGroup.getRawValue().dateOfMar,
          dateOfMarReg: this.formGroup.getRawValue().dateOfMarReg,
          marRegPlace: this.formGroup.getRawValue().marRegPlace,
          marRegDocNo: this.formGroup.getRawValue().marRegDocNo,
          fullNameSpouse: this.formGroup.getRawValue().fullNameSpouse,
          dobSpouse: this.formGroup.getRawValue().dobSpouse,
          ageSpouse: this.formGroup.getRawValue().ageSpouse,
          relationSpouse: this.formGroup.getRawValue().relationSpouse,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          marRegPlace_mr: this.formGroup.getRawValue().marRegPlace_mr,
          fullNameSpouse_mr: this.formGroup.getRawValue().fullNameSpouse_mr,
          benefitType: this.benefitType.value,
          benefitAmount: this.benefitAmount.value,
          documents: {
            socialForm2Doc1: this.fileOptions['socialForm2Doc1'],
            socialForm2Doc2: this.fileOptions['socialForm2Doc2'],
            // marregePhoto : this.fileOptions['marregePhoto'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            aadharCardDoc: this.fileOptions['aadharCardDoc'],
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {
      this.formGroup.markAllAsTouched();

      this.dialogs.alert('Please Update the form.');

    }
  }


  get dateOfMar() { return this.formGroup.get('dateOfMar'); }
  get dateOfMarReg() { return this.formGroup.get('dateOfMarReg'); }
  get marRegPlace() { return this.formGroup.get('marRegPlace'); }
  get marRegDocNo() { return this.formGroup.get('marRegDocNo'); }
  get fullNameSpouse() { return this.formGroup.get('fullNameSpouse'); }
  get dobSpouse() { return this.formGroup.get('dobSpouse'); }
  get ageSpouse() { return this.formGroup.get('ageSpouse'); }
  get relationSpouse() { return this.formGroup.get('relationSpouse'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get socialForm2Doc1() { return this.formGroup.get('socialForm2Doc1'); }
  get socialForm2Doc2() { return this.formGroup.get('socialForm2Doc2'); }
  // get declaration() { return this.formGroup.get('declaration'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  // get marregePhoto() { return this.formGroup.get('marregePhoto'); }
  get marRegPlace_mr() { return this.formGroup.get('marRegPlace_mr'); }
  get fullNameSpouse_mr() { return this.formGroup.get('fullNameSpouse_mr'); }
  get professionSpouse_mr() { return this.formGroup.get('professionSpouse_mr'); }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }


}

import * as moment from 'moment';
import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
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
  selector: 'app-claim-social3',
  templateUrl: './claim-social3.page.html',
  styleUrls: ['./claim-social3.page.scss'],
})
export class ClaimSocial3Page extends ClaimBasePage implements OnInit {

  public uploadedSocialForm4Doc1Url: string;
  // public uploadedSelfDeclarationUrl: string;
  public childArray: Array<any> = [];
  public uploadedAadharCardDocUrl: string;
  public getFile: boolean;

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
    this.childArray = [];
    this.fileOptions = { socialForm4Doc1: '', aadharCardDoc: '' };
    this.files = { socialForm4Doc1: '', aadharCardDoc: '' };

    this.formGroup = new FormGroup({

      childName: new FormControl('', this.validationService.createValidatorsArray('childName')),
      standard: new FormControl('', this.validationService.createValidatorsArray('standard')),
      schoolName: new FormControl('', this.validationService.createValidatorsArray('schoolName')),
      schoolLocation: new FormControl('', this.validationService.createValidatorsArray('schoolLocation')),
      aadharNumber: new FormControl('', this.validationService.createValidatorsArray('aadharNumber')),
      socialForm4Doc1: new FormControl('', this.validationService.createValidatorsArray('socialForm4Doc1')),
      selfDeclaration: new FormControl('', this.validationService.createValidatorsArray('selfDeclaration')),
      aadharCardDoc: new FormControl('', this.validationService.createValidatorsArray('aadharCardDoc')),
      //declaration: new FormControl('', this.validationService.createValidatorsArray('declaration')),
      // socialForm4Doc2: new FormControl('', this.validationService.createValidatorsArray('socialForm4Doc2')),
      childName_mr: new FormControl('', this.validationService.createValidatorsArray('childName_mr')),
      schoolName_mr: new FormControl('', this.validationService.createValidatorsArray('schoolName_mr')),
      schoolLocation_mr: new FormControl('', this.validationService.createValidatorsArray('schoolLocation_mr')),
      benefitType: new FormControl('', this.validationService.createValidatorsArray('benefitType')),
      benefitAmount: new FormControl(''),
      verifyDocumentCheck: new FormControl('', this.validationService.createValidatorsArray('verifyDocumentCheck'))

    })
   }

  ngOnInit() {
    this.assignBenefits(true);
    this.getEducation().subscribe((data: any[]) => {
      this.getEducationArray = data.filter(edu => edu.education_level_id < 20);
    });
    this.familyDetailsArray = JSON.parse(this.familyDetailsArray);
    this.childArray = this.familyDetailsArray.filter((eachFamily: any) => {
      if (eachFamily.category === 'children') {
        return eachFamily;
      }
    });
    this.childArray = _.reverse(_.sortBy(this.childArray, 'ageFamily'));
    this.childName.valueChanges.subscribe(value => {
      const childSelected = this.childArray.find((child: any) => child.firstNameFamily === value)
      this.childName_mr.patchValue(childSelected.firstNameFamily_mr);
      this.aadharNumber.patchValue(childSelected.aadharNoFamily);
      this.aadharNumber.disable();
    })
  }

  public saveFormS03(): void {
    if (this.formGroup.valid && this.user['eligibilityForScheme']) {
      if (typeof this.user.registrationDatePersonal === 'string' && typeof this.user.dobPersonal === 'string') {
        this.user.registrationDatePersonal = this.convertDateToNGBDateFormat(this.user.registrationDatePersonal)
        this.user.dobPersonal = this.convertDateToNGBDateFormat(this.user.dobPersonal)
      }
      const postObj = {
        userData: this.user,
        claimData: {
          childName: this.formGroup.getRawValue().childName,
          standard: this.formGroup.getRawValue().standard,
          schoolName: this.formGroup.getRawValue().schoolName,
          schoolLocation: this.formGroup.getRawValue().schoolLocation,
          childName_mr: this.formGroup.getRawValue().childName_mr,
          schoolName_mr: this.formGroup.getRawValue().schoolName_mr,
          schoolLocation_mr: this.formGroup.getRawValue().schoolLocation_mr,
          aadharNumber: this.formGroup.getRawValue().aadharNumber,
          benefitType: this.benefitType.value,

          documents: {
            socialForm4Doc1: this.fileOptions['socialForm4Doc1'],
            selfDeclaration: this.fileOptions['selfDeclaration'],
            aadharCardDoc: this.fileOptions['aadharCardDoc']
          }
        }
      };
      this.saveClaimForm(postObj);
    } else {
      this.formGroup.markAllAsTouched();

     // this.dialogs.
     this.dialogs.alert('Please Update the form.');

    }
  }

  get childName() { return this.formGroup.get('childName'); }
  get childName_mr() { return this.formGroup.get('childName_mr'); }
  get standard() { return this.formGroup.get('standard'); }
  get schoolName() { return this.formGroup.get('schoolName'); }
  get schoolName_mr() { return this.formGroup.get('schoolName_mr'); }
  get schoolLocation() { return this.formGroup.get('schoolLocation'); }
  get aadharNumber() { return this.formGroup.get('aadharNumber'); }
  get schoolLocation_mr() { return this.formGroup.get('schoolLocation_mr'); }
  get socialForm4Doc1() { return this.formGroup.get('socialForm4Doc1'); }
  get selfDeclaration() { return this.formGroup.get('selfDeclaration'); }
  get aadharCardDoc() { return this.formGroup.get('aadharCardDoc'); }
  get verifyDocumentCheck() { return this.formGroup.get('verifyDocumentCheck'); }
  get declaration() { return this.formGroup.get('declaration'); }
  //  get socialForm4Doc2() { return this.formGroup.get('socialForm4Doc2'); }


}

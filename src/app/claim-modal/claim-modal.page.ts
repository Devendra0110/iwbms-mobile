import * as moment from 'moment'
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ClaimService } from '../services/claim.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-claim-modal',
  templateUrl: './claim-modal.page.html',
  styleUrls: ['./claim-modal.page.scss'],
})
export class ClaimModalPage implements OnInit {

  @Input()
  public modalData;
  public formResponse = {
    formState: '',
    formData: null
  };
  public minFromDate: string;
  public maxFromDate: string;
  public pastClaimFormGroup: FormGroup;
  public addFlag: boolean;
  public JWTToken: any;
  public schemeCategories: any;
  public schemes: any;
  public filteredSchemes: any;

  constructor(private claimsService: ClaimService,
    private storage: Storage,
    private mdlController: ModalController,
    private dialogs: Dialogs,
  ) {
    this.addFlag = true;
    this.filteredSchemes = {};
    this.storage.get('token').then((val) => {
      this.JWTToken = val;
      this.getClaimCategories();
      this.getSchemes();
    });
    this.pastClaimFormGroup = new FormGroup({
      schemeCategory: new FormControl(null, [Validators.required]),
      schemeName: new FormControl('', [Validators.required]),
      claimDate: new FormControl(null, [Validators.required]),
      benefitType: new FormControl('', [Validators.required]),
      benefitAmount: new FormControl('')
    });
  }
    
  ngOnInit() {
    if (this.modalData.mode === 'update') {
      this.pastClaimFormGroup.patchValue(this.modalData.claimReceipt.getRawValue());
      this.formResponse.formData = this.modalData.claimReceipt
      this.addFlag = false
    }
    this.minFromDate = this.modalData.fromDate;
    this.maxFromDate = moment().format('YYYY-MM-DD')
  }

  getClaimCategories() {
    this.claimsService.getSchemeCat(this.JWTToken).subscribe(
      (res: any) => {
        this.schemeCategories = res;
      },
      error => console.log(error)
    );
  }

  getSchemes() {
    this.claimsService.getSchemeDetail(this.JWTToken).subscribe(
      (res: any) => {
        this.schemes = res;
      },
      error => console.log(error)
    );
  }

  filterSchemesForCategory(event: any, index: number) {
    const value = parseInt(event.target.value);
    const filteredValues = this.schemes.filter((eachSchemeObj: any) => {
      if (eachSchemeObj.category_id === value) {
        return eachSchemeObj;
      }
    });
    this.filteredSchemes[index] = filteredValues;
  }

  async dismissModal() {
    if (this.modalData.mode === 'update') {
      this.formResponse.formState = 'update';
      await this.mdlController.dismiss(this.formResponse);
    } else {
      this.formResponse.formState = 'delete';
      await this.mdlController.dismiss(this.formResponse);
    }
  }

  async saveModal() {
    if (this.pastClaimFormGroup.valid) {
      if (this.modalData.mode === 'update') {
        this.formResponse.formState = 'update';
        this.formResponse.formData = this.pastClaimFormGroup;
        await this.mdlController.dismiss(this.formResponse);
      } else {
        this.formResponse.formState = 'add';
        this.formResponse.formData = this.pastClaimFormGroup;
        await this.mdlController.dismiss(this.formResponse);
      }
    } else {
      this.pastClaimFormGroup.markAllAsTouched();
      this.dialogs.alert('Please fill all the details properly');
    }
  }

  get schemeCategory() { return this.pastClaimFormGroup.get('schemeCategory') }
  get schemeName() { return this.pastClaimFormGroup.get('schemeName') }
  get claimDate() { return this.pastClaimFormGroup.get('claimDate') }
  get benefitType() { return this.pastClaimFormGroup.get('benefitType') }
  get benefitAmount() { return this.pastClaimFormGroup.get('benefitAmount') }


}

import * as _ from 'lodash';
import * as moment from 'moment';

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { CashReceiptModalPage } from '../cash-receipt-modal/cash-receipt-modal.page';
import { ClaimModalPage } from '../claim-modal/claim-modal.page';
import { ClaimService } from '../services/claim.service';
import { ModalController, } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-yellow-book',
  templateUrl: './yellow-book.page.html',
  styleUrls: ['./yellow-book.page.scss'],
})
export class YellowBookPage implements OnInit {
  public yellowBookFormGroup: FormGroup;
  public schemeCategories: any;
  public schemes: any;
  public filteredSchemes: any;
  public todaysDate: any;
  public JWTToken:any;
  // public registrationDate: any;
  // @Input() registrationFormGroup: FormGroup;
  public registrationDate = '1993-10-31T13:04:17.092+05:30'
  public purpose = [
    { purpose: 'Registration' },
    { purpose: 'Renewal' }
  ];

  constructor(
    private claimsService:ClaimService,
    private storage:Storage,
    private mdlController: ModalController,) {
    this.filteredSchemes = {};
    this.storage.get('token').then((val) => {
      this.JWTToken = val;
      this.getClaimCategories();
      this.getSchemes();
    });
    this.yellowBookFormGroup = new FormGroup({
      cashReceiptEntries: new FormArray([this.cashReceiptFormGroup()]),
      schemeClaimsEntries: new FormArray([this.schemeClaimFormGroup()])
    });
  }
  

  ngOnInit() {
    // this.cashReceiptEntries.get('0').get('regOrRenewalDate').disable();
    // this.registrationFormGroup.valueChanges.subscribe((value) => {
    //   if (value.personalDetails) {
    //     if (value.personalDetails.registrationDatePersonal) {
    //       this.cashReceiptEntries.get('0').get('regOrRenewalDate').setValue(value.personalDetails.registrationDatePersonal);
    //       this.registrationDate = value.personalDetails.registrationDatePersonal
    //     }
    //   }
    // });
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
  
  
  public cashReceiptFormGroup(index?: number): FormGroup {
    return new FormGroup({
      cashReceiptDate: new FormControl(null, [Validators.required]),
      regOrRenewalDate: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      receiptNo: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(9)]),
      amount: new FormControl('', [Validators.required, Validators.max(85), Validators.min(0)])
    });
  }
  
  public schemeClaimFormGroup(): FormGroup {
    return new FormGroup({
      schemeCategory: new FormControl(null, [Validators.required]),
      schemeName: new FormControl('', [Validators.required]),
      claimDate: new FormControl(null, [Validators.required]),
      benefitType: new FormControl('', [Validators.required]),
      benefitAmount: new FormControl('')
    });
  }
  
  public renewalFormGroup(): FormGroup {
    return new FormGroup({
      renewalDate: new FormControl(null, [Validators.required]),
      renewalCashDeposit: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      receiptNo: new FormControl('', [Validators.required, Validators.maxLength(12)])
    });
  }

  public addRenewalEntry(): void {
    const renewalEntries = this.yellowBookFormGroup.get('renewalEntries') as FormArray;
    renewalEntries.push(this.renewalFormGroup());
  }

  public addCashReceipt(): void {
    if (this.yellowBookFormGroup.get('cashReceiptEntries').invalid) {
      alert('Please flll all the essential details of previous cash receipt.')
    } else {
      const cashReceiptEntries = this.yellowBookFormGroup.get('cashReceiptEntries') as FormArray;
      this.showCashReceiptModal(cashReceiptEntries.length,'add')
    }
  }
  
  public addSchemeClaimEntry(): void {
    if (this.yellowBookFormGroup.get('schemeClaimsEntries').invalid){
      alert('Please flll all the essential details of previous claim receipt.')
    }else{
      const schemeClaimsEntries = this.yellowBookFormGroup.get('schemeClaimsEntries') as FormArray;
      this.showClaimModal(schemeClaimsEntries.length,'add')
    }
  }

  public editCashReceipt(i:number){
    this.showCashReceiptModal(i, 'update', this.yellowBookFormGroup.get('cashReceiptEntries').get(`${i}`))
  }

  public editClaimReceipt(i:number){
    this.showClaimModal(i, 'update', this.yellowBookFormGroup.get('schemeClaimsEntries').get(`${i}`))
  }

  async showCashReceiptModal(index: number, mode: string, receiptForm?: any){
    const receiptDetail = {
      index,
      mode,
      receipt: receiptForm,
      fromDate: index > 0 ? this.yellowBookFormGroup.get('cashReceiptEntries').get(`${index - 1}`).get('cashReceiptDate').value : this.registrationDate,
    };
    const cashReceiptModal = await this.mdlController.create({
      component: CashReceiptModalPage,
      componentProps: {
        modalData: receiptDetail
      }
    });
    const receiptDetailsArray = this.yellowBookFormGroup.get('cashReceiptEntries') as FormArray;
    await cashReceiptModal.present();
    cashReceiptModal.onDidDismiss()
      .then(res => {
        if (res.data.formState === 'add') {
          receiptDetailsArray.push(this.cashReceiptFormGroup());
          this.yellowBookFormGroup.get('cashReceiptEntries').get(`${index}`).patchValue(res.data.formData.value);
        } 
        else if (res.data.formState === 'delete') this.deleteCashReceiptEntry(index);
        else {
          this.yellowBookFormGroup.get('cashReceiptEntries').get(`${index}`).patchValue(res.data.formData.value);
        }
      }
      );
  }

  async showClaimModal(index: number, mode: string, claimReceiptForm?: any) {
    const claimReceiptDetail = {
      index,
      mode,
      claimReceipt: claimReceiptForm,
      fromDate: index > 0 ? this.yellowBookFormGroup.get('schemeClaimsEntries').get(`${index - 1}`).get('claimDate').value : this.yellowBookFormGroup.get('cashReceiptEntries').get(`${0}`).get('cashReceiptDate').value || moment(this.registrationDate).format('YYYY-MM-DD'),
    };
    const cashReceiptModal = await this.mdlController.create({
      component: ClaimModalPage,
      componentProps: {
        modalData: claimReceiptDetail
      }
    });
    const claimReceiptsArray = this.yellowBookFormGroup.get('schemeClaimsEntries') as FormArray;
    await cashReceiptModal.present();
    cashReceiptModal.onDidDismiss()
      .then(res => {
        if (res.data.formState === 'add') {
          claimReceiptsArray.push(this.schemeClaimFormGroup());
          this.yellowBookFormGroup.get('schemeClaimsEntries').get(`${index}`).patchValue(res.data.formData.value);
        }
        else if (res.data.formState === 'delete') this.deleteSchemeClaimEntry(index);
        else {
          this.yellowBookFormGroup.get('schemeClaimsEntries').get(`${index}`).patchValue(res.data.formData.value);
        }
      }
      );
  }

  public deleteRenewalEntry(index: number): void {
    if(index===0) return;
    else{
      const renewalEntries = this.yellowBookFormGroup.get('renewalEntries') as FormArray;
      renewalEntries.removeAt(index);
    }
  }

  public deleteSchemeClaimEntry(index: number): void {
    if (index === 0) return;
    else {
      const schemeClaimsEntries = this.yellowBookFormGroup.get('schemeClaimsEntries') as FormArray;
      schemeClaimsEntries.removeAt(index);
    }
  }

  public deleteCashReceiptEntry(index: number): void {
    if (index === 0) return;
    else {
      const cashReceiptEntries = this.yellowBookFormGroup.get('cashReceiptEntries') as FormArray;
      cashReceiptEntries.removeAt(index);
    }
  }

  minFDate(i: number) {
    return i === 0 ? moment(this.registrationDate).format('YYYY-MM-DD') : this.yellowBookFormGroup.get('cashReceiptEntries').get((i - 1).toString()).get('regOrRenewalDate').value;
  }

  maxFDate(i: number) {
    return i === 0 ? moment(this.registrationDate).format('YYYY-MM-DD'):moment().format('YYYY-MM-DD');
  }

  minReceiptDate(i:number){
    return this.yellowBookFormGroup.get('cashReceiptEntries').get((i).toString()).get('regOrRenewalDate').value
  }

  maxReceiptDate(i:number){
    return moment().format('YYYY-MM-DD')
  }


  get renewalEntries() {
    return this.yellowBookFormGroup.get('renewalEntries');
  }

  get schemeClaimsEntries() {
    return this.yellowBookFormGroup.get('schemeClaimsEntries');
  }

  get cashReceiptEntries() {
    return this.yellowBookFormGroup.get('cashReceiptEntries');
  }
  
}

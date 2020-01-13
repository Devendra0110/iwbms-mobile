import * as _ from 'lodash';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators , FormArray } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-yellow-book',
  templateUrl: './yellow-book.page.html',
  styleUrls: ['./yellow-book.page.scss'],
})
export class YellowBookPage implements OnInit, OnChanges {
  public yellowBookFormGroup: FormGroup;
  public schemeCategories: any;
  public schemes: any;
  public filteredSchemes: any;
  public todaysDate: any;
  @Input() applicationMode: string;
  @Input() registrationDate: any;
  @Input() registrationFormGroup: FormGroup;
  public purpose = [
    { purpose: 'Registration' },
    { purpose: 'Renewal' }
  ];

  constructor() {
    this.filteredSchemes = {};
    this.yellowBookFormGroup = new FormGroup({
      cashReceiptEntries: new FormArray([this.cashReceiptFormGroup()]),
      // renewalEntries: new FormArray([this.renewalFormGroup()]),
      schemeClaimsEntries: new FormArray([this.schemeClaimFormGroup()])
    });
    this.getClaimCategories();
    this.getSchemes();

    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };

    this.cashReceiptEntries.get('0').get('purpose').setValue('Registration');

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

  ngOnInit() {
    this.cashReceiptEntries.get('0').get('regOrRenewalDate').disable();
    this.registrationFormGroup.valueChanges.subscribe((value) => {
      if(value.personalDetails) {
        if (value.personalDetails.registrationDatePersonal) {
          this.cashReceiptEntries.get('0').get('regOrRenewalDate').setValue(value.personalDetails.registrationDatePersonal);
        }
      }
    });
  }
  
  ngOnChanges(){

  }

  getClaimCategories() {
    this.claimsService.getSchemeCat().subscribe(
      (res: any) => {
        this.schemeCategories = res;
      },
      error => console.log(error)
    );
  }

  getSchemes() {
    this.claimsService.getSchemeDetail().subscribe(
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

  public renewalFormGroup(): FormGroup {
    return new FormGroup({
      renewalDate: new FormControl(null, [Validators.required]),
      // renewalForYears: new FormControl(''),
      // renewalAmount: new FormControl(''),
      renewalCashDeposit: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      receiptNo: new FormControl('', [Validators.required, Validators.maxLength(12)])
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

  public cashReceiptFormGroup(index?: number): FormGroup {
    // let purpose;
    // if (index === 0 ) {
    //     purpose = 'Registration';
    // } else {
    //   purpose = 'Renewal';
    // }
    return new FormGroup({
      cashReceiptDate: new FormControl(null, [Validators.required]),
      regOrRenewalDate: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      receiptNo: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(9)]),
      amount: new FormControl('', [Validators.required, Validators.max(85), Validators.min(0)])
      // subscription: new FormControl(''),
      // renewalAmount: new FormControl(''),
      // totalFee: new FormControl('')
    });
  }

  public addRenewalEntry(): void {
    const renewalEntries = this.yellowBookFormGroup.get('renewalEntries') as FormArray;
    renewalEntries.push(this.renewalFormGroup());
  }

  public addSchemeClaimEntry(): void {
    const schemeClaimsEntries = this.yellowBookFormGroup.get('schemeClaimsEntries') as FormArray;
    schemeClaimsEntries.push(this.schemeClaimFormGroup());
  }

  public addCashReceipt(): void {
    const cashReceiptEntries = this.yellowBookFormGroup.get('cashReceiptEntries') as FormArray;
    cashReceiptEntries.push(this.cashReceiptFormGroup());
  }

  public deleteRenewalEntry(index: number): void {
    const renewalEntries = this.yellowBookFormGroup.get('renewalEntries') as FormArray;
    renewalEntries.removeAt(index);
  }

  public deleteSchemeClaimEntry(index: number): void {
    const schemeClaimsEntries = this.yellowBookFormGroup.get('schemeClaimsEntries') as FormArray;
    schemeClaimsEntries.removeAt(index);
  }

  public deleteCashReceiptEntry(index: number): void {
    const cashReceiptEntries = this.yellowBookFormGroup.get('cashReceiptEntries') as FormArray;
    cashReceiptEntries.removeAt(index);
  }

  calculateRenewalAmount(event: any, index: number, formArray: string) {
    const value = event.target.value;
    const renewalFee = 12;
    let calculatedFee;
    switch (value) {
      case '1': {
        calculatedFee = renewalFee;
        break;
      }
      case '2': {
        calculatedFee = 2 * renewalFee;
        break;
      }
      case '3': {
        calculatedFee = 3 * renewalFee;
        break;
      }
      case '4': {
        calculatedFee = 4 * renewalFee;
        break;
      }
      case '5': {
        calculatedFee = 5 * renewalFee;
        break;
      }
    }
    if (formArray === 'Cash Receipt') {
      this.cashReceiptEntries.get(index.toString()).get('renewalAmount').setValue(calculatedFee);
    }
    if (formArray === 'Renewal') {
      this.renewalEntries.get(index.toString()).get('renewalAmount').setValue(calculatedFee);
    }
  }

  calculateTotalFeeForCashReceipt(index: number) {
    const cashReceiptObj = this.cashReceiptEntries.get(index.toString());
    const registrationFee = cashReceiptObj.get('registrationFee').value;
    const renewalFee = cashReceiptObj.get('renewalAmount').value;
    const totalFee = registrationFee + renewalFee;
    this.cashReceiptEntries.get(index.toString()).get('totalFee').setValue(totalFee);
  }

  minDate(index: number, type?: string) {
    // if (type === 'renewal') {
    //   const regDate = _.cloneDeep(this.registrationDate);
    //   // if (!regDate || regDate.year + index + 1 >= new Date().getFullYear()) {
    //   if (!regDate) {
    //     return {
    //       year: new Date().getFullYear(),
    //       month: new Date().getMonth() + 1,
    //       day: new Date().getDate()
    //     }
    //   }
    //   regDate.year = regDate.year + index + 1;
    //   return regDate;
    // } else if (type === 'registrationDate') {
    //   if (!this.registrationDate) {
    //     return {
    //       year: new Date().getFullYear(),
    //       month: new Date().getMonth() + 1,
    //       day: new Date().getDate()
    //     }
    //   }
    //   return this.registrationDate;
    // }
    // if (index === 0) {
    //   return {
    //     day: 1,
    //     month: 1,
    //     year: 2000
    //   };
    // } else {
    //   return {
    //     day: 1,
    //     month: 1,
    //     year: 2000
    //   };
    // }
    if (index === 0) {
      // return this.registrationDate;
    }
    else {
      const regAndRenewalDate = this.cashReceiptEntries.get((index - 1).toString()).get('regOrRenewalDate').value;
      const date = moment(new Date(
        regAndRenewalDate.year,
        regAndRenewalDate.month - 1,
        regAndRenewalDate.day
      )).add(1, 'y').add(1, 'd').format('DD/MM/YYYY');
      const splittedDate = date.split('/');
      return {
        year: Number(splittedDate[2]),
        month: Number(splittedDate[1]),
        day: Number(splittedDate[0])
      };
    }
  }

}

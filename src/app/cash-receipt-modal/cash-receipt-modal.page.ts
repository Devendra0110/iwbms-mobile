import * as moment from 'moment'
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-cash-receipt-modal',
  templateUrl: './cash-receipt-modal.page.html',
  styleUrls: ['./cash-receipt-modal.page.scss'],
})
export class CashReceiptModalPage implements OnInit {

  @Input()
  public modalData;
  public formResponse = {
    formState: '',
    formData: null
  };
  public cashReceiptFormGroup: FormGroup;
  public addFlag: boolean;
  public minFromDate:string;
  public maxFromDate:string;
  public maxToDate:string;
  constructor(
    private mdlController: ModalController,
    private dialogs: Dialogs,
  ) { 
    this.addFlag = true;
    this.cashReceiptFormGroup = new FormGroup({
      cashReceiptDate: new FormControl(null, [Validators.required]),
      regOrRenewalDate: new FormControl(null, [Validators.required]),
      purpose: new FormControl(null, [Validators.required]),
      receiptNo: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(9)]),
      amount: new FormControl('', [Validators.required, Validators.max(85), Validators.min(0)])
    });
  }

  ngOnInit() {
    if (this.modalData.mode === 'update') {
      this.cashReceiptFormGroup.patchValue(this.modalData.receipt.getRawValue());
      this.formResponse.formData = this.modalData.receipt
      this.addFlag = false
    }
    this.minFromDate = this.modalData.fromDate;
    this.maxFromDate = this.modalData.index === 0 ? this.modalData.fromDate : moment().format('YYYY-MM-DD')
    this.maxToDate = moment().format('YYYY-MM-DD')
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
    if (this.cashReceiptFormGroup.valid) {
      if (this.modalData.mode === 'update') {
        this.formResponse.formState = 'update';
        this.formResponse.formData = this.cashReceiptFormGroup;
        await this.mdlController.dismiss(this.formResponse);
      } else {
        this.formResponse.formState = 'add';
        this.formResponse.formData = this.cashReceiptFormGroup;
        await this.mdlController.dismiss(this.formResponse);
      }
    } else {
      this.cashReceiptFormGroup.markAllAsTouched();
      this.dialogs.alert('Please fill all the details properly');
    }
  }

  get cashReceiptDate() { return this.cashReceiptFormGroup.get('cashReceiptDate')}
  get regOrRenewalDate() { return this.cashReceiptFormGroup.get('regOrRenewalDate') }
  get purpose() { return this.cashReceiptFormGroup.get('purpose') }
  get receiptNo() { return this.cashReceiptFormGroup.get('receiptNo') }
  get amount() { return this.cashReceiptFormGroup.get('amount') }

}

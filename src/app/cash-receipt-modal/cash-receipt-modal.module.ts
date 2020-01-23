import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashReceiptModalPage } from './cash-receipt-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CashReceiptModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashReceiptModalPage],
  entryComponents:[CashReceiptModalPage],
  exports:[CashReceiptModalPage]
})
export class CashReceiptModalPageModule {}

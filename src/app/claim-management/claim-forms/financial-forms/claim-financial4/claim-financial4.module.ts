import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimFinancial4Page } from './claim-financial4.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimFinancial4Page
  }
];

@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ClaimFinancial4PageModule {}

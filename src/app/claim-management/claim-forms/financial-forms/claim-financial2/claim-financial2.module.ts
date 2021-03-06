import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimFinancial2Page } from './claim-financial2.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimFinancial2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ClaimFinancial2PageModule {}

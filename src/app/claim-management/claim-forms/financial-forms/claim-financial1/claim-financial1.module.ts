import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimFinancial1Page } from './claim-financial1.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimFinancial1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ClaimFinancial1PageModule { }

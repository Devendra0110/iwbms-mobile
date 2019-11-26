import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimFinancial5Page } from './claim-financial5.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimFinancial5Page
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
export class ClaimFinancial5PageModule { }

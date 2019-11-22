import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimFinancial1Page]
})
export class ClaimFinancial1PageModule {}

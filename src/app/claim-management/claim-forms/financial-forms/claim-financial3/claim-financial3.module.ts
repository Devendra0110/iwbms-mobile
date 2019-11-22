import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimFinancial3Page } from './claim-financial3.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimFinancial3Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimFinancial3Page]
})
export class ClaimFinancial3PageModule {}

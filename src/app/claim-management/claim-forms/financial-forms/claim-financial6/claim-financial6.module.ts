import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimFinancial6Page } from './claim-financial6.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimFinancial6Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimFinancial6Page]
})
export class ClaimFinancial6PageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimFinancial5Page]
})
export class ClaimFinancial5PageModule {}

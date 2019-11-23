import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimSocial1Page } from '../claim-forms/social-forms/claim-social1/claim-social1.page';
import { ClaimMainFormPage } from './claim-main-form.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimMainFormPage
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
  declarations: [ClaimSocial1Page, ClaimMainFormPage],
})
export class ClaimMainFormPageModule {}

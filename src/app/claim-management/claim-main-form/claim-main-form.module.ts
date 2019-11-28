import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ClaimEducation1Page } from './../claim-forms/educational-forms/claim-education1/claim-education1.page';
import { ClaimEducation2Page } from './../claim-forms/educational-forms/claim-education2/claim-education2.page';
import { ClaimEducation3Page } from './../claim-forms/educational-forms/claim-education3/claim-education3.page';
import { ClaimEducation4Page } from './../claim-forms/educational-forms/claim-education4/claim-education4.page';
import { ClaimEducation5Page } from './../claim-forms/educational-forms/claim-education5/claim-education5.page';
import { ClaimEducation6Page } from './../claim-forms/educational-forms/claim-education6/claim-education6.page';
import { ClaimEducation7Page } from './../claim-forms/educational-forms/claim-education7/claim-education7.page';
import { ClaimFinancial1Page } from './../claim-forms/financial-forms/claim-financial1/claim-financial1.page';
import { ClaimFinancial2Page } from './../claim-forms/financial-forms/claim-financial2/claim-financial2.page';
import { ClaimFinancial3Page } from './../claim-forms/financial-forms/claim-financial3/claim-financial3.page';
import { ClaimFinancial4Page } from './../claim-forms/financial-forms/claim-financial4/claim-financial4.page';
import { ClaimFinancial5Page } from './../claim-forms/financial-forms/claim-financial5/claim-financial5.page';
import { ClaimFinancial6Page } from './../claim-forms/financial-forms/claim-financial6/claim-financial6.page';
import { ClaimHealth1Page } from './../claim-forms/health-forms/claim-health1/claim-health1.page';
import { ClaimHealth2Page } from './../claim-forms/health-forms/claim-health2/claim-health2.page';
import { ClaimHealth3Page } from './../claim-forms/health-forms/claim-health3/claim-health3.page';
import { ClaimHealth4Page } from './../claim-forms/health-forms/claim-health4/claim-health4.page';
import { ClaimHealth5Page } from './../claim-forms/health-forms/claim-health5/claim-health5.page';
import { ClaimMainFormPage } from './claim-main-form.page';
import { ClaimSocial1Page } from '../claim-forms/social-forms/claim-social1/claim-social1.page';
import { ClaimSocial2Page } from './../claim-forms/social-forms/claim-social2/claim-social2.page';
import { ClaimSocial3Page } from './../claim-forms/social-forms/claim-social3/claim-social3.page';
import { ClaimSocial4Page } from './../claim-forms/social-forms/claim-social4/claim-social4.page';
import { ClaimSocial5Page } from './../claim-forms/social-forms/claim-social5/claim-social5.page';
import { ClaimSocial6Page } from './../claim-forms/social-forms/claim-social6/claim-social6.page';
import { ClaimSocial7Page } from './../claim-forms/social-forms/claim-social7/claim-social7.page';
import { ClaimSocial8Page } from './../claim-forms/social-forms/claim-social8/claim-social8.page';
import { ClaimSocial9Page } from './../claim-forms/social-forms/claim-social9/claim-social9.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

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
    RouterModule.forChild(routes),
  ],
  declarations: [
    ClaimMainFormPage,

    ClaimEducation1Page,
    ClaimEducation2Page,
    ClaimEducation3Page,
    ClaimEducation4Page,
    ClaimEducation5Page,
    ClaimEducation6Page,
    ClaimEducation7Page,

    ClaimSocial1Page,
    // ClaimSocial2Page,
    ClaimSocial3Page,
    ClaimSocial4Page,
    ClaimSocial5Page,
    ClaimSocial6Page,
    // ClaimSocial7Page,
    // ClaimSocial8Page,
    // ClaimSocial9Page,

    ClaimFinancial1Page,
    ClaimFinancial2Page,
    ClaimFinancial3Page,
    ClaimFinancial4Page,
    ClaimFinancial5Page,
    ClaimFinancial6Page,

    ClaimHealth1Page,
    ClaimHealth2Page,
    ClaimHealth3Page,
    ClaimHealth4Page,
    ClaimHealth5Page,

  ],
})
export class ClaimMainFormPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimManagementPage } from './claim-management.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimManagementPage,
    children: [
      {
        path: 'claim-main-form', loadChildren: () => import('./claim-main-form/claim-main-form.module').then(m => m.ClaimMainFormPageModule),
      },
      { path: 'claim-verification', loadChildren: './claim-verification/claim-verification.module#ClaimVerificationPageModule' },
      { path: 'claim-education1', loadChildren: './claim-forms/educational-forms/claim-education1/claim-education1.module#ClaimEducation1PageModule' },
      { path: 'claim-education2', loadChildren: './claim-forms/educational-forms/claim-education2/claim-education2.module#ClaimEducation2PageModule' },
      { path: 'claim-education3', loadChildren: './claim-forms/educational-forms/claim-education3/claim-education3.module#ClaimEducation3PageModule' },
      { path: 'claim-education4', loadChildren: './claim-forms/educational-forms/claim-education4/claim-education4.module#ClaimEducation4PageModule' },
      { path: 'claim-education5', loadChildren: './claim-forms/educational-forms/claim-education5/claim-education5.module#ClaimEducation5PageModule' },
      { path: 'claim-education6', loadChildren: './claim-forms/educational-forms/claim-education6/claim-education6.module#ClaimEducation6PageModule' },
      { path: 'claim-education7', loadChildren: './claim-forms/educational-forms/claim-education7/claim-education7.module#ClaimEducation7PageModule' },
      { path: 'claim-social1', loadChildren: './claim-forms/social-forms/claim-social1/claim-social1.module#ClaimSocial1PageModule' },
      { path: 'claim-social2', loadChildren: './claim-forms/social-forms/claim-social2/claim-social2.module#ClaimSocial2PageModule' },
      { path: 'claim-social3', loadChildren: './claim-forms/social-forms/claim-social3/claim-social3.module#ClaimSocial3PageModule' },
      { path: 'claim-social4', loadChildren: './claim-forms/social-forms/claim-social4/claim-social4.module#ClaimSocial4PageModule' },
      { path: 'claim-social5', loadChildren: './claim-forms/social-forms/claim-social5/claim-social5.module#ClaimSocial5PageModule' },
      { path: 'claim-social6', loadChildren: './claim-forms/social-forms/claim-social6/claim-social6.module#ClaimSocial6PageModule' },
      { path: 'claim-social7', loadChildren: './claim-forms/social-forms/claim-social7/claim-social7.module#ClaimSocial7PageModule' },
      { path: 'claim-social8', loadChildren: './claim-forms/social-forms/claim-social8/claim-social8.module#ClaimSocial8PageModule' },
      { path: 'claim-social9', loadChildren: './claim-forms/social-forms/claim-social9/claim-social9.module#ClaimSocial9PageModule' },
      { path: 'claim-financial1', loadChildren: './claim-forms/financial-forms/claim-financial1/claim-financial1.module#ClaimFinancial1PageModule' },
      { path: 'claim-financial2', loadChildren: './claim-forms/financial-forms/claim-financial2/claim-financial2.module#ClaimFinancial2PageModule' },
      { path: 'claim-financial3', loadChildren: './claim-forms/financial-forms/claim-financial3/claim-financial3.module#ClaimFinancial3PageModule' },
      { path: 'claim-financial4', loadChildren: './claim-forms/financial-forms/claim-financial4/claim-financial4.module#ClaimFinancial4PageModule' },
      { path: 'claim-financial5', loadChildren: './claim-forms/financial-forms/claim-financial5/claim-financial5.module#ClaimFinancial5PageModule' },
      { path: 'claim-financial6', loadChildren: './claim-forms/financial-forms/claim-financial6/claim-financial6.module#ClaimFinancial6PageModule' },
      { path: 'claim-health1', loadChildren: './claim-forms/health-forms/claim-health1/claim-health1.module#ClaimHealth1PageModule' },
      { path: 'claim-health2', loadChildren: './claim-forms/health-forms/claim-health2/claim-health2.module#ClaimHealth2PageModule' },
      { path: 'claim-health3', loadChildren: './claim-forms/health-forms/claim-health3/claim-health3.module#ClaimHealth3PageModule' },
      { path: 'claim-health4', loadChildren: './claim-forms/health-forms/claim-health4/claim-health4.module#ClaimHealth4PageModule' },
      { path: 'claim-health5', loadChildren: './claim-forms/health-forms/claim-health5/claim-health5.module#ClaimHealth5PageModule' },
      { path: 'claim-health6', loadChildren: './claim-forms/health-forms/claim-health6/claim-health6.module#ClaimHealth6PageModule' },

    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimManagementPage]
})
export class ClaimManagementPageModule {}

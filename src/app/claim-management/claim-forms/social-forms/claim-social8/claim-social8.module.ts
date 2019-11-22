import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimSocial8Page } from './claim-social8.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimSocial8Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimSocial8Page]
})
export class ClaimSocial8PageModule {}

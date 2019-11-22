import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimSocial4Page } from './claim-social4.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimSocial4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimSocial4Page]
})
export class ClaimSocial4PageModule {}

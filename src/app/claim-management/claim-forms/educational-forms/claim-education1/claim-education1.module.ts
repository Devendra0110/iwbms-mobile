import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimEducation1Page } from './claim-education1.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimEducation1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimEducation1Page]
})
export class ClaimEducation1PageModule {}

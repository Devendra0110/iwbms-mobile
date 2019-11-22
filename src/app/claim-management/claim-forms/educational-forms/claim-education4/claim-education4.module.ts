import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimEducation4Page } from './claim-education4.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimEducation4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimEducation4Page]
})
export class ClaimEducation4PageModule {}

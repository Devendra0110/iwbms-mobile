import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimEducation6Page } from './claim-education6.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimEducation6Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimEducation6Page]
})
export class ClaimEducation6PageModule {}

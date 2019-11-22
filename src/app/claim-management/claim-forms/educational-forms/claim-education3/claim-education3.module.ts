import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimEducation3Page } from './claim-education3.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimEducation3Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimEducation3Page]
})
export class ClaimEducation3PageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimEducation5Page } from './claim-education5.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimEducation5Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClaimEducation5Page]
})
export class ClaimEducation5PageModule {}

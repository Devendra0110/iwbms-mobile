import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClaimModalPage } from './claim-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimModalPage
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
  declarations: [ClaimModalPage],
  entryComponents:[ClaimModalPage],
  exports:[ClaimModalPage]
})
export class ClaimModalPageModule {}

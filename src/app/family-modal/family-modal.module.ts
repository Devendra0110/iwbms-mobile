import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FamilyModalPage } from './family-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyModalPage
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
  declarations: [FamilyModalPage],
  entryComponents:[FamilyModalPage],
  exports:[FamilyModalPage]
})
export class FamilyModalPageModule {}

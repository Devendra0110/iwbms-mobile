import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'registration',
  loadChildren: './registration/registration.module#RegistrationPageModule'
},
  
  { path: 'verification', loadChildren: './verification/verification.module#VerificationPageModule' },
  { path: 'family-modal', loadChildren: './family-modal/family-modal.module#FamilyModalPageModule' },
  { path: 'employer-modal', loadChildren: './employer-modal/employer-modal.module#EmployerModalPageModule' },
  { path: 'renewal', loadChildren: './renewal/renewal.module#RenewalPageModule' },
  { path: 'renewal-verification', loadChildren: './renewal-verification/renewal-verification.module#RenewalVerificationPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

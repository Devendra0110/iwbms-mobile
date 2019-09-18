import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,private storage:Storage,private authService:AuthenticationService) { 

  }

  canActivate(route: ActivatedRouteSnapshot){
    // if(!this.authService.authenticationState.value){
    //   this.router.navigate(['/home']);
    // }
    return this.authService.authenticationState.value;
  }
}

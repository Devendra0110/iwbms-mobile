import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,private storage:Storage) { 

  }

  canActivate(route: ActivatedRouteSnapshot){
    this.storage.get('token').then((tokenValue) => {
      if (tokenValue)
        this.router.navigate(['/dashboard']);
    });

    return true;
  }
}

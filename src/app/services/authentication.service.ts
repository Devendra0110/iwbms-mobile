import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor( private storage:Storage, private plt:Platform) {
    this.plt.ready().then(()=>{
      this.checkToken();
    })
  }

  login(tokenValue:string){
    return this.storage.set('token', tokenValue).then((res)=>{
      this.authenticationState.next(true);
    });
  }

  logout(){
    return this.storage.remove('token').then((res) => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

  checkToken(){
    return this.storage.get('token').then((res) => {
      if(res){
        this.authenticationState.next(true);
      }else{
        this.authenticationState.next(false);
      }
    });
  }
}

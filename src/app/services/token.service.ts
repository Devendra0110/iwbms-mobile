import { Injectable } from '@angular/core';
import { appendTokenToHeaderObject } from '../../assets/token-helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
import { Storage } from '@ionic/storage';
 
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient,
              private storage: Storage) { 
  }
  generateToken(tokenObj: any) {
    const headers = this.appendTokenToHeaderObject(new HttpHeaders());
    return this.http.post(`${serverUrl}token-management/generate`, tokenObj);
  }

  getToken() {
    const headers = appendTokenToHeaderObject(new HttpHeaders());
    return this.http.get(`${serverUrl}token-management/get-token`, { headers });
  }

  appendTokenToHeaderObject(headers: HttpHeaders): HttpHeaders {
    let token;
    this.storage.get('token').then((tokenValue)=>{
      token = tokenValue
    })
    return headers.append('x-access-token', token);
  }

}

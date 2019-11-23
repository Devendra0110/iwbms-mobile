import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
import { appendTokenToHeaderObject, } from '../../assets/token-helper';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient, private storage: Storage) {
  }

  login(loginObj: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}user/login`, loginObj, { headers });
  }

  register(registerObj: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}user/register`, registerObj, { headers });
  }

  getUserTypes() {
    return this.http.get(`${serverUrl}user/user-types`);
  }

  getUserById(registrationNo: string, JWTToken:any,bocwId?: number, ) {
    const headers = appendTokenToHeaderObject(new HttpHeaders(),JWTToken);
    if (registrationNo) {
      return this.http.get(`${serverUrl}user/get-user-by-Id?registrationNo=${registrationNo}`, { headers });
    } else if (bocwId) {
      return this.http.get(`${serverUrl}user/get-user-by-Id?bocwId=${bocwId}`, { headers });
    }
  }
  
}

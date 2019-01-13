import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient, private httpNative : HTTP) {
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
}

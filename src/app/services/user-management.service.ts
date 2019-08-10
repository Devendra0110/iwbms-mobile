import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) {
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

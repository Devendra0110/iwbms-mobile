import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
@Injectable({
  providedIn: 'root'
})
export class MobileVerificationService {

  constructor( private http:HttpClient) { 
  }
  sendOTP(mobileNo: string, aadharNo: string) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}otp/generate-otp`, { mobileNo, aadharNo }, { headers });
  }

  validateOTP(otp: string) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}otp/verify-otp`, { otp }, { headers });
  }
}

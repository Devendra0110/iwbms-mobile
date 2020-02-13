import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { serverUrl } from '../../assets/config';

@Injectable({
  providedIn: 'root'
})
export class MobileVerificationService {

  constructor( private http:HttpClient) { 
  }
  sendOTP(mobileNo: number, aadharNo: number) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}otp/generate-otp`, { mobileNo, aadharNo }, { headers });
  }

  sendClaimOTP(registrationNo: string,mobileNo: string,) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}otp/generate-otp`, { registrationNo, mobileNo,purpose:'Claim' }, { headers });
  }

  sendRenewalOTP(registrationNo: string,mobileNo: string,) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}otp/generate-otp`, { registrationNo, mobileNo,purpose:'Renewal' }, { headers });
  }

  // /purpose === 'Update Registration'

  validateOTP(mobileNo: string,otp: string) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(`${serverUrl}otp/verify-otp`, { mobileNo,otp }, { headers });
  }
}

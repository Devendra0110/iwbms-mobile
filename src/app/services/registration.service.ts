import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {
  }

  callIfscCodeApi(ifsc: string) {
    return this.http.get('https://ifsc.razorpay.com/' + ifsc);
  }
}

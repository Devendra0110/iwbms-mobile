import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
import { appendTokenToHeaderObject, } from '../../assets/token-helper';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RenewalService {

  serverUrl = serverUrl;
  constructor(
    private http: HttpClient,
    private storage: Storage) { }

  getRegistrationDetails(registrationNo: string,JWTToken:any) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(), JWTToken
    );
    return this.http.post(`${serverUrl}bocw-renewal/getworkerdetails`, registrationNo, { headers });
  }

  getRenewalEntry(tokenNo, JWTToken: any) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(), JWTToken
    );
    return this.http.post(`${serverUrl}bocw-renewal/getrenewal`, tokenNo, { headers });
  }

  checkForRenewal(registrationNo: number, JWTToken: any) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(), JWTToken
    );
    return this.http.post(`${serverUrl}token-management/check-for-renewal`, { registrationNo }, { headers });
  }


  saveRenewalData(renewalDetails: any, JWTToken: any) {
    let headers;
    if (renewalDetails.get('modeOfApplication') === 'By Field Agent') {
      headers = new HttpHeaders();
    } else {
      const headers = appendTokenToHeaderObject(
        new HttpHeaders(), JWTToken
      );
    }
    return this.http.post(`${serverUrl}bocw-renewal`, renewalDetails, { headers });
  }
}

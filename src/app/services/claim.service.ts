import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
import { appendTokenToHeaderObject, } from '../../assets/token-helper';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  serverUrl = serverUrl;
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }


  checkRegistrationAndRenewalValidity(tokenObj: any,JWTToken:any) {
    const headers = appendTokenToHeaderObject(new HttpHeaders(), JWTToken);
    return this.http.post(`${serverUrl}token-management/check-reg-and-renewal-validity`,  tokenObj, { headers });
  }

  //claim-home-controller
  getSchemeCat(JWTToken: any) {
    const headers = appendTokenToHeaderObject(new HttpHeaders(), JWTToken);
    return this.http.get(`${serverUrl}claim-management/scheme-categories`);
  }

  getSchemeDetail(JWTToken: any) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(), JWTToken
    );
    return this.http.get(`${serverUrl}claim-management/scheme-details`);
  }
  getSchemeDetailsBySchemeNumber(schemeNumber: string,JWTToken:any) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(),JWTToken
    );
    return this.http.get(`${serverUrl}claim-management/scheme-details-by-number/${schemeNumber}`);
  }

  callIfscCodeApi(ifsc: string) {
    return this.http.get('https://ifsc.razorpay.com/' + ifsc);
  }

  getClaimDetailsByClaimId(claimId: string,JWTToken:any) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(),JWTToken
    );
    return this.http.get(`${serverUrl}claim-management/claim-data/${claimId}`, { headers });
  }

  /**
   * to get eligibility scheme object, it returns object of  schemeId as key and boolean as value.
   * @param registrationNo
   */
  getClaimEligibilityObject(registrationNo: string) {
    const headers = // appendTokenToHeaderObject(
      new HttpHeaders()
    // );
    return this.http.get(`${serverUrl}claim-management/schemes-eligibility/${registrationNo}`, { headers });
  }

  applyForClaim(formData,JWTToken:any) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(), JWTToken
    );
    return this.http.post(`${serverUrl}claim-management/apply-for-claim`, formData, { headers });
  }

}

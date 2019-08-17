import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../../assets/config';
import { appendTokenToHeaderObject, } from '../../assets/token-helper';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serverUrl = serverUrl;
  constructor(private http: HttpClient,
            private storage:Storage) { }

  saveData(formData, JWTToken:any) {
    const headers =appendTokenToHeaderObject(
      new HttpHeaders(),JWTToken
    );
    return this.http.post(`${serverUrl}bocw-registration`, formData, {headers});
  }

  // getAllEntries() {
  //   const headers = appendTokenToHeaderObject(
  //     new HttpHeaders()
  //   );
  //   return this.http.get(`${serverUrl}registration-and-renewal/registration`);
  // }

  getApplicantsDetails(userId,JWTToken) {
    const headers = appendTokenToHeaderObject(
      new HttpHeaders(), JWTToken
    );
    return this.http.get(`${serverUrl}registration-and-renewal/registration`, { params: { userId }});
  }

  // updateApplicationStatus(ackNo: string, applicationStatus: any) {
  //   const headers = appendTokenToHeaderObject(
  //     new HttpHeaders().append('Content-Type', 'application/json')
  //   );
  //   return this.http.put(`${serverUrl}registration-and-renewal/application-status`, { ackNo, applicationStatus });
  // }

  // // fetch the xls file of all registrations
  // getRegistrationXls() {
  //   const headers = appendTokenToHeaderObject(
  //     new HttpHeaders()
  //   );
  //   return this.http.get(`${serverUrl}registration-and-renewal/registrationxls`);
  // }


  appendTokenToHeaderObject(headers: HttpHeaders): HttpHeaders {
    let token;
    this.storage.get('token').then((tokenValue) => {
      token = tokenValue; 
      console.log(token);
      debugger;
    })
    return headers.append('x-access-token', token);
  }


  getGenders() {
    return this.http.get(`${serverUrl}masters/genders`);
  }

  getMaritalStatus() {
    return this.http.get(`${serverUrl}masters/marital-status`);
  }

  getRationCardTypes() {
    return this.http.get(`${serverUrl}masters/ration-card`);
  }

  getCategory() {
    return this.http.get(`${serverUrl}masters/categories`);
  }

  getNatureOfWork() {
    return this.http.get(`${serverUrl}masters/types-of-worker`);
  }

  getIssuerTypes() {
    return this.http.get(`${serverUrl}masters/issuer`);
  }

  getIssuerRegistrationTypes() {
    return this.http.get(`${serverUrl}masters/issuer-registration-types`);
  }

  getStates(){
    return this.http.get(`${serverUrl}masters/states`);
  }

  getDistricts(id: number) {
    return this.http.get(`${serverUrl}masters/districts?state_id=${id}`);
  }

  getTalukas(id: number) {
    return this.http.get(`${serverUrl}masters/talukas?district_id=${id}`);
  }

  getPostOffices(id: number){
    return this.http.get(`${serverUrl}masters/post-office?taluka_id=${id}`);
  }

  getFamilyRelations(){
    return this.http.get(`${serverUrl}masters/family-relations`);
  }

  getEducation() {
    return this.http.get(`${serverUrl}masters/education`);
  }

  getDocumentTypes(){
    return this.http.get(`${serverUrl}masters/document-types`);
  }
}

import {HttpHeaders} from '@angular/common/http';

export function appendTokenToHeaderObject(headers: HttpHeaders): HttpHeaders {
    if(localStorage.getItem('token')) {
      return headers.append('x-access-token', localStorage.getItem('token'));
      // .append('mac-ip', MacAddress.Instance.mac_ip);
    } else {
      return headers;
      // .append('mac-ip', MacAddress.Instance.mac_ip);
    }
  }
import {HttpHeaders} from '@angular/common/http';

export function appendTokenToHeaderObject(headers: HttpHeaders): HttpHeaders {
    return headers.append('x-access-token', localStorage.getItem('token'));
}

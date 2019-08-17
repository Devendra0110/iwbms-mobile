import {HttpHeaders} from '@angular/common/http';

export function appendTokenToHeaderObject(headers: HttpHeaders,JWTToken:any): HttpHeaders {
    return headers.append('x-access-token', JWTToken);
}

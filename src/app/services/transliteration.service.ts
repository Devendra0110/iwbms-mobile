import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TransliterationService {
  private readonly apiBaseUrl: string = 'https://gisttransserver.in/Transliteration.aspx?itext=';

  constructor(private http: HttpClient) { }

  transliterateText(text: string, type: 'NAME' | 'ADDRESS') {
    if (text && text !== '') {
      const url = `${this.apiBaseUrl}${text}&transliteration=${type}&locale=mr_in&transRev=false`;

      return this.http.get(url);
    }
  }
}

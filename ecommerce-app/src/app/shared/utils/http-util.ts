import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class HttpUtil {
  private static API_URL: string = 'http://localhost:3000/api/';

  constructor() { }

  static url(path: string): string {
    return this.API_URL + path;
  }

  static headers(): RequestOptions {
    const headersParams = { 'Content-Type': 'application/json' };
    if (localStorage['token']) {
      headersParams['Authorization'] = localStorage['token'];
    }
    const headers = new Headers(headersParams);
    const options = new RequestOptions({ headers: headers });

    return options;
  }

  static extractData(response: Response): any {
    const data = response.json();
    return data || {};
  }

  static processErrors(error: any) {
    return Observable.throw(error.json().error || 'Server error');
  }

}

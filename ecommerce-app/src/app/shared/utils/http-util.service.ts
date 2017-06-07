import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpUtilService {
  private API_URL: string = 'http://localhost:3000/api/';

  constructor() { }

  url(path: string): string {
    return this.API_URL + path;
  }

  headers(): RequestOptions {
    const headersParams = { 'Content-Type': 'application/json' };
    if (localStorage['token']) {
      headersParams['Authorization'] = localStorage['token'];
    }
    const headers = new Headers(headersParams);
    const options = new RequestOptions({ headers: headers });

    return options;
  }

  extractData(response: Response): any {
    const data = response.json();
    return data || {};
  }

  processErrors(erro: any) {
    return Observable.throw('An error occurred while trying to access the server.');
  }

}

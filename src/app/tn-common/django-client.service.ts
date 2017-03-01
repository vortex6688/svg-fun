import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DjangoClientService {

  public baseUrl = 'http://localhost:8000';
  // @todo #3236: private user = userService.getUser();
  private user = { token: 'ThisIsAToken' };

  constructor(private https: Http) { }

  public get(url: string, options?: RequestOptions): Observable<any> {
    let _options = this._setAuthToken(options);
    let fullUrl = this.baseUrl + url;
    return this.https.get(fullUrl, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  public post(url: string, data: Object, options?: RequestOptions): Observable<any> {
    let _options = this._setAuthToken(options);
    let fullUrl = this.baseUrl + url;
    return this.https.post(fullUrl, data, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  public put(url: string, data: Object, options?: RequestOptions): Observable<any> {
    let _options = this._setAuthToken(options);
    let fullUrl = this.baseUrl + url;
    return this.https.put(fullUrl, data, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  public delete(url: string, options?: RequestOptions): Observable<any> {
    let _options = this._setAuthToken(options);
    let fullUrl = this.baseUrl + url;
    return this.https.delete(fullUrl, _options)
                     .map((response) => response.json())
                     .catch(this.handleError);
  }

  private _setAuthToken(options = new RequestOptions()): RequestOptions {
    // @todo #3236: this has to be a real token for django to allow access
    if (this.user.token) {
      let headers = options.headers;
      if (headers) {
        headers.set('Authorization', 'Token ' + this.user.token);
      } else {
        headers = new Headers({ Authorization: 'Token ' + this.user.token });
      }
      options.headers = headers;
    }
    return options;
  }

  private handleError(error: any) {
    let errMsg = 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

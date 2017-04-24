import { Injectable } from '@angular/core';
import { ConnectionBackend, Headers, Http,
         Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { TnApiBaseUrl } from './tn-api-base-url';

/**
 * TypeNetwork API HTTP client.
 *
 * This extensions of the HTTP service provides support to set an Authorization Token, set a
 * baseURL, an errors$ observable, and returns the results of successful requests as json entities
 * instead of HTTP responses.
 *
 * @export
 * @class TnApiHttpService
 * @extends {Http}
 */
@Injectable()
export class TnApiHttpService extends Http {

  public static factory(backend: XHRBackend, options: RequestOptions, baseUrl?: TnApiBaseUrl) {
    return new TnApiHttpService(backend, options, baseUrl);
  }

  public static provider() {
    return {
      provide: TnApiHttpService,
      deps: [XHRBackend, RequestOptions, TnApiBaseUrl],
      useFactory: TnApiHttpService.factory
    };
  }

  /**
   * Observable of errors so auth and other services can watch for issues with the API.
   *
   * @public
   * @type {Subject<any>}
   * @memberOf TnApiHttpService
   */
  public errors$: Subject<any> = new Subject<any>();

  /**
   * baseUrl to use for API requests allowing for shortHand uses of the class.
   *
   * @protected
   * @type {string}
   * @memberOf TnApiHttpService
   */
  protected baseUrl: TnApiBaseUrl;

  /**
   * API Authorization Token
   *
   * @protected
   * @type {string}
   * @memberOf TnApiHttpService
   */
  protected token: string;
  /**
   * Creates an instance of TnApiHttpService.
   *
   * Our client extends the HTTP client class to keep the interface minimal, and to allow us to
   * inject it separately from HTTP. We add the ability to set the baseUrl for requests,
   * authorization tokens, have general error observers, return only the JSON in our requests.
   *
   * @param {ConnectionBackend} backend
   * @param {RequestOptions} defaultOptions
   *
   * @memberOf TnApiHttpService
   */
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, baseUrl?: TnApiBaseUrl) {
    super(backend, defaultOptions);
    this.baseUrl = baseUrl;
  }

  /**
   * Set the Authorization Token to be used with API Requests.
   *
   * @private
   * @param {string} [token] set the AuthToken, call without a parameter or null to unset.
   *
   * @memberOf TnApiHttpService
   */
  public setAuthToken(token?: string) {
    this._defaultOptions.headers.delete('Authorization');
    if (token) {
      this._defaultOptions.headers.append('Authorization', 'Token ' + token);
    }
  }

  /**
   * Set the baseUrl for all requests.
   *
   * @private
   * @param {string} [url] set the baseUrl, call without a parameter or null to unset.
   *
   * @memberOf TnApiHttpService
   */
  public setBaseUrl(url?: string) {
    this.baseUrl = url;
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      url = this.composeUrl(url);
    } else if (url instanceof Request) {
      url.url = this.composeUrl(url.url);
    }
    return super.request(url, options);
  }

  /**
   * Make a GET request against the TypeNetwork API.
   *
   * @param {string} url
   * @param {RequestOptions} [options]
   * @returns {Observable<ApiEntity>}
   *
   * @memberOf TnApiHttpService
   */
  public get(url: string, options?: RequestOptions): Observable<any> {
    return super.get(url, options)
                  .map((response) => response.json())
                  .catch((error) => this.catchAndRethrowError(error));
  }

  /**
   * Make a POST request against the TypeNetwork API.
   *
   * @param {string} url
   * @param {Object} data
   * @param {RequestOptions} [options]
   * @returns {Observable<ApiEntity>}
   *
   * @memberOf TnApiHttpService
   */
  public post(url: string, data: Object, options?: RequestOptions): Observable<any> {
    return super.post(url, data, options)
                  .map((response) => response.json())
                  .catch((error) => this.catchAndRethrowError(error));
  }

  /**
   * Make a PUT request against the TypeNetwork API.
   *
   * @param {string} url
   * @param {Object} data
   * @param {RequestOptions} [options]
   * @returns {Observable<any>}
   *
   * @memberOf TnApiHttpService
   */
  public put(url: string, data: Object, options?: RequestOptions): Observable<any> {
    return super.put(url, data, options)
                  .map((response) => response.json())
                  .catch((error) => this.catchAndRethrowError(error));
  }

  /**
   * Make a DELETE request against the TypeNetwork API.
   *
   * @param {string} url
   * @param {RequestOptions} [options]
   * @returns {Observable<any>}
   *
   * @memberOf TnApiHttpService
   */
  public delete(url: string, options?: RequestOptions): Observable<any> {
    return super.delete(url, options)
                  .map((response) => response.json())
                  .catch((error) => this.catchAndRethrowError(error));
  }

  /**
   * Combine the instance baseUrl with the requested method URL.
   *
   * @protected
   * @param {string} [url] path to be appended to baseUrl.
   * @returns {string}
   *
   * @memberOf TnApiHttpService
   */
  protected composeUrl(url: string): string {
    // do not compose if the method received a full URL.
    if (url.indexOf('http') === 0) {
      return url;
    }
    // only compose if baseUrl is set.
    return (this.baseUrl) ? this.baseUrl + url : url;
  }

  /**
   * Capture and error to emit on error$ then rethrow.
   *
   * @private
   * @param {*} error
   * @returns {Observable<any>}
   *
   * @memberOf TnApiHttpService
   */
  private catchAndRethrowError(error: any) {
    // let any general observers know there was a client error so they can respond accordingly.
    this.errors$.next(error);
    return Observable.throw(error);
  }
}

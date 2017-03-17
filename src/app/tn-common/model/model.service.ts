import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TnApiHttpService } from '../tn-api-http';

export interface IModel {
  id?: number | string;
}

/**
 * Model Service.
 *
 * This service provides a generic way of communicating with the API's endpoint.
 *
 * @export
 * @class ModelService<T>
 */
@Injectable()
export class ModelService<T extends IModel> {

  /**
   * Url of a particular model, every child should override this accordingly.
   *
   * @protected
   * @type {string}
   */
  private modelUrl: string = '';

  /**
   * Creates an instance of the ModelService
   *
   * @param {string} modelUrl
   * @param {TnApiHttpService} apiHttp
   */
  constructor(private apiHttp: TnApiHttpService) {
  }

  /**
   * Look up a model by id
   *
   * @param {string} [id] id of the object to be retrieved
   * @returns {Observable<T>}
   */
  public get(id: number | string): Observable<T> {
    return this.apiHttp.get(this.modelUrl + id);
  }

  /**
   * Search for a collection of models, pass null to get all.
   *
   * @param {Object} query
   * @returns {Observable<T[]>}
   */
  public find(query: Object): Observable<T[]> {
    let options = new RequestOptions({body: query});
    return this.apiHttp.get(this.modelUrl, options);
  }

  /**
   * Persist a model back to the API.
   *
   * @param {T} model
   * @returns {Observable<T>}
   */
  public save(model: T): Observable<T> {
    let options = new RequestOptions({body: model});
    if (this.alreadyExists(model)) {
      return this.apiHttp.put(this.modelUrl + model.id, options);
    } else {
      return this.apiHttp.post(this.modelUrl, options);
    }
  }

  /**
   * Delete a model from the API.
   *
   * @param {T} model
   * @returns {Observable<T>}
   */
  public delete(model: T): Observable<T> {
    return this.apiHttp.delete(this.modelUrl + model.id);
  }

  /**
   * Helper function that determines if the passed module already exists
   *
   * @param {T} model
   * @returns {boolean}
   */
  private alreadyExists(model: T): boolean {
    let alreadyExists = false;
    if (model.id) {
      this.get(model.id).subscribe((result) => {
        if (result.id === model.id) {
          alreadyExists = true;
        }
      });
    }
    return alreadyExists;
  }

}

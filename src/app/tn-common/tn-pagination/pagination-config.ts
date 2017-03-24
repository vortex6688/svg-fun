import { Injectable } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

/**
 * Configuration service for the TnPagination component.
 *
 * You can inject this service, typically in your root component, and customize the values of its
 * properties in order to provide default values for all the paginations used in the application.
 */
@Injectable()
export class TnPaginationConfig extends NgbPaginationConfig {}

import {
  Response,
  ResponseOptions,
  RequestOptions,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TnApiHttpService } from '../../tn-common/tn-api-http';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let mockBackend: MockBackend;
  let orderService: OrderService;
  let apiClient: TnApiHttpService;

  const successBody = {
    next: 'watever',
    results: [1, 2, 3],
  };
  const mockResponse = new Response(new ResponseOptions({
    body: JSON.stringify(successBody),
    status: 200,
    statusText: 'Success'
  }));

  const generateResponse = (body) => new Response(new ResponseOptions({
    body: JSON.stringify(body),
    status: 200,
    statusText: 'Success',
  }));

  beforeEach(() => {
    mockBackend = new MockBackend();
    const options = new BaseRequestOptions();
    apiClient = new TnApiHttpService(mockBackend, options);
    orderService = new OrderService(apiClient);
  });

  it('should create', () => {
    expect(orderService).toBeTruthy();
  });

  describe('paging', () => {
    it('should not call getPage if there is no next page', () => {
      const expected = [1, 2, 3, 4];
      mockBackend.connections.subscribe((connection) => {
        const item = {
          ...successBody,
          next: null,
          results: expected };
        connection.mockRespond(generateResponse(item));
      });
      spyOn(orderService, 'getPage').and.callThrough();

      orderService.getAllPages(null)
        .subscribe((result: any) => {
          expect(orderService.getPage).not.toHaveBeenCalled();
          expect(result).toEqual(expected);
        });
    });

    it('should go through all available pages', () => {
      const expected = [];
      const totalPages = 4;
      let page = 0;
      mockBackend.connections.subscribe((connection) => {
        const item = { ...successBody, results: [page] };
        expected.push(page);
        if (++page === totalPages) {
          item.next = null;
        }
        connection.mockRespond(generateResponse(item));
      });
      spyOn(orderService, 'getPage').and.callThrough();

      orderService.getAllPages(null)
        .subscribe((result) => {
          expect(result).toEqual(expected);
          expect(orderService.getPage).toHaveBeenCalledTimes((totalPages - 1));
        });
    });
  });
});

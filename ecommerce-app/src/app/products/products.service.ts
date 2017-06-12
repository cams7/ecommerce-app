import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpUtil } from './../shared/utils/http-util';

import { Product } from './product';

@Injectable()
export class ProductsService {

  private PATH: string = 'Products';
  private FILTERS:string = '?filter[include]=images&filter[include]=stored';

  constructor(
    private http: Http
  ) {    
  }

  findAll(): Observable<Product[]> {
    return this.http.get(HttpUtil.url(this.PATH + this.FILTERS), HttpUtil.headers())
      .map(this.getProducts)
        .catch(HttpUtil.processErrors);
  }

  findById(id: number): Observable<Product> {
    return this.http.get(HttpUtil.url(this.PATH + '/' + id + this.FILTERS), HttpUtil.headers())
      .map(HttpUtil.extractData)
        .catch(HttpUtil.processErrors);
  }

  private getProducts(response: Response): Product[] {
    let products: any = response.json() || {};
    
    return products.map(product => {
      product.icon = product.images.filter(image => image.size == 2)[0].icon;
      product.available = product.stored.quantity > 0;
      return product;
    });
  }
}

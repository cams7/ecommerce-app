import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpUtilService } from './../shared/utils/http-util.service';

import { Product } from './product';

@Injectable()
export class ProductsService {

  private PATH: string = 'Products';
  private FILTERS:string = '?filter[include]=images&filter[include]=stored';

  constructor(
    private http: Http,
    private httpUtil: HttpUtilService
  ) {    
  }

  findAll(): Observable<Product[]> {
    return this.http.get(this.httpUtil.url(this.PATH + this.FILTERS), this.httpUtil.headers())
      .map(this.getProducts)
        .catch(this.httpUtil.processErrors);
  }

  findById(id: number): Observable<Product> {
    return this.http.get(this.httpUtil.url(this.PATH + '/' + id + this.FILTERS), this.httpUtil.headers())
      .map(this.httpUtil.extractData)
        .catch(this.httpUtil.processErrors);
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

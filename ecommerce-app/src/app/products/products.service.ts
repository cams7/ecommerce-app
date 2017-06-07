import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpUtilService } from './../shared/utils/http-util.service';

import { Product } from './product';

@Injectable()
export class ProductsService {

  private PATH: string = 'Products?filter[include]=images&filter[include]=stored';

  constructor(
    private http: Http,
    private httpUtil: HttpUtilService
  ) {    
  }

  all(): Observable<Product[]> {
    return this.http.get(this.httpUtil.url(this.PATH), this.httpUtil.headers())
      .map(this.getProduct)
        .catch(this.httpUtil.processErrors);
  }

  getProduct(response: Response): Product[] {
    let products: any = response.json() || {};
    
    return products.map(product => {
      product.icon = product.images.filter(image => image.size == 2)[0].icon;
      product.available = product.stored.quantity > 0;
      return product;
    });
  }
}

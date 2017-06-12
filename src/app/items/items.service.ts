import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Item } from './item';
import { Product } from './../products/product';

import { ProductsService } from './../products/products.service';

@Injectable()
export class ItemsService {

  private items: Item[] = [];

  constructor(    
    private http: Http, 
    private productsService: ProductsService
  ) {     
  }

  findAll(): Observable<Item[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.items);
      }, 100);
    });
  }

  findByProductId(id: number): Observable<Item> {
    return this.productsService.findById(id).map(this.getItem);
  }

  private getItem(product: Product): any {
    let item: Item = new Item(0, null, 0, 0);
    item.product = product;
    return item;
  }

}

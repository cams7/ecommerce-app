import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpUtil } from './../shared/utils/http-util';

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

  findByProductId(id: number): Item {
    let item: Item = new Item(0, null, 0, 0);
    
    this.productsService.findById(id).subscribe(
      product => item.product = product
    );

    return item;
  }

}

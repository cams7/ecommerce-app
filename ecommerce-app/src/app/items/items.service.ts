import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpUtilService } from './../shared/utils/http-util.service';

import { Item } from './item';
import { Product } from './../products/product';

import { ProductsService } from './../products/products.service';

@Injectable()
export class ItemsService {

  private items: Item[] = [];

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private http: Http, 
    private httpUtil: HttpUtilService,
    private productsService: ProductsService
  ) {     
  }

  all(): Observable<Item[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.items);
      }, 100);
    });
  }

  findByProductId(id: number): Item {
    let item: Item = new Item();
    
    this.productsService.findById(id).subscribe(
      product => item.product = product
    );

    return item;
  }

}

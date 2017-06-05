import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Item } from './item';
import { Product } from './../products/product';

@Injectable()
export class ItemsService {

  private items: Item[] = [];

  constructor(
    private http: Http
  ) { 
    let product = new Product(1);
    product.name = 'Wacom Bamboo Tablet';
    product.pricing = 100;
    product.short_description = `
    Just getting going with your art? Transitioning from paper to computer-based work? The Bamboo Splash is a great way to explore your interests, with...
    `;
    product.icon = 'assets/images/products/wacom_bambo_tablet.png';
    let item = new Item(1, product, 2, 200, null, null);
    this.items.push(item);

    product = new Product(5);
    product.name = 'Asus Transformer Pad ...';
    product.pricing = 200;
    product.short_description = `
    The New ASUS Transformer Pad is a 10.1-inch mobile entertainment tablet with a vivid 1280 x 800 IPS display, the latest high-performance Intel BayT...
    `;
    product.icon = 'assets/images/products/asus_transformer_pad_tablet.png';
    item = new Item(2, product, 3, 600, null, null);
    this.items.push(item);

    product = new Product(4);
    product.name = 'DualShock Controller ...';
    product.pricing = 20;
    product.short_description = `
    The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, pre...
    `
    product.icon = 'assets/images/products/dualshock_controller_for_playStation4.png';
    item = new Item(3, product, 1, 20, null, null);
    this.items.push(item);
  }

  all(): Observable<Item[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.items);
      }, 100);
    });
  }

}

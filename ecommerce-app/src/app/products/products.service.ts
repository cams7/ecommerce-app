import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Product } from './product';

@Injectable()
export class ProductsService {

  private products: Product[] = [];

  constructor(
    private http: Http
  ) {

    let product = new Product(1);
    product.name = 'Wacom Bamboo Tablet';
    product.pricing = 100;
    product.short_description = `
    Just getting going with your art? Transitioning from paper to computer-based work? The Bamboo Splash is a great way to explore your interests, with...
    `;
    product.icon = 'assets/images/products/350.png';
    this.products.push(product);

    product = new Product(2);
    product.name = 'Smartphone MTK6572';
    product.pricing = 500;
    product.short_description = `
    JK&nbsp;M8 Smartphone with&nbsp;Android 4.4.2 OS
    `;
    product.icon = 'assets/images/products/350_005.png';
    this.products.push(product);
    
    product = new Product(3);
    product.name = 'iMac Desktop Computer';
    product.pricing = 1200;
    product.short_description = `
    The idea behind iMac has never wavered: to craft the ultimate desktop experience. The best display, paired with high-performance processors, graphi...
    `;
    product.icon = 'assets/images/products/350_006.png';
    this.products.push(product);
 
    product = new Product(4);
    product.name = 'DualShock Controller ...';
    product.pricing = 20;
    product.short_description = `
    The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, pre...
    `
    product.icon = 'assets/images/products/350_003.png';
    this.products.push(product);    

    product = new Product(5);
    product.name = 'Asus Transformer Pad ...';
    product.pricing = 200;
    product.short_description = `
    The New ASUS Transformer Pad is a 10.1-inch mobile entertainment tablet with a vivid 1280 x 800 IPS display, the latest high-performance Intel BayT...
    `;
    product.icon = 'assets/images/products/350_002.png';
    this.products.push(product);    

    product = new Product(6);
    product.name = 'Dualshock Controller ...';
    product.short_description = `
    The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, pre...
    `;
    product.icon = 'assets/images/products/350_004.png';
    product.available = false;
    this.products.push(product);
  }

  all(): Observable<Product[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.products);
      }, 500);
    });
  }


}

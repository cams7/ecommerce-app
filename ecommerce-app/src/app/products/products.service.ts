import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import { Product } from './product';

@Injectable()
export class ProductsService {

  private products: Product[] = [
    new Product(
      1,
      true,
      3, 0,
      'Wacom Bamboo Tablet',
      100,
      `
      Just getting going with your art? Transitioning from paper to computer-based work? The Bamboo Splash is a great way to explore your interests, with...
      `,
      '',
      'assets/images/products/350.png',
      null,
      null,
      false),

    new Product(
      2,
      true,
      3,
      0,
      'Smartphone MTK6572',
      500,
      `
      JK&nbsp;M8 Smartphone with&nbsp;Android 4.4.2 OS
      `,
      '',
      'assets/images/products/350_005.png',
      null,
      null,
      false),

    new Product(
      3,
      true,
      3,
      0,
      'iMac Desktop Computer',
      1200,
      `
      The idea behind iMac has never wavered: to craft the ultimate desktop experience. The best display, paired with high-performance processors, graphi...
      `,
      '',
      'assets/images/products/350_006.png',
      null,
      null,
      false),

    new Product(
      4,
      true,
      3,
      0,
      'DualShock Controller ...',
      20,
      `
      The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, pre...
      `,
      '',
      'assets/images/products/350_003.png',
      null,
      null,
      false),

    new Product(
      5,
      true,
      3,
      0,
      'Asus Transformer Pad ...',
      200,
      `
      The New ASUS Transformer Pad is a 10.1-inch mobile entertainment tablet with a vivid 1280 x 800 IPS display, the latest high-performance Intel BayT...
      `,
      '',
      'assets/images/products/350_002.png',
      null,
      null,
      false),

    new Product(
      6,
      true,
      3,
      0,
      'Dualshock Controller ...',
      0.0,
      `
      The DualShock®4 Wireless Controller for PlayStation®4 defines the next generation of play, combining revolutionary new features with intuitive, pre...
      `,
      '',
      'assets/images/products/350_004.png',
      null,
      null,
      true)
  ];

  constructor(
    private http: Http
  ) {

  }

  all(): Observable<Product[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.products);
      }, 500);
    });
  }

}

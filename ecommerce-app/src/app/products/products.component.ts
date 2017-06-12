import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from './product';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productsService.findAll().subscribe(
      products => this.products = products,
      error => {}
    );
  }

  ngOnDestroy() {
  }

}

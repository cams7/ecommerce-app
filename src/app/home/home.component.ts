import { Component, OnInit } from '@angular/core';

import { Product } from './../products/product';
import { ProductsService } from './../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  interval = 1500;
  slides: any[] = [];
  activeSlideIndex: number;
  noWrapSlides = false;

  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.addSlide();

    this.loadProducts();
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }

  private addSlide(): void {
    const image_path = `assets/images/slider-demo.jpg`;

    this.slides.push({
      image: image_path
    });
    this.slides.push({
      image: image_path
    });
    this.slides.push({
      image: image_path
    });
  }

  private loadProducts(): void {
    this.productsService.findAll().subscribe(
      products => this.products = products
    );
  }

}

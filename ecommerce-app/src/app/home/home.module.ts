import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HomeComponent } from './home.component';

import { ProductsService } from './../products/products.service';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    ProductsService
  ]
})
export class HomeModule { }

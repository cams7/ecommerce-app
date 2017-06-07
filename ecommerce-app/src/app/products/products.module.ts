import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { ProductsComponent } from './products.component';

import { ProductsService } from './products.service';

import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }

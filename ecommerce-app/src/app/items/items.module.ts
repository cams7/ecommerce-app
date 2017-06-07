import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsComponent } from './items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

import { ItemsService } from './items.service';
import { ProductsService } from './../products/products.service';

import { ItemResolver } from './guards/item.resolver';

import { ItemsRoutingModule } from './items-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule
  ],
  declarations: [
    ItemsComponent,
    ItemDetailsComponent
  ],
  providers: [
    ItemsService,
    ProductsService,
    ItemResolver
  ]
})
export class ItemsModule { }

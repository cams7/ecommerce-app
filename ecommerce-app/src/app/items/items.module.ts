import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsComponent } from './items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

import { ItemsService } from './items.service';

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
    ItemsService
  ]
})
export class ItemsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

import { ItemResolver } from './guards/item.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ItemDetailsComponent,
    resolve: { item : ItemResolver }
  },
  {
    path: '',
    component: ItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }

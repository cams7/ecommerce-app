import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ProductShortDescriptionPipe } from './product-short-description.pipe';
import { ProductShortNamePipe } from './product-short-name.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PageNotFoundComponent,
    ProductShortDescriptionPipe,
    ProductShortNamePipe
  ], 
  exports: [
    ProductShortDescriptionPipe,
    ProductShortNamePipe
  ]
})
export class SharedModule { }

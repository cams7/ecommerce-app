import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ProductShortDescriptionPipe } from './product-short-description.pipe';
import { ProductShortNamePipe } from './product-short-name.pipe';

import { HttpUtilService } from './utils/http-util.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PageNotFoundComponent,
    ProductShortDescriptionPipe,
    ProductShortNamePipe
  ],
  providers: [
    HttpUtilService
  ], 
  exports: [
    ProductShortDescriptionPipe,
    ProductShortNamePipe
  ]
})
export class SharedModule { }

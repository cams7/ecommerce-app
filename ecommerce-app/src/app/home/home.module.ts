import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HomeComponent } from './home.component';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }

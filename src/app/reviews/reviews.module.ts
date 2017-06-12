import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsComponent } from './reviews.component';

import { ReviewsService } from './reviews.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ReviewsComponent
  ],
  providers: [
    ReviewsService
  ]
})
export class ReviewsModule { }

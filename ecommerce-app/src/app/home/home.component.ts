import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myInterval = 1500;
  slides: any[] = [];
  activeSlideIndex: number;
  noWrapSlides = false;

  constructor() { }

  ngOnInit() {
    this.addSlide();
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

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }

}

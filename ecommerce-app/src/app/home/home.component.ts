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
    this.slides.push({
      image: `assets/images/slider-demo.jpg`
    });
    this.slides.push({
      image: `assets/images/slider-demo.jpg`
    });
    this.slides.push({
      image: `assets/images/slider-demo.jpg`
    });
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }

}

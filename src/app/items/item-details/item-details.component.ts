import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Item } from './../item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy  {

  private subscription: Subscription;

  item: Item; 

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe((info: {item: Item}) => {
      this.item = info.item;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

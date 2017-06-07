
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Item } from './../item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy  {

  item: Item;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: {item: Item}) => {
        this.item = info.item;
        console.log(this.item);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

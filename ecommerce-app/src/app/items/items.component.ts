import { Component, OnInit } from '@angular/core';

import { ItemsService } from './items.service';
import { Item } from "./item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  private loadItems(): void {
    this.itemsService.all().subscribe(
      items => this.items = items
    );
  }

}

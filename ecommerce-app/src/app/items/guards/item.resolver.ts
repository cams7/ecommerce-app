import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Item } from './../item';
import { ItemsService } from './../items.service';

@Injectable()
export class ItemResolver implements Resolve<Item> {

  constructor(
    private itemsService: ItemsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Item | Observable<Item> | Promise<Item> {

      const id = route.params['id'];

      return this.itemsService.findByProductId(id);
  }

}

import { Product } from './../products/product';

export class Item {
  public id: number;
  public product: Product;
  public quantity: number;      
  public subtotal: number = 0;

  constructor() {}
}

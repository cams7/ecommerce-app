import { Product } from './../products/product';

export class Item {
  constructor(
    public id: number, 
    public product: Product,
    public quantity: number,      
    public subtotal: number
  ) {}
}

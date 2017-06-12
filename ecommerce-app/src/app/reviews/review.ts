import { Product } from './../products/product';

export class Review {
  constructor(
    public id: number,
    public product: Product,
    public rating: number,
    public comment: string,
    public approved: boolean,
    public spam: boolean,
    public created_at: Date,
    public updated_at: Date
  ) {}
}

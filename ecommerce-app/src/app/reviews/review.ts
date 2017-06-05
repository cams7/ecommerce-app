import { Product } from './../products/product';

export class Review {
  constructor(
    id: number,
    product: Product,
    rating: number,
    comment: string,
    approved: boolean = true,
    spam: boolean = false,
    created_at: Date,
    updated_at: Date
  ) {}
}

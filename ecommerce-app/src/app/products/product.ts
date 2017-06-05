export class Product {
  constructor(
    public id: number,
    public published: boolean = false,
    public rating_cache: number = 3.0,
    public rating_count: number = 0,
    public name: string,
    public pricing: number = 0.0,
    public short_description: string,
    public long_description: string,
    public icon: string,
    public created_at: Date,
    public updated_at: Date,
    public out_of_stock: boolean
  ) {}
}

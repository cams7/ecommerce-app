export class Product {
  
  published: boolean = false;
  rating_cache: number = 3.0;
  rating_count: number = 0;
  name: string;
  pricing: number = 0.0;
  short_description: string;
  long_description: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
  available: boolean = true;

  constructor(public id: number) {
  }
  
}



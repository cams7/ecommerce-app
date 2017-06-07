export class Product {
  
  name: string;  
  pricing: number = 0.0;
  description: string;

  published: boolean = false;

  ratingCache: number = 0;
  ratingCount: number = 0;  
 
  createdAt: Date;
  updatedAt: Date;

  icon: string;
  available: boolean = true;

  constructor(public id: number) {
  }
  
}



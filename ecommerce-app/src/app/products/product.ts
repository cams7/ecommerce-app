export class Product {
  
  constructor(
    public id: number,
    public name: string,  
    public pricing: number,
    public description: string,

    public published: boolean,

    public ratingCache: number,
    public ratingCount: number,  
 
    public createdAt: Date,
    public updatedAt: Date,

    public icon: string,
    public available: boolean
  ) {}
  
}



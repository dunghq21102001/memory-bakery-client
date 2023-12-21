

export interface IProductVariant {
  Size: string;
  UnitPrice: number;
  PromotionPrice: string;
  Quantity: number;
}
 export interface IProduct {

  Name: string;
  Variant: IProductVariant[];
  Description: string;
  Img: string[];
  Category: string;
}
export class Product{
  constructor(
   public Name: string="",
   public Variant: ProductVariant[],
   public Img: string[],
   public Category: string="",
  ){}
 }
 export class ProductVariant{
  constructor(
    public Size: string="",
    public UnitPrice: number=0,
    public PromotionPrice: string="",
    public Quantity: number=0,
   ){}
 }

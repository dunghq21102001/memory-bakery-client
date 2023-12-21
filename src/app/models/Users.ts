export interface IAddress {
  AddressName:string
  AddressPhone:string
  City:string
  Town:string
  Ward:string
  DetailAddress:string
  AddressType:string
}

export interface IUserType {
  TypeName: string;
  Role: string;
}

export interface IUser {
  _id:any
  FullName:string
  Gender:string
  DateOfBirth:string
  Email:string
  Phone:string
  Image:string
  Address:[]
  Cart:[]
  Order:[]
  Product:[]
  Voucher:[]
  UserName:string
  Password:string
  CreateDate:string
  UserType: IUserType
}

export interface IDetail {
  OrderDetailID:number
  ProductID:number
  ProductName:string
  Size:string
  UnitPrice:string
  Quantity:number
  LineTotal:string
}

export interface IOrder {
  _id:string
  OrderDate: string;
  DeliveryTime: string;
  CancelTime: string;
  OrderStatus: string;
  CostShip: string;
  Details: IDetail[];
  SubTotal: string;
  Note: string;
  Reason: string;
}

export interface IVoucher {
  _id:string
  VoucherID:string
  Name:string
  Discount:string
  Quantity:string
  Condition:string
}

export interface IVariant {
  Size:string
  UnitPrice:string
  PromotionPrice:string
  Quantity:string
}

export interface IProduct {
  _id:String
  Name:string
  Variant:IVariant[]
  Description:string
  Img:string[]
  Category:string
}

export interface IData {
  _id:string
  User:IUser
  Product:IProduct[]
  Voucher:IVoucher[]
  Order:IOrder[]
}
// Khai báo class
export class IAddress {
  AddressName:string=""
  AddressPhone:string=""
  City:string=""
  Town:string=""
  Ward:string=""
  DetailAddress:string=""
  AddressType:string=""
}

export class IUserType {
  TypeName: string="";
  Role: string="";
}

export class IUser {
  _id:any=""
  FullName:string=""
  Gender:string=""
  DateOfBirth:string=""
  Email:string=""
  Phone:string=""
  Image:string=""
  Address:[]=[]
  Cart:[]=[]
  Order:[]=[]
  Product:[]=[]
  Voucher:[]=[]
  UserName:string=""
  Password:string=""
  CreateDate:string=""
  UserType: IUserType = { TypeName: "", Role: "" };
}

export class IDetail {
  OrderDetailID:number=0
  ProductID:number=0
  ProductName:string=""
  Size:string=""
  UnitPrice:string=""
  Quantity:number=0
  LineTotal:string=""
}

export class IOrder {
  _id:string=""
  OrderDate: string="";
  DeliveryTime: string="";
  CancelTime: string="";
  OrderStatus: string="";
  CostShip: string="";
  Details: IDetail[]=[];
  SubTotal: string="";
  Note: string="";
  Reason: string="";
}

export class IVoucher {
  _id:string=""
  VoucherID:string=""
  Name:string=""
  Discount:string=""
  Quantity:string=""
  Condition:string=""
}

export class IVariant {
  Size:string=""
  UnitPrice:string=""
  PromotionPrice:string=""
  Quantity:string=""
}

export class IProduct {
  _id:String=""
  Name:string=""
  Variant:IVariant[]=[]
  Description:string=""
  Img:string[]=[]
  Category:string=""
}

export class IData {
  _id:string=""
  User:IUser = new IUser();
  Product:IProduct[]=[]
  Voucher:IVoucher[]=[]
  Order:IOrder[]=[]
}

export class IOrders {
  OrderDate:any='';
  DeliveryTime: string='';
  CancelTime: string='';
  OrderStatus: string='';
  CostShip: number=0;
  Details: OrderDetail[]=[];
  SubTotal: number=0;
  Note: string=''
  Reason: string='';
}

export class OrderDetail {
  ProductID: string;
  ProductName: string;
  Size: string;
  UnitPrice: string;
  Quantity: number;
  LineTotal: string;
  ReviewStatus: string;

  constructor(detailData: any) {
    this.ProductID = detailData.ProductID.$oid;
    this.ProductName = detailData.ProductName;
    this.Size = detailData.Size;
    this.UnitPrice = detailData.UnitPrice;
    this.Quantity = detailData.Quantity;
    this.LineTotal = detailData.LineTotal;
    this.ReviewStatus = detailData.ReviewStatus;
  }
}

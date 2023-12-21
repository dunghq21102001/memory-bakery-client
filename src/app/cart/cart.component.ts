import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Product } from '../models/Product';
import { Observable, catchError, finalize, map, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  errMessage: any;
  discountMessage: any='0';
  voucherCode: any='';

  isApplying = false;
  constructor(private _http: HttpClient,private cartService:CartService) {
    this.cartService.postCart().subscribe({
      next:(data)=>{},
      error:(err)=>{this.errMessage=err}
    })
  }
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  value=1
  price:any
  code:string=''
  voucher:any
  promotion:any
  data:any=[]
  listInCart: any = []
  subTotal!: number;
  ngOnInit() {
    this.listInCart = localStorage.getItem('cart')
    this.data = JSON.parse(this.listInCart)
  }
  onChange(value: number) {
    this.value = isNaN(value) ? 1 : value;
  }
  convertVND(price: any) {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  updateQty(item: any) {
    if(item.qty < 1 || item.qty > 99) return alert('Phải nhập số lượng lớn hơn 0')
    this.data.map((i: any) => {
      if (i._id == item._id) i.qty = item.qty
      return
    })
    localStorage.setItem('cart', JSON.stringify(this.data))
  }
    changeState() {
    const val = (<HTMLInputElement>document.getElementById('input-voucher')).value;
    if (val.length > 0) {
      (<HTMLInputElement>document.getElementById('apply')).disabled = false;
    } else {
      (<HTMLInputElement>document.getElementById('apply')).disabled = true;
    }
  }

  removeItem(p: any) {
    if (confirm("Bạn có chắc chắn xóa?")==true){
    let cart: any = localStorage.getItem('cart')
    if (cart) {
      this.data = JSON.parse(cart)
      this.data = this.data.filter((pro: any) => pro._id != p._id)
    }
    localStorage.setItem('cart', JSON.stringify(this.data))
  }
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.data) {
      totalPrice += item.size.PromotionPrice * item.qty;
    }
    return totalPrice;
  }
  deleteAll(){
    localStorage.setItem('cart', JSON.stringify([]));
    window.location.reload()
  }
  getPromotion(code: string, orderValue: number): void {
    this.isApplying = true;
    this.getVoucher(code).subscribe({
      next:(data)=>{
        this.voucher=data
        const now = new Date();
        const expireDate = new Date(this.voucher[0].ExpireDate);
        if (now > expireDate) {
          alert("Voucher đã hết hạn");
          return
        }
        if (orderValue < this.voucher[0].Condition*1000) {
          alert("Giá trị đơn hàng chưa đủ áp dụng Voucher");
          return
        }
        this.discountMessage = this.voucher[0].Discount;
        this.cartService.changeMessage(this.discountMessage);

      },
      error:(err)=>{this.errMessage=err}}
      )
  }

  getVoucher(Code: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("http://localhost:6868/voucherCode/" + Code, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError))
    }
      handleError(error:HttpErrorResponse){
        return throwError(()=>new Error(error.message))
  }
  postCart(){
    this.cartService.postCart().subscribe({
      next: (data) => {
        console.log('Cart data updated successfully');
      },
      error: (err) => {
        console.log('Error updating cart data:', err);
      }
    });
  }
}

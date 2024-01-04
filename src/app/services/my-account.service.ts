import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { IAddress, IOrder } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {
  constructor(private _http: HttpClient) { }

  // Service liên quan đến Hồ sơ của tôi
    // Lấy thông tin của User thông qua username
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"json"
      }
    return this._http.get<any>("http://localhost:6868/customer/" + token, requestOptions).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
    // Chỉnh sửa User - Cập nhật địa chỉ
  putUser(aUser: any): Observable<any> {
    console.log(aUser);
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.put<any>("http://localhost:6868/customer", JSON.stringify(aUser), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    );
  }
    // Chỉnh sửa mật khẩu - Đổi mật khẩu


  // Service liên quan đến Địa chỉ của tôi
    // Hiển thị dữ liệu Address của 1 User
  getListAddress(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"json"
      }
    return this._http.get<any>("http://localhost:6868/address/list/" + token, requestOptions).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }
    //Thêm một địa chỉ mới
  postAddress(aAddress:any):Observable<any> {
    const token = localStorage.getItem('token');
    console.log(aAddress);
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("http://localhost:6868/address/"+token,JSON.stringify(aAddress),requestOptions).pipe(
      map(res=>JSON.parse(res) as IAddress),
      retry(3),
      catchError(this.handleError))
  }

    // Hiển thị thông tin Address của 1 User
  getOneAddress(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:6868//address/"+_id,requestOptions).pipe( //link nay
      map(res=>JSON.parse(res) as IAddress),
      retry(3),
      catchError(this.handleError)
    )
  }

    // Chỉnh sửa 1 Address
  putAddress(aAddress: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.put<any>("http://localhost:6868/address", JSON.stringify(aAddress), requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    );
  }

    //Thay đổi địa chỉ mặc định
    putAddressDefault(AddressId:string):Observable<any>
    {
      const token = localStorage.getItem('token');
      const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.put<any>("http://localhost:6868/address/setDefault/"+token+"/"+AddressId,requestOptions).pipe(
        map(res => JSON.parse(res)),
        retry(3),
        catchError(this.handleError)
      )
    }

    // Xoá 1 Address
  deleteAddress(_id:string):Observable<any>
    {
      const token = localStorage.getItem('token');
      const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
    }
    return this._http.delete<any>("http://localhost:6868/address/"+token+"/"+_id,requestOptions).pipe(
        map(res=>JSON.parse(res) as Array<IAddress>),
        retry(3),
        catchError(this.handleError))
  }

    //Cập nhật địa chỉ mặc định của User
  updateAddressType(AddressId:string):Observable<any>
  {
    const token = localStorage.getItem('token');
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("http://localhost:6868/address/setDefault/"+token+"/"+AddressId,requestOptions).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }

  // Service liên quan đến ĐƠN HÀNG
    //Hiển thị dữ liệu Order của User
  getListOrder(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"json"
      }
    return this._http.get<any>("http://localhost:6868/order/list/"+token, requestOptions).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }

    // Hiển thị thông tin Address của 1 User
    getOneOrder(_id:string):Observable<any>
    {
      const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.get<any>("http://localhost:6868//orders/"+_id,requestOptions).pipe(
        map(res=>JSON.parse(res)),
        retry(3),
        catchError(this.handleError)
      )
    }

    // Thay đổi OrderStatus
  updateOrderStatus(id:string, aOrder:any){
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("http://localhost:6868/order/cancel-order/"+id,JSON.stringify(aOrder),requestOptions).pipe(
      map(res=>JSON.parse(res) as IOrder),
      retry(3),
      catchError(this.handleError))
  }
  // Service liên quan đến KHO VOUCHER
    //Hiển thị dữ liệu Order của User
  getListVoucher(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"json"
      }
    return this._http.get<any>("http://localhost:6868/voucher/list/"+token, requestOptions).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }
  // Service liên quan đến SẢN PHẨM YÊU THÍCH
    //Hiển thị dữ liệu Product của User
  getListProduct(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"json"
      }
    return this._http.get<any>("http://localhost:6868/product/list/"+token, requestOptions).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }

  changePassword(user: any, param:any): Observable<any> {
    return this._http.post<any>(`http://localhost:6868/change-pass-admin/${user._id}`, param).pipe(
      map(res => res),
      retry(3),
      catchError(this.handleError)
    )
  }

}

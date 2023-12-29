import { Component } from '@angular/core';
import { IProduct, Product } from '../models/Product';
import { ProductAPIService } from '../product-api.service';
import { CartService } from '../cart.service';
import { functionCustom } from '../custom-function/functionCustom';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  //paginate
  currentPage: any = 1
  totalPage: any
  perPage: number = 9
  listProductPerPage: any = []


  searchQueryReceive: any = ''
  product: IProduct[] = [];
  products: any;
  cart = []
  Category: any;
  errMessage: string = ''
  constructor(private route: ActivatedRoute,public _service: ProductAPIService, public _cart: CartService) {
    this.getList()
    this.searchQueryReceive= this.route.snapshot.paramMap.get("searchQuery")
   
    
    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      this.getListProductByCategory(category, 1);})
  }
  getList(fpage: any = 1) {
    this._service.getProducts().subscribe({
      next: (data: IProduct[]) => {
        this.listProductPerPage = []
        this.currentPage = fpage
        let pageTmp = Math.ceil(data.length / this.perPage)
        this.totalPage = Array(pageTmp)

        for (let i = (fpage - 1) * this.perPage; i < (fpage * this.perPage); i++) {
          if (data[i]) this.listProductPerPage.push(data[i])
        }

        if(this.searchQueryReceive != '' && this.searchQueryReceive != null && this.searchQueryReceive != undefined) {
          this.getListBySearchQuery()
        }
      },
      error: (err) => { this.errMessage = err }
    })
  }
  getListBySearchQuery() {
    const finalList = this.listProductPerPage.filter((item:any) => item.Name.includes(this.searchQueryReceive));
    this.listProductPerPage = finalList
  }

  getListProductByCategory(Category: any,fpage: any = 1) {
    this._service.getListProductByCategory(Category).subscribe({
      next: (data: IProduct[]) => {
        this.listProductPerPage = []
        this.currentPage = fpage
        let pageTmp = Math.ceil(data.length / this.perPage)
        this.totalPage = Array(pageTmp)

        for (let i = (fpage - 1) * this.perPage; i < (fpage * this.perPage); i++) {
          if (data[i]) this.listProductPerPage.push(data[i])
        }
      },
      error: (err) => { this.errMessage = err }
    })
    }
  getListProductByPrice(minprice: string, maxprice: string,fpage: any = 1) {
    this._service.getListProductByPrice(minprice, maxprice).subscribe({
      next: (data: IProduct[]) => {
        this.listProductPerPage = []
        this.currentPage = fpage
        let pageTmp = Math.ceil(data.length / this.perPage)
        this.totalPage = Array(pageTmp)

        for (let i = (fpage - 1) * this.perPage; i < (fpage * this.perPage); i++) {
          if (data[i]) this.listProductPerPage.push(data[i])
        }
      },
      error: (err) => { this.errMessage = err }
    })
  }
  getListProductByRate(rate:any,fpage: any = 1){
    this._service.getListProductByCategory(rate).subscribe({
      next: (data: IProduct[]) => {
        this.listProductPerPage = []
        this.currentPage = fpage
        let pageTmp = Math.ceil(data.length / this.perPage)
        this.totalPage = Array(pageTmp)

        for (let i = (fpage - 1) * this.perPage; i < (fpage * this.perPage); i++) {
          if (data[i]) this.listProductPerPage.push(data[i])
        }
      },
      error: (err) => { this.errMessage = err }})
  }

  addToCart(p: any) {
    this._cart.addToCart(p)
    alert("Bạn đã thêm sản phẩm thành công");
  }

  convertVND(price: any) {
    return functionCustom.convertVND(price)
  }

  changePage(page: any) {
    this.getList(page)
  }

  preAndNextHandler(type: any) {
    switch (type) {
      case 'pre': {
        this.currentPage -= 1
        if (this.currentPage == 0) this.getList(1)
        else this.getList(this.currentPage)
        break
      }
      case 'next': {
        this.currentPage += 1
        if (this.currentPage > this.totalPage.length) this.getList(1)
        else this.getList(this.currentPage)
        break
      }
    }
  }
}

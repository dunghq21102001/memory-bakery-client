import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { IProduct } from '../models/Product';
import { ProductAPIService } from '../product-api.service';
import { functionCustom } from '../custom-function/functionCustom';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  implements OnInit  {
  login: boolean = false
  currentPage: any = 1
  totalPage: any
  perPage: number = 4
  listProductPerPage: any = []

  errMessage: string = ''
  product: IProduct[] = [];
  products: any;
  backToTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  id: any;
  constructor(private router: Router, private authService: AuthService, private authGuard:AuthGuard, public _service: ProductAPIService) {
    this.login=this.authGuard.isLoggedIn()
  }
  ngOnInit() {
    this.id = localStorage.getItem('token');
    this.getList()
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
      },
      error: (err) => { this.errMessage = err }
    })
  }

  convertVND(price: any) {
    return functionCustom.convertVND(price)
  }

}

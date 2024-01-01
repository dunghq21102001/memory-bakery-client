import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { MyAccountService } from '../services/my-account.service';
import { ProductAPIService } from '../product-api.service';
import { CartService } from '../cart.service';
import { IProduct } from '../models/Product';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showHeader = false;
  login: boolean = false
  user: any;
  errMessage: any;
  currentPage: any = 1
  totalPage: any
  perPage: number = 9
  listProductPerPage: any = []
  product: IProduct[] = [];
  products: any;
  cart = []
  Category: any;
  isActive = false;
  values = '';

  onKey(event: any) {
    this.values = event.target.value;
  }
  constructor(public _service: ProductAPIService, public _cart: CartService,private accountService: MyAccountService,private router: Router, private authService: AuthService,private authGuard:AuthGuard) {
    this.login=this.authGuard.isLoggedIn()
    this.accountService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
    this.prevScrollpos = currentScrollPos;
  }

  prevScrollpos = window.pageYOffset;
  id: any;
  ngOnInit() {
    this.id = localStorage.getItem('token');
  }
  logout() {
    this.authService.logout();
    alert('Bạn đã đăng xuất');
    window.location.reload()
  }

  search() {
    if(this.values.trim() == '') return alert('Bạn phải nhập từ khoá bất kỳ để tìm kiếm')
    this.router.navigate(
        ['/listProduct', this.values] 
    ) 
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
}



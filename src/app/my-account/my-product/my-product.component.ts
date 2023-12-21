import { Component } from '@angular/core';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent {
  products: any[] = [];
  errMessage:any

  constructor(private accountService: MyAccountService) {
    this.accountService.getListProduct().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products)
      },
      error: (err) => {
        this.errMessage = err;
      }
    })
  }
}

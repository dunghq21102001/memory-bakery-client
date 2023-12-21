import { Component } from '@angular/core';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrls: ['./my-voucher.component.css']
})
export class MyVoucherComponent {
  user: any;
  vouchers: any[] = [];
  errMessage:any
  constructor(private accountService: MyAccountService) {
    this.accountService.getListVoucher().subscribe({
      next: (data) => {
        this.vouchers = data
        console.log(this.vouchers)
      },
      error: (err) => {
        this.errMessage = err;
      }
    })
  }
  copyVoucherCode(code: string) {
    const tempInput = document.createElement('input');
    tempInput.value = code;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }
  getUserDateOfBirth() {
    const dateOfBirth = new Date(this.user.Voucher.ExpireDate);
    const year = dateOfBirth.getFullYear();
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
    const day = dateOfBirth.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

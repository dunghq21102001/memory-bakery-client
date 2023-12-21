import { Component } from '@angular/core';
import swal from 'src/app/custom-function/swal2';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-my-pass-word',
  templateUrl: './my-pass-word.component.html',
  styleUrls: ['./my-pass-word.component.css']
})
export class MyPassWordComponent {
  user: any;
  errMessage:any
  constructor(private accountService: MyAccountService) { }

  ngOnInit(): void {
    this.accountService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    })
  }
  currP: any = ''
  newP: any = ''
  newPAgain: any = ''
  showPassword = false;
  newPassword = '';
  showNewPassword = false;
  showReNewPassword = false;

  toggleShowPassword(passwordType: string) {
    if (passwordType === 'current') {
      this.showPassword = !this.showPassword;
    } else if (passwordType === 'new') {
      this.showNewPassword = !this.showNewPassword;
    }else if (passwordType === 'reNew') {
      this.showReNewPassword = !this.showReNewPassword;
    }
  }

  changePass() {

    if (this.newP != this.newPAgain) return swal.error('Mật khẩu mới và xác nhận mật khẩu phải trùng nhau !!!', 3000)

    if (this.newP == ''
      || this.newPAgain == ''
      || this.currP == '') return swal.error('Phải điền đầy đủ thông tin để tiếp tục !!!', 3000)

    let param = {
      newPassword: this.newP,
      password: this.currP
    }
    this.accountService.changePassword(this.user, param).subscribe({
      next: (data) => {
        this.currP = ''
        this.newP = ''
        this.newPAgain = ''
        swal.success(data.message)
      }, error: (err) => swal.error(err)
    })
  }

}

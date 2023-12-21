import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { User, UserType } from '../models/User';
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: any = {};
  rePassword: any=''
  userType = new UserType('',[])
  user = new User('', '', '', '', '', '', '', '', '',this.userType,[],[],[],[],[]);
  password:any;
  error: boolean = false;
  loggedIn: boolean = false;
  loginData: string = '';
  errMessage: any;
  AgreeToTerms: boolean=false
  returnUrl: string ='/';


  constructor(private router:Router,private _service: ClientService){}
  postUser()
  {
    if (!this.user.UserName) {
      alert('Vui lòng điền tên đăng nhập');
      return;
    }
    if (!/^\d{10}$/.test(this.user.Phone)) {
      alert('SĐT không hợp lệ')
      return
    }
    if (!this.user.Password) {
      alert('Vui lòng nhập mật khẩu');
      return;
    }
    else if (this.user.Password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 kí tự');
      return;
    }
    if (!this.rePassword) {
      alert('Vui lòng xác minh mật khẩu');
      return;
    }
    else if (this.user.Password !== this.rePassword) {
      alert('Mật khẩu nhập lại không khớp');
      return;
    }
    if (!!!this.AgreeToTerms) {
      alert('Vui lòng đồng ý với các điều khoản của chúng tôi');
      return;
    }
  this.userType.TypeName = "Customer"
  this._service.postUser(this.user).subscribe({
  next:(data)=>{this.user=data
  if(this.user.UserName){
    alert("Bạn đã đăng kí thành công");
    localStorage.setItem('isLoggedIn', "true");
    localStorage.setItem('token', this.user.UserName);
    window.location.reload()
    window.location.replace('');
  } else{
    alert(`${data.message}`)
    window.location.reload()
  }
},
  error:(err)=>{this.errMessage=err}
  })

}}


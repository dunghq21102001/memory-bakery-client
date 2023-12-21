import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service' ;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string="";
  loginForm!: FormGroup;
  message: string='';
  returnUrl: string ='';
  errors:string=''
  dataUser: any
  Cart:any=[]
  constructor(
     private formBuilder: FormBuilder,
     private router: Router,
     private authService: AuthService,
    private loginService: ClientService,
    private cart:CartService
  ) { }
  ngOnInit() {
     this.loginForm = this.formBuilder.group({
        userid: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
     });
  }
// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

login() {
  if (this.loginForm.invalid) {
    return;
 }
 else{
  this.loginService.postLogin(this.f['userid'].value,this.f['password'].value).subscribe({
    next: (userData) => {

      console.log(userData.Cart);
      this.dataUser = userData;
      let listProducts = []
      listProducts.push(this.dataUser.Cart)

      if (localStorage.getItem('cart') && localStorage.getItem('cart')!.length > 0) {
        this.cart.postCart().subscribe({
          next: (cartData) => {
            console.log(cartData)
            let listProduct = []
            listProduct.push(cartData)
            localStorage.setItem('cart',JSON.stringify(listProduct).slice(1,-1))
            console.log('Cart data updated successfully');
          },
          error: (err) => {
            console.log('Error updating cart data:', err);
          }
        });
      } else {
        localStorage.setItem('cart',JSON.stringify(listProducts).slice(1,-1))
      }

      if (this.dataUser.UserName){
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f['userid'].value);
        window.location.reload()
        window.location.replace('');
      } else {
        alert(`${this.dataUser.message}`)
      }

    },
    error: (err) => {
      this.error = err;
    }
  });
}
}
}













  // model: any = {};
  // user:any;
  // password:any;
  // rememberMe: boolean = false;
  // error: boolean = false;
  // loggedIn: boolean = false;
  // loginData: string = '';
  // constructor(private router:Router){
  // }
  // login() {
  //   if (this.model.user === 'duongdv20406' && this.model.password === 'duong20406') {
  //     this.loggedIn = true;
  //     this.loginData = JSON.stringify(this.model);
  //     if (this.rememberMe) {
  //       localStorage.setItem('loginData', this.loginData);
  //     }
  //     this.router.navigate([''])
  //   } else {
  //     this.error = true;
  //   }
  // }


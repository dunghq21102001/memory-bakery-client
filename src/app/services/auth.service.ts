import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login():void{
    localStorage.setItem('isLoggedIn','true');
    localStorage.getItem('token');
  }
  logout() :void {
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    }
}

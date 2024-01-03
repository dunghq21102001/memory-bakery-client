import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { ListProductComponent } from './list-product/list-product.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentPolicyComponent } from './payment-policy/payment-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { MyAccountComponent } from './my-account/my-account.component';
const routes: Routes = [
  {path:"",component:MainComponent},
  {path:"aboutUs",component:AboutUsComponent},
  {path:"contact",component:ContactComponent},
  {path:"blog",component:BlogComponent},
  {path:"listProduct/:searchQuery",component:ListProductComponent},  
  {path:"listProduct",component:ListProductComponent},
  {path:"productdetail",component:ProductDetailComponent},
  {path:"promotion",component:PromotionComponent},
  {path:"getcart",component:CartComponent},
  {path:"checkout",component:CheckoutComponent,canActivate : [AuthGuard]},
  {path:"paymentPolicy",component:PaymentPolicyComponent  },
  {path:"privacyPolicy",component:PrivacyPolicyComponent},
  {path:"myAccount",component:MyAccountComponent,canActivate : [AuthGuard]},
  {path:"getlogin",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"blog/:id",component:BlogDetailComponent},
  {path:"detail/:id",component:ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

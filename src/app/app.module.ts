import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { ListProductComponent } from './list-product/list-product.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PromotionComponent } from './promotion/promotion.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentPolicyComponent } from './payment-policy/payment-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-account/my-profile/my-profile.component';
import { MyPassWordComponent } from './my-account/my-pass-word/my-pass-word.component';
import { MyAddressComponent } from './my-account/my-address/my-address.component';
import { MyOrderComponent } from './my-account/my-order/my-order.component';
import { MyEditProfileComponent } from './my-account/my-edit-profile/my-edit-profile.component';
import { MyVoucherComponent } from './my-account/my-voucher/my-voucher.component';
import { MyProductComponent } from './my-account/my-product/my-product.component';
import { MyReviewComponent } from './my-account/my-review/my-review.component';
import { MatchPasswordDirective } from './match-password.directive';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutUsComponent,
    ContactComponent,
    BlogComponent,
    ListProductComponent,
    HeaderComponent,
    FooterComponent,
    PromotionComponent,
    CartComponent,
    CheckoutComponent,
    PaymentPolicyComponent,
    PrivacyPolicyComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailComponent,
    BlogDetailComponent,
    MyAccountComponent,
    MyProfileComponent,
    MyPassWordComponent,
    MyAddressComponent,
    MyOrderComponent,
    MyEditProfileComponent,
    MyVoucherComponent,
    MyProductComponent,
    MyReviewComponent,
    MatchPasswordDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

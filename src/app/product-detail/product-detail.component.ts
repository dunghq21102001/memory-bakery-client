import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ProductAPIService } from '../product-api.service';
import { Product } from '../models/Product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnDestroy {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  product: any;
  products: any;
  id: any
  qty: any = 1
  size: any
  errMessage: string = ''
  isChangeValue: boolean = false;
  selectVariant: any;
  value = 1;
  modal: any;
  selectedSize: any;
  constructor(public _cart: CartService, private _service: ProductAPIService, private _route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.id = this._route.snapshot.params.id;
    this._service.getProduct(this.id).subscribe({
      next: (data) => {
        this.product = data
        this._service.getListProductByCategory(this.product.Category).subscribe({
          next: (data) => {
            this.products = data
            this.isChoose(this.product.Variant[0].Size, this.product)
          },
          error: (err) => { this.errMessage = err }
        })
      },
      error: (err) => { this.errMessage = err }
    })
    //
    const imgShowcase = document.querySelector(".img-showcase")!;
    const imgItems = document.querySelectorAll(".img-item")!;

    if (imgShowcase) {
      imgItems.forEach((imgItem) => {
        const img = imgItem.querySelector("img")!;
        imgItem.addEventListener("mouseover", () => {
          if (imgShowcase.querySelector("img")) {
            imgShowcase.querySelector("img")!.src = img.src;
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', slideImage);
  }
  ngAfterViewInit() {
    const mySwiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    const imgShowcase = document.querySelector(".img-showcase")!;
    const imgItems = document.querySelectorAll(".img-item")!;
    imgItems.forEach((imgItem) => {
      const img = imgItem.querySelector("img")!;
      imgItem.addEventListener("mouseover", () => {
        imgShowcase.querySelector("img")!.src = img.src;
      });
    });
  }

  onInputChange(event: any) {
    let inputValue: number = +event.target.value;

    console.log('giá trị ban đầu: ' + inputValue);

    if (inputValue <= 0 || isNaN(inputValue)) {
      this.qty = 1;
      console.log('giá trị sau khi sửa đổi: ' + this.qty);

    } else {
      this.qty = inputValue;
      console.log('giá trị sau khi sửa đổi 2: ' + this.qty);
    }
  }

  decreaseValue(quantity: any): void {

    if (quantity > 1) { // Kiểm tra số lượng lớn hơn 1 để tránh giá trị âm hoặc bằng 0
      const newQuantity = quantity - 1;
      const quantityInput = document.getElementById("quantity1") as HTMLInputElement; // Lấy thẻ input số lượng
      quantityInput.value = newQuantity.toString(); // Cập nhật giá trị số lượng mới
    }
  }
  increaseValue(quantity: any): void {
    const quantityInput = document.getElementById("quantity1") as HTMLInputElement; // Lấy thẻ input số lượng
    const quantityValue = parseInt(quantityInput.value); // Chuyển đổi giá trị số lượng từ chuỗi thành số nguyên
    if (!isNaN(quantityValue)) { // Kiểm tra nếu giá trị không phải NaN (Not a Number)
      const newQuantity = quantityValue + 1; // Thực hiện phép tính số học với giá trị số lượng
      quantityInput.value = newQuantity.toString(); // Cập nhật giá trị số lượng mới vào thẻ input
    }
  }
  addToCart(p: any) {
    let cart = localStorage.getItem('cart')
    let listProduct = []
    let isIncrease = false
    if (!cart) {
      p.qty = this.qty
      p.size = this.size
      listProduct.push(p)
      localStorage.setItem('cart', JSON.stringify(listProduct))
      alert("Bạn đã thêm sản phẩm thành công");

    } else {
      listProduct = JSON.parse(cart)
      listProduct.map((pro: any) => {
        if (pro._id == p._id && p.Variant.some((variant: any) => variant.Size === pro.size.Size)) {
          pro.qty++;
          isIncrease = true;
          return;
        }
      })
      if (isIncrease == false) {
        if (this.qty > 0) {
          p.qty = this.qty
          p.size = this.size
          listProduct.push(p)
        }
        else { alert('Nhập số lượng >0') }
      }
      localStorage.setItem('cart', JSON.stringify(listProduct))
      alert("Bạn đã thêm sản phẩm thành công");

    }
    alert("Bạn đã thêm sản phẩm thành công");

  }
  addToCart1(p: any) {
    this._cart.addToCart(p)
    alert("Bạn đã thêm sản phẩm thành công");
  }
  isChoose(event: any, product: any) {
    this.isChangeValue = true
    const selectedVariant = { ...product.Variant.find((v: any) => v.Size === event) };
    // Thêm thuộc tính parent_id vào variant được chọn
    selectedVariant.parent_id = product._id;
    this.selectVariant = selectedVariant;
    this.size = selectedVariant
    this.modal = document.querySelector(".product-variation");
    this.modal.classList.add("product-variation--selected");
  }

  convertVND(price: any) {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

}
function slideImage(this: Window, ev: UIEvent) {
  throw new Error('Function not implemented.');
}


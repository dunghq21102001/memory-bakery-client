import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MyAccountService } from '../services/my-account.service';
import { LocationService } from '../services/location.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IAddress } from '../models/Users';
import { CartService } from '../cart.service';
import { IOrders, OrderDetail } from '../models/Order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  modal: any
  modal2: any
  modal3: any
  modal4: any
  isShowModelAdd: boolean = false
  isShowCheckout: boolean = false
  order = new IOrders()
  addressDefault: any = ''
  shippingFeeValue: any
  data: any = []
  listInCart: any = []
  addresses: any;
  errMessage: any;
  cities: any[] = [];
  discountMessage: any = '1'
  selectedAddress: any;
  selectedAddresss: any
  originalAddresses: any
  address = new IAddress()
  constructor(private cartService: CartService, private accountService: MyAccountService, cdRef: ChangeDetectorRef, private router: Router, private locationService: LocationService, private activateRoute: ActivatedRoute) {
    this.getListAddress();
    this.getAddressDefault()
    console.log(this.addressDefault);


    this.cartService.currentMessage.subscribe(message => {
      this.discountMessage = message;
    });

    console.log(this.discountMessage);
    this.cities = []
    this.locationService.getCities().subscribe({
      next: (data) => {
        this.cities = data
      },
      error: (err) => (this.errMessage = err)
    });

    // Lấy _id của địa chỉ
    activateRoute.paramMap.subscribe((param: ParamMap) => {
      let id = param.get("id");
      if (id != null) {
        this.accountService.getOneAddress(id).subscribe({
          next: (data) => {
            this.selectedAddress = data;
          },
          error: (err) => {
            this.errMessage = err;
            console.log(this.errMessage);
          }
        })
      }
    })
  }

  updateTypeAddress() {
    let selectedId = ''
    this.addresses.map((item: any) => {
      if (item.AddressType == 'Default') {
        selectedId = item._id
        return
      }
    })

    return this.accountService.updateAddressType(selectedId).subscribe({
      next: (data) => {
        window.location.reload()
      },
      error: (err) => {
        window.location.reload()
        this.errMessage = err;
      }
    })
  }


  getListAddress() {
    this.accountService.getListAddress().subscribe({
      next: (data) => {
        this.addresses = data;
        this.originalAddresses = data
      },
      error: (err) => {
        this.errMessage = err;
      }
    })
  }

  getAddressDefault() {
    this.accountService.getListAddress().subscribe({
      next: (data) => {
        this.addresses = data;
        // Find the default address
        const defaultAddress = this.addresses.find((address: { AddressType: string; }) => address.AddressType === "Default");

        // Set the default address as the selected address
        if (defaultAddress) {
          this.selectedAddresss = defaultAddress;
        }
      },
      error: (err) => {
        this.errMessage = err;
      }
    })
  }

  deleteAddress(id: string) {
    if (confirm("Bạn có muốn xoá?") == true) {
      this.accountService.deleteAddress(id).subscribe({
        next: (data) => {
          this.getListAddress();
          location.reload();
        },
        error: (err) => {
          this.errMessage = err;
        }
      })
    }
  }
  isDefaultAddress: boolean = false;

  CheckDefaultAddress(address: IAddress) {
    this.selectedAddresss = address;
  }
  convertVND(price: any) {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }
  ngOnInit() {
    this.modal = document.querySelector(".modal");
    // this.modal2 = document.querySelector(".modal2");
    // this.modal3 = document.querySelector(".modal3");
    // this.modal4 = document.querySelector(".modal4");
    this.listInCart = localStorage.getItem('cart')
    this.data = JSON.parse(this.listInCart)
    const shippingFeeElement = document.getElementById("shipping-fee")!;
    const checkoutElement = document.getElementById("title-checkout")!;
    const dobMethodElement = document.getElementById("DOB-method")! as HTMLInputElement;
    const dobCheckoutElement = document.getElementById("DOB-checkout")! as HTMLInputElement;
    const storeMethodElement = document.getElementById("store-method")! as HTMLInputElement;
    const visaMethodElement = document.getElementById("visa-method")! as HTMLInputElement;
    const momoMethodElement = document.getElementById("momo-method")! as HTMLInputElement;
    const updateShippingFee = (): void => {
      if (dobMethodElement.checked) {
        this.convertVND(shippingFeeElement.innerText = "20000");
      } else if (storeMethodElement.checked) {
        this.convertVND(shippingFeeElement.innerText = "0");
      }
      this.shippingFeeValue = parseInt(shippingFeeElement.innerText);
    }
    const updateCheckout = (): void => {
      if (visaMethodElement.checked) {
        this.convertVND(checkoutElement.innerText = "Thanh toán bằng VNPAY");
      } else if (momoMethodElement.checked) {
        this.convertVND(checkoutElement.innerText = "Thanh toán bằng MOMO");
      }
      else if (dobCheckoutElement.checked) {
        this.convertVND(checkoutElement.innerText = "Thanh toán khi nhận hàng (COD)");
      }
    }
    // Thêm sự kiện change vào các phần tử radio button
    dobMethodElement.addEventListener("change", updateShippingFee);
    storeMethodElement.addEventListener("change", updateShippingFee);
    visaMethodElement.addEventListener("change", updateCheckout);
    momoMethodElement.addEventListener("change", updateCheckout);
    dobCheckoutElement.addEventListener("change", updateCheckout);

  }

  showAddModel() {
    this.isShowModelAdd = true
  }

  postAddress() {
    this.accountService.postAddress(this.address).subscribe({
      next: (data) => {
        this.getListAddress();
        this.isShowModelAdd = false;
        window.location.reload()
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }

  chooseDefault(id: any) {
    this.addresses.forEach((address: any) => {
      if (address._id === id) {
        address.AddressType = 'Default';
      } else {
        address.AddressType = '';
      }
    });

  }

  districts: any[] = [];
  selectedDistrictName: string = '';
  Wards: any[] = [];
  selectedWardName: string = '';
  onCityChange(): void {
    console.log(this.address.City);

    this.districts = [];
    this.selectedDistrictName = '';
    this.Wards = [];
    this.selectedWardName = '';

    const selectedCity = this.cities.find(city => city.Name === this.address.City);

    if (selectedCity) {
      this.districts = selectedCity.Districts;
    }
  }
  onDistrictChange(): void {
    this.Wards = [];
    this.selectedWardName = '';

    const selectedDistrict = this.districts.find(district => district.Name === this.address.Town);

    if (selectedDistrict) {
      this.Wards = selectedDistrict.Wards;
    }
  }
  // Đóng Modal khi click ra ngoài phạm vi của Modal
  @HostListener('document:click', ['$event'])
  public onClick(event: any): void {
    if (event.target.classList.contains('modal')) {
      this.closeAddressNew();
    }
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.data) {
      totalPrice += item.size.PromotionPrice * item.qty;
    }
    return totalPrice;
  }
  updateQty(item: any) {
    if (item.qty < 1 || item.qty > 99) return alert('Phải nhập số lượng lớn hơn 0')
    this.data.map((i: any) => {
      if (i._id == item._id) i.qty = item.qty
      return
    })
    localStorage.setItem('cart', JSON.stringify(this.data))
  }
  showModal() {
    this.modal.classList.add("open");
  }

  hideModal() {
    this.modal.classList.remove("open");
    this.addresses = this.originalAddresses
  }

  showModal2() {
    this.modal2.classList.add("open");
  }

  hideModal2() {
    this.modal2.classList.remove("open");
  }

  showModal3() {
    this.modal3.classList.add("open");
  }
  showModal4() {
    this.modal4.classList.add("open");
  }
  hideModal3() {
    this.modal3.classList.remove("open");
  }
  hideModal4() {
    this.modal4.classList.remove("open");
  }
  showAddAddress: boolean = false;
  showEditAddress: boolean = false;
  showAddressNew() {
    this.showAddAddress = true;
    this.showEditAddress = false;
  }
  closeAddressNew() {
    this.showAddAddress = false
  }

  postOrder() {

    this.order.OrderDate = new Date(Date.now())
    this.order.OrderStatus = "Chờ xác nhận"
    this.order.Details = [];
    this.order.CostShip = this.shippingFeeValue
    // Lặp qua mảng các sản phẩm và thêm các chi tiết đơn hàng vào đối tượng Order
    for (const item of this.data) {
      const detail = new OrderDetail({
        ProductID: item._id,
        ProductName: item.Name,
        Size: item.size.Size,
        UnitPrice: item.size.PromotionPrice,
        Quantity: item.qty,
        LineTotal: item.size.PromotionPrice * item.qty,
        ReviewStatus: ''
      });
      this.order.Details.push(detail);
      let Subtotal = 0
      Subtotal += item.size.PromotionPrice * item.qty
      this.order.SubTotal = Subtotal + this.order.CostShip
    }

    this.cartService.postOrder(this.order).subscribe({
      next: (data) => { this.order = data },
      error: (err) => { this.errMessage = err }
    })
    localStorage.setItem('cart', JSON.stringify([]));
    this.cartService.postCart().subscribe({
      next: (data) => { },
      error: (err) => { this.errMessage = err }
    })
    this.router.navigate(['myAccount'])
  }
}

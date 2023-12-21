import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/models/Users';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  orders: any;
  errMessage:any;
  statusOptions = ["Tất cả", "Chờ xác nhận", "Đang giao hàng", "Đã giao", "Đã huỷ"]
  filteredOrders: any[] = []; // tạo biến lưu trữ danh sách các đơn hàng đã được lọc
  selectedStatus: string = 'Tất cả';
  buttonLabel:string=""
  selectedOrder:any;
  Order = new IOrder()
  activateRoute: any;
  canceledOrders: any[] = [];

  constructor(private accountService: MyAccountService, activateRoute:ActivatedRoute,private router:Router) {
    this.getListOrder();
  }
  getListOrder() {
    this.accountService.getListOrder().subscribe({
      next: (data) => {
        this.orders=data
        // Lọc danh sách các đơn hàng theo trạng thái đã chọn
        this.filteredOrders = this.orders.filter((order: { OrderStatus: string; }) => order.OrderStatus === this.selectedStatus || this.selectedStatus === 'Tất cả');
        // Lọc danh sách các đơn hàng đã huỷ
        this.canceledOrders = this.orders.filter((order: { OrderStatus: string; }) => order.OrderStatus === 'Đã huỷ');
      },
      error: (err) => {
        this.errMessage = err;
        console.log(this.errMessage)
      }
    })
  }
  // Hàm này để chuyển đổi trang thái của Order, bấm qua từng Status thì chỉ hiện Order có Status đó thôi
  filterOrders(status: string): void {
    this.selectedStatus = status;
    if (status === 'Đã huỷ') {
      this.filteredOrders = this.canceledOrders;
    } else {
      this.filteredOrders = this.orders.filter((order: { OrderStatus: string; }) => order.OrderStatus === this.selectedStatus || this.selectedStatus === 'Tất cả');
    }
  }
  getButtonClickAction(order: any): void {
    if (order.OrderStatus === 'Đã huỷ') {
      this.showOrderCancel(order._id);
    } else if (order.OrderStatus === 'Chờ xác nhận') {
      this.showOrderEdit(order._id);
    } else if(order.OrderStatus === 'Đã giao') {
      this.router.navigate(['/listProduct'])
    }
  }


  // Nếu Order Status là Đã giao và Đã huỷ --> Button có tên Mua lại
  // Nếu Order Status là "Chờ xác nhận" --> Button có tên là Huỷ Đơn
  // Nếu Order Status là "Đang giao" --> Button có tên Xem chi tiết đơn hàng
  getButtonLabel(order: any): string {
    if (order.OrderStatus === 'Đã giao') {
      return 'Mua lại';
    } else if (order.OrderStatus === 'Chờ xác nhận') {
      return 'Huỷ đơn';
    }else if (order.OrderStatus === 'Đang giao') {
      return 'Đã nhận được hàng';
    } else {
      return "Xem chi tiết đơn huỷ";
    }
  }

  // Update lại trạng thái Order
  // Khai báo thuộc tính otherReason để lưu giá trị của input
  otherReason: string = "";

  updateOrderStatus(id:string,aOrder:any) {
    if (this.isOtherReasonSelected) {
      this.selectedOrder.Reason = this.otherReason;
    } else {
      this.otherReason = "";
    }
    this.selectedOrder.CancelTime=new Date(Date.now())
    this.accountService.updateOrderStatus(id,aOrder).subscribe({
      next: (data) => {
        this.getListOrder();
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
    window.location.reload();
    this.closeOrderDetail();
  }

  // Hàm cắt ký tự và hiển thị giá trị đơn hàng
  formatOrderId(orderId: string): string {
    return '#MLB' + orderId.slice(-3);
  }

  // Lấy Id
  getOneOrder(orderId:string) {
    this.accountService.getOneOrder(orderId).subscribe({
      next: (data) => {
        this.selectedOrder = data;
        console.log(this.selectedOrder)
        // Assign selected product values to book
        this.Order = this.selectedOrder;
      },
      error: (err) => {
        this.errMessage = err;
        console.log(this.errMessage);
      }
    })
  }
  showEditOrder: boolean = false;
  showOrderEdit(orderId: string) {
    this.showEditOrder=true;
    this.getOneOrder(orderId)

  }
  closeOrderDetail() {
    this.showEditOrder = false
  }

  showCancelOrder: boolean = false;
  showOrderCancel(orderId: string) {
    this.showCancelOrder=true;
    this.getOneOrder(orderId)

  }
  closeOrderCancel() {
    this.showCancelOrder = false
  }

  isOtherReasonSelected = false;

  onReasonChange() {
    // Nếu giá trị được chọn là "Khác"
    if (this.selectedOrder.Reason === "Khác") {
      // Thì cho phép hiển thị input
      this.isOtherReasonSelected = true;
    } else {
      // Ngược lại, ẩn input đi
      this.isOtherReasonSelected = false;
    }
  }

  // Đóng Modal khi click ra ngoài phạm vi của Modal
@HostListener('document:click', ['$event'])
public onClick(event: any): void {
  if (event.target.classList.contains('modal')) {
    this.closeOrderDetail();
    this.closeOrderCancel()
  }
}
}

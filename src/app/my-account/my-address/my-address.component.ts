import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import swal from 'src/app/custom-function/swal2';
import { IAddress } from 'src/app/models/Users';
import { LocationService } from 'src/app/services/location.service';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent {
  addresses: any;
  cities: any[] = [];
  errMessage:any;
  selectedAddress:any; //Lấy thông tin địa chỉ của 1 _id cố định

  constructor(private accountService: MyAccountService,private cdRef: ChangeDetectorRef, private locationService: LocationService,private activateRoute:ActivatedRoute) {
    this.cities=[]
    this.locationService.getCities().subscribe( {
      next:(data)=>{
        this.cities=data;
      },
      error:(err)=>(this.errMessage=err)
    });
    this.getListAddress();
  }
  // Hiển thị danh sách địa chỉ của User
  getListAddress() {
    this.accountService.getListAddress().subscribe({
      next: (data) => {
        this.addresses = data;
        this.CheckDefaultAddress(); // Kiểm tra địa chỉ mặc định
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }

  isDefaultAddress: boolean = false;
  // Kiểm tra xem có địa chỉ mặc định hay không
  CheckDefaultAddress() {
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].AddressType === "Default") {
        this.isDefaultAddress = true;
        break;
      }
    }
  }

  // Thiết lập để hiển thị Cập nhật địa chỉ hay Thêm địa chỉ mới
  showAddAddress: boolean = false;
  showEditAddress: boolean = false;
  showAddressNew() {
    this.showAddAddress = true;
    this.showEditAddress = false;

    // Kiểm tra nếu người dùng chưa có địa chỉ nào hoặc không có địa chỉ mặc định
    if (this.addresses.length === 0 || !this.isDefaultAddress) {
      // Tạo một địa chỉ mới với AddressType là ""
      const newAddress: IAddress = {
        AddressName: '',
        AddressPhone: '',
        City: '',
        Town: '',
        Ward: '',
        DetailAddress: '',
        AddressType: ''
      };

      // Gán địa chỉ mới cho biến address
      this.address = { ...newAddress }; // Tạo một bản sao của địa chỉ mới để tránh tham chiếu cùng vùng nhớ
    } else {
      // Nếu người dùng đã có địa chỉ mặc định, đặt các trường thông tin trống
      this.address = {
        AddressName: '',
        AddressPhone: '',
        City: '',
        Town: '',
        Ward: '',
        DetailAddress: '',
        AddressType: ''
      };
    }
  }

  closeAddressNew() {
    this.showAddAddress = false
  }

  Address=new IAddress()
  showAddressEdit(AddressId: string) {
    this.showEditAddress = true;
    this.showAddAddress = false;
    this.accountService.getOneAddress(AddressId).subscribe({
      next: (data) => {
        this.selectedAddress = data;
        console.log(data);

        // Assign values to City, Town, and Ward properties
        this.selectedAddress.City = data.City;
        this.selectedAddress.Town = data.Town;
        this.selectedAddress.Ward = data.Ward;

        this.Address = this.selectedAddress;
      },
      error: (err) => {
        this.errMessage = err;
        console.log(this.errMessage);
      }
    });
  }





  putAddress(aAddress:any){
    if (this.selectedAddress.AddressName == ''
    || this.selectedAddress.AddressPhone == ''
    || this.selectedAddress.City == ''
    || this.selectedAddress.Town == ''
    || this.selectedAddress.Ward == ''
    || this.selectedAddress.DetailAddress == '') return swal.error('Phải nhập tất cả các thông tin để cập nhật địa chỉ!', 2000)
    this.accountService.putAddress(aAddress).subscribe({
      next: (data) => {
        this.getListAddress();
        this.showEditAddress = false;
        swal.success(data.message ?? 'Đã chỉnh sửa địa chỉ thành công',2000)
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
  closeAddressEdit() {
    this.showEditAddress = false
  }

  // Thêm địa chỉ mới
  address=new IAddress()
  postAddress() {
    if (
      this.address.AddressName == '' ||
      this.address.AddressPhone == '' ||
      this.address.City == '' ||
      this.address.Town == '' ||
      this.address.Ward == '' ||
      this.address.DetailAddress == ''
    ) {
      return swal.error('Phải nhập tất cả các thông tin để tạo mới địa chỉ!', 2000);
    }

    if (!this.isDefaultAddress) {
      // Nếu không có địa chỉ mặc định, thiết lập AddressType là "Default"
      this.address.AddressType = 'Default';
    }

    this.accountService.postAddress(this.address).subscribe({
      next: (data) => {
        this.getListAddress();
        this.showAddAddress = false;
        swal.success(data.message ?? 'Đã tạo mới địa chỉ thành công', 2000);
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }


  // Xoá địa chỉ
  deleteAddress(id: string) {
    if (confirm("Bạn có muốn xoá?")==true)
    {
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
  public handleDismiss(dismissMethod: any): void {
  }
  faEdit = faEdit
  // Thay đổi địa chỉ mặc định
  putAddressDefault(id: string){
    this.accountService.putAddressDefault(id).subscribe({
      next: (data) => {
        this.getListAddress();

        swal.success(data.message ?? 'Đã đặt địa chỉ mặc định thành công', 2000);
      },
      error: (err) => {
        this.errMessage = err;
      }
  })
  }


  // Hiển thị các option Tỉnh/thành phố --> Quận/Thị xã --> Phường/Xã
  districts: any[] = [];
  selectedDistrictName: string = '';
  Wards: any[] = [];
  selectedWardName: string = '';

  onCityChange(): void {
    console.log(this.address.City);

    this.districts = [];
    this.selectedDistrictName = '';
    this.Wards=[];
    this.selectedWardName='';

    const selectedCity = this.cities.find(city => city.Name === this.address.City);

    if (selectedCity) {
      this.districts = selectedCity.Districts;
    }
  }
  onDistrictChange():void{
    this.Wards=[];
    this.selectedWardName='';

    const selectedDistrict = this.districts.find(district=>district.Name === this.address.Town);

    if(selectedDistrict){
      this.Wards=selectedDistrict.Wards;
    }
  }
// Đóng Modal khi click ra ngoài phạm vi của Modal
@HostListener('document:click', ['$event'])
public onClick(event: any): void {
  if (event.target.classList.contains('modal')) {
    this.closeAddressNew();
    this.closeAddressEdit()
  }
}
}

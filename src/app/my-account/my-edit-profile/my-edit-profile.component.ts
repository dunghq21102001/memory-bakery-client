import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyAccountService } from 'src/app/services/my-account.service';

@Component({
  selector: 'app-my-edit-profile',
  templateUrl: './my-edit-profile.component.html',
  styleUrls: ['./my-edit-profile.component.css']
})
export class MyEditProfileComponent {
  user: any;
  errMessage: any;
  Edituser: any;
  constructor(private accountService: MyAccountService) {
    this.getUser();
  }
  // Hàm Get thông tin User
  getUser(){
    this.accountService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        this.Edituser = this.user;
        console.log(this.user);
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
  // Hàm chỉnh sửa Put thông tin User
  putUser() {
    this.accountService.putUser(this.Edituser).subscribe({
      next: (data) => {
        this.getUser();
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
  //Chuyển đổi thành DD/MM/YYYY
  getUserDateOfBirth() {
    const dateOfBirth = new Date(this.user.DateOfBirth);
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
    const day = dateOfBirth.getDate().toString().padStart(2, '0');
    const year = dateOfBirth.getFullYear();
    return `${year}/${month}/${day}`;
  }
  // Ghi nhận hình ảnh và chuyển sang dạng Base64
  @Input()
  requiredFileType:any;
  fileName = '';
  uploadProgress:number=0;
  uploadSub: Subscription=new Subscription();
  onFileSelected(event:any) {
    let me = this;
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.Edituser.Image = reader.result!.toString();
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
    this.Edituser.Image=this.fileName
    this.user.Image=this.fileName
  }
  cancelUpload() {
    this.uploadSub.unsubscribe();
  this.reset();
  }
  reset() {
  this.uploadProgress = 0;
  this.uploadSub = new Subscription();
  }
  // Hiển thị lại Detail
  showDetail: boolean = false;
  showDetailProfile() {
    this.showDetail = true;
  }
  onClick() {
    this.putUser();
    this.showDetailProfile();
  }

  ChangePassWord() {
    this.accountService.putUser(this.Edituser.Pass).subscribe({
      next: (data) => {
        this.getUser();
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-infor-admin',
  templateUrl: './infor-admin.component.html',
  styleUrls: ['./infor-admin.component.css']
})
export class InforAdminComponent implements OnInit {
  users!:any;
  title:string="THÔNG TIN ADMIN HIỆN TẠI"
  formAdmin !: FormGroup;

  constructor(
    private api:ApiService,
    private formbuilber:FormBuilder
  ) { }

  ngOnInit(): void {
    this.api.getUser()
    .subscribe(res=>{
      this.users = res;
      this.users.forEach((item:any)=>{
        if (localStorage.getItem("id")==item.id){
          this.formAdmin = this.formbuilber.group({
            name:[item.name],
            email:[item.email],
            phone_number:[item.phone_number],
            adress:[item.adress],
          })
        }
      })
      })
  }
  updateAdmin(){

  }
}

@Component({
  selector: 'change_password',
  templateUrl: 'change-password.html',
  styleUrls: ['./infor-admin.component.css']
})
export class changePasswordComponent {
  title:string="ĐỔI MẬT KHẨU CHO TÀI KHOẢN";
  formAdmin !: FormGroup;
  constructor(
    private api:ApiService,
    private formbuilber:FormBuilder
    ) {}
  
  ngOnInit(): void {
    this.formAdmin = this.formbuilber.group({
      password_old:[""],
      password_new:[""],
    })
  }
  updateAdmin(){

  }
}

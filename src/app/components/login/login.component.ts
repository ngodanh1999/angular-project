import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'src/app/shared/api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  notify:any;
  item!:any;

  login:any = FormGroup;
  users:any= [];

  
  constructor(private fb:FormBuilder, 
              private router:Router,
              private api:ApiService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.compose([Validators.required,Validators.nullValidator])],
    })
    this.api.getUser().subscribe(data=>{
      this.users = data;
    })
  }
  loginSubmit(data:any){
    if(data.username){
      this.users.forEach((item:any) => {
          if(item.username === data.username && item.password === data.password){
            
            localStorage.setItem("isLoggedIn","true");
            localStorage.setItem("name",item.username);
            localStorage.setItem("id",item.id);
            this.router.navigate(['dashboard/home']);
            this.toastr.success('Đăng nhập thành công');
            this.item=item;
          }
        }
      )
      if(this.item == null){
        this.toastr.error('Đăng nhập thất bại do tên đăng nhập hoặc mật khẩu không đúng!');
      }
    }
  }
  gotToSingup(){
    this.router.navigate(['register']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel} from'../../model/user.model'
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register:any = FormGroup;
  UserlObj: UserModel = new UserModel();
  users!:any;

  acceptAcc!: any;
  constructor(private fb:FormBuilder, 
              private router:Router,
              private form:FormBuilder,
              private api:ApiService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      username:['',Validators.required],
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.nullValidator])],
      })
      this.api.getUser().subscribe(data=>{
        this.users = data;
      })
  }

  RegisterSubmit(){
    if(this.register.value.username){
      this.users.forEach((item:any) => {
          if(item.username === this.register.value.username ){
            this.toastr.error('User name have been created');
            console.log(item.username)
            console.log(this.register.value.username)
            return this.acceptAcc = null;
            
          }
          else if (item.email === this.register.value.email){
            this.toastr.error('Eamil have been created');
            return this.acceptAcc=null;
          }
          else{
          return this.acceptAcc=item;
          }
        }
      )
      if (this.acceptAcc !== null){
        this.UserlObj.username = this.register.value.username;
      this.UserlObj.name = this.register.value.name;
      this.UserlObj.email = this.register.value.email;
      this.UserlObj.password = this.register.value.password;
      this.api.postUser(this.UserlObj)
      .subscribe(res=>{
          console.log(res);
          this.toastr.success('Thêm tài khoản thành công');
          let ref = document.getElementById('cancel')
          ref?.click();
          this.register.reset();
        },
        err=>{
          alert("Something went wrong")
        })
        }
    }
    else {
      this.toastr.error('User Name not null');
    }
    
  }

}

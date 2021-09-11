import { flatten } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users:any= [];

 

  constructor(
    private router:Router,
    private api:ApiService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.users = res;
    })
  }
  logout(){
    this.router.navigate(["login"]);
    localStorage.clear();
    this.toastr.info('See you again');
  }
}

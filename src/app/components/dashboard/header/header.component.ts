import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  

  logout(){
    const dialogRef = this.dialog.open(QuestionAgainLogout, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
        this.router.navigate(["login"]);
        localStorage.clear();
        this.toastr.info('See you again');
    }
    });
    
  }

  refresh(): void {
    window.location.reload();
  }
  viewProfile(){

  }
}
@Component({
  selector: 'question_again',
  templateUrl: 'questionagain.html',
  styleUrls: ['./header.component.css']
})
export class QuestionAgainLogout {
  constructor(public dialogRef: MatDialogRef<HeaderComponent>,
    ) {}
  
  ngOnInit(): void {

  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}

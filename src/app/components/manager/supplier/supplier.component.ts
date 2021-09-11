import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from 'src/app/model/suplier.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  formSupplier !: FormGroup;
  SupplierModelObj: SupplierModel = new SupplierModel();
  getSupplierData !: any;

  filtered !: any[];
  filterBySub!:any;

  
  id: number=0;
  name!:string;
  email!:string;
  address!:string;
  phone!:string;

  constructor(
    private formbuilber: FormBuilder,
    private api:ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.getAllSupplier()
  }
  getAllSupplier(){
    this.api.getSupplier()
    .subscribe(res=>{
      this.getSupplierData = res;
      this.filtered = [...this.getSupplierData];
    })
  }
  deleteSupplier(row:any){
    this.api.deleteSupplier(row.id)
    .subscribe(res=>{
      alert("Delete Supplier successfully");
      this.getAllSupplier();
    })
  }

  filter() {
    this.filtered = [...this.getSupplierData
      .filter((row: { name: string | any[]; }) => row.name
      .includes(this.filterBySub.toUpperCase()))];
      console.log(this.getSupplierData.name)
  }
  
  openDialog(){
    const dialogRef = this.dialog.open(SuplierDialog, {
      data: {
        name: this.name, 
        email: this.email,
        address: this.address,
        phone: this.phone,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllSupplier();
    });
  }
  
  openDialogEdit(row:any): void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data={
      id:row.id,
      name:row.name,
      phone: row.phone,
      address:row.address,
      email:row.email,
    }
    console.log(dialogConfig.data)
    const dialogRef=  this.dialog.open(SuplierDialog,dialogConfig)
    dialogRef.afterClosed().subscribe(data => {
      this.getAllSupplier();
    }
    ); 
}
}


@Component({
  selector: 'supplier_dialog',
  templateUrl: 'supplier_dialog.html',
  styleUrls: ['./supplier.component.css']
})
export class SuplierDialog {
  formSupplier !: FormGroup;
  getSupplierData !: any;

  title!:any;

  btnAdd:boolean=false;
  btnUpdate:boolean=false;

  filtered !: any[];
  filterBySub!:any;

  row!:any;
  constructor(
    public dialogRef: MatDialogRef<SuplierDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierModel,
    private formbuilber: FormBuilder,
    private api:ApiService,
    private toastr: ToastrService,) {}
  
  ngOnInit(): void {
      this.formSupplier = this.formbuilber.group({
        name:[''],
        email:[''],
        address:[''],
        phone:[''],
      })

      this.getAllSupplier();
      this.onEdit(this.row);
      if(this.data.id == undefined){
        this.title = "Thêm Mới Nhà Cung cấp";
        this.btnAdd= true;
        this.btnUpdate=false;
      }
      else{
        this.title = "Chỉnh sửa thông tin Nhà Cung cấp";
        console.log(this.row)
        this.btnAdd= false;
        this.btnUpdate=true
      }
     
    }
  
    postSupplierDetails(){
      this.data.name = this.formSupplier.value.name;
      this.data.email = this.formSupplier.value.email;
      this.data.address = this.formSupplier.value.address;
      this.data.phone = this.formSupplier.value.phone;
      
      this.api.postSupplier(this.data)
      .subscribe(res=>{
          console.log(res);
          this.toastr.success('Thêm Nhà Cung cấp thành công');
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formSupplier.reset();
          this.getAllSupplier();
        },
        err=>{
          alert("Something went wrong")
        })
    }
  
    getAllSupplier(){
      this.api.getSupplier()
      .subscribe(res=>{
        this.getSupplierData = res;
        this.filtered = [...this.getSupplierData];
      })
    }
    onEdit(data:any){
      this.formSupplier.controls['name'].setValue(this.data.name);
      this.formSupplier.controls['email'].setValue(this.data.email);
      this.formSupplier.controls['address'].setValue(this.data.address);
      this.formSupplier.controls['phone'].setValue(this.data.phone);
    }
  
    updateSupplier(){
      this.data.name = this.formSupplier.value.name;
      this.data.email = this.formSupplier.value.email;
      this.data.address = this.formSupplier.value.address;
      this.data.phone = this.formSupplier.value.phone;

      this.api.updateSupplier(this.data,this.data.id)
      .subscribe(res=>{
        this.toastr.success('Cập nhật Nhà Cung cấp thành công');
        this.getAllSupplier()
        let ref = document.getElementById('cancel')
          ref?.click();
          this.formSupplier.reset();
          this.getAllSupplier();
      })
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
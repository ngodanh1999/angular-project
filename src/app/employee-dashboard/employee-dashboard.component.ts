import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

 


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  EmployeeModelObj: EmployeeModel = new EmployeeModel();
  getEmployeeData !: any;
  getGroupProductData!:any[];
  getSubGroupProductData!:any[];

  filtered !: any[];
  filterBySub!:any;

  // pageEvent!: PageEvent;
  // datasource!: null;
  // pageIndex!:number;
  // pageSize!:number;
  // length!:number;

    menu!:string;
    submenu!:string;
    name_products!:string;
    note_products!:string;
    price_product!:string;
    image_product_src!:string;
    description_product!:string;
    made_product!:string;

  constructor(private formbuilber: FormBuilder,
    private api:ApiService,
    public dialog: MatDialog,
    public toastr:ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
    menu:[''],
    submenu:[''],
    name_products:[''],
    note_products:[''],
    price_product:[''],
    image_product_src:[''],
    description_product:[''],
    made_product:[''],
    })
    this.getAllEmployee();
    this.getGroupProduct()
    this.getSubGroupProduct()
  }

  // postEmployeeDetails(){
  //   this.EmployeeModelObj.menu = this.formValue.value.menu;
  //   this.EmployeeModelObj.submenu = this.formValue.value.submenu;
  //   this.EmployeeModelObj.name_products = this.formValue.value.name_products;
  //   this.EmployeeModelObj.note_products = this.formValue.value.note_products;
  //   this.EmployeeModelObj.price_product = this.formValue.value.price_product;
  //   this.EmployeeModelObj.image_product_src = this.formValue.value.image_product_src;
  //   this.EmployeeModelObj.description_product = this.formValue.value.description_product;
  //   this.EmployeeModelObj.made_product = this.formValue.value.made_product;
    
  //   this.api.postEmployee(this.EmployeeModelObj)
  //   .subscribe(res=>{
  //       console.log(res);
  //       alert("Employee added successfully");
  //       let ref = document.getElementById('cancel')
  //       ref?.click();
  //       this.formValue.reset();
  //       this.getAllEmployee();
  //     },
  //     err=>{
  //       alert("Something went wrong")
  //     })
  // }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.getEmployeeData = res;
      this.filtered = [...this.getEmployeeData];
    })
  }
  getGroupProduct(){
    this.api.getGroupProduct()
    .subscribe(res=>{
      this.getGroupProductData = res;
    })
  }
  getSubGroupProduct(){
    this.api.getSubGroupProduct()
    .subscribe(res=>{
      this.getSubGroupProductData = res;
    })
  }

  deleteEmployee(row:any){
    const dialogRef = this.dialog.open(QuestionAgain, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==1){
      this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      this.toastr.success('Xóa phụ tùng thành công');
      this.getAllEmployee();
    })
    }
    });
    
  }


  filter() {
    this.filtered = [...this.getEmployeeData
      .filter((row: { submenu: string | any[]; }) => row.submenu
      .includes(this.filterBySub.toUpperCase()))];
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        menu: this.menu, 
        submenu: this.submenu,
        name_products: this.name_products,
        note_products: this.note_products,
        price_product: this.price_product,
        image_product_src: this.image_product_src,
        description_product: this.description_product,
        made_product: this.made_product,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllEmployee();
    });

  }
  openDialogEdit(row:any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data={
          id:row.id,
          menu:row.menu,
          submenu: row.submenu,
          name_products:row.name_products,
          note_products:row.note_products,
          price_product:row.price_product,
          image_product_src:row.image_product_src,
          description_product:row.description_product,
          made_product:row.made_product,
        }
        // console.log(dialogConfig.data)
        const dialogRef=  this.dialog.open(DialogOverviewExampleDialog,dialogConfig)
        dialogRef.afterClosed().subscribe(data => {
          this.getAllEmployee();
        }
        ); 
  }
}

  // OnPageChange(event: PageEvent){
  //   const startIndex = event.pageIndex * event.pageSize;
  //   console.log(startIndex)
  //   let endIndex = startIndex * event.pageSize;
  //   console.log(endIndex)
  //     if (endIndex > this.filtered.length){
  //       endIndex = this.filtered.length;
  //     }
  //     this.pageSlice=this.getEmployeeData.slice(startIndex,endIndex)
    
  // }
// }
@Component({
  selector: 'products_dialog',
  templateUrl: 'products_dialog.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class DialogOverviewExampleDialog {

  url="https://static.thenounproject.com/png/2675922-200.png";

  formValue !: FormGroup;
  getEmployeeData !: any;
  getGroupProductData !: any[];
  getSubGroupProductData !: any[];

  title!:any;

  btnAdd:boolean=false;
  btnUpdate:boolean=false;

  filtered !: any[];
  filterBySub!:any;

  row!:any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel,
    private formbuilber: FormBuilder,
    private api:ApiService,
    private toastr: ToastrService,) {}
  
  ngOnInit(): void {
      this.formValue = this.formbuilber.group({
      menu:[''],
      submenu:[''],
      name_products:[''],
      note_products:[''],
      price_product:[''],
      image_product_src:[''],
      description_product:[''],
      made_product:[''],
      })

      this.getAllEmployee();
      this.getGroupProduct();
      this.getSubGroupProduct();
      this.onEdit(this.row);
      if(this.data.id == undefined){
        this.title = "Thêm Mới Phụ Tùng";
        this.btnAdd= true;
        this.btnUpdate=false;
      }
      else{
        this.title = "Chỉnh sửa thông tin Phụ Tùng";
        console.log(this.row)
        this.btnAdd= false;
        this.btnUpdate=true
      }
     
    }
    onFileSelection(event:any){
      if(event.target.files){
        var render = new FileReader();
        render.readAsDataURL(event.target.files[0])
        render.onload = (event:any)=>{
          this.url= event.target.result
        }
      }
    }
    getGroupProduct(){
      this.api.getGroupProduct()
      .subscribe(res=>{
        this.getGroupProductData = res;
      })
    }
    getSubGroupProduct(){
      this.api.getSubGroupProduct()
      .subscribe(res=>{
        this.getSubGroupProductData = res;
      })
    }
    postEmployeeDetails(){
      this.data.menu = this.formValue.value.menu;
      this.data.submenu = this.formValue.value.submenu;
      this.data.name_products = this.formValue.value.name_products;
      this.data.note_products = this.formValue.value.note_produts;
      this.data.price_product = this.formValue.value.price_product;
      this.data.image_product_src = this.formValue.value.image_product_src;
      this.data.description_product = this.formValue.value.description_product;
      this.data.made_product = this.formValue.value.made_product;
      
      this.api.postEmployee(this.data)
      .subscribe(res=>{
          console.log(res);
          this.toastr.success('Thêm phụ tùng thành công');
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        err=>{
          alert("Something went wrong")
        })
    }
  
    getAllEmployee(){
      this.api.getEmployee()
      .subscribe(res=>{
        this.getEmployeeData = res;
        this.filtered = [...this.getEmployeeData];
      })
    }
    onEdit(data:any){
      this.formValue.controls['menu'].setValue(this.data.menu);
      this.formValue.controls['submenu'].setValue(this.data.submenu);
      this.formValue.controls['name_products'].setValue(this.data.name_products);
      this.formValue.controls['note_products'].setValue(this.data.note_products);
      this.formValue.controls['price_product'].setValue(this.data.price_product);
      this.formValue.controls['image_product_src'].setValue(this.data.image_product_src);
      this.formValue.controls['description_product'].setValue(this.data.description_product);
      this.formValue.controls['made_product'].setValue(this.data.made_product);
    }
  
    updateEmployee(){
      this.data.menu = this.formValue.value.menu;
      this.data.submenu = this.formValue.value.submenu;
      this.data.name_products = this.formValue.value.name_products;
      this.data.note_products = this.formValue.value.note_products;
      this.data.price_product = this.formValue.value.price_product;
      this.data.image_product_src = this.formValue.value.image_product_src;
      this.data.description_product = this.formValue.value.description_product;
      this.data.made_product = this.formValue.value.made_product;
      this.api.updateEmployee(this.data,this.data.id)
      .subscribe(res=>{
        this.toastr.success('Cập nhật phụ tùng thành công');
        this.getAllEmployee()
        let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
      })
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'question_again',
  templateUrl: 'questionagain.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class QuestionAgain {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    ) {}
  
  ngOnInit(): void {
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
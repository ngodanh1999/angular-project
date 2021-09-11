import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  order_products, WarehouseexportModel } from '../../../model/warehouseexport.model';
import { ApiService } from '../../../shared/api.service';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { WarehouseModel } from '../../../model/warehouse.model';

@Component({
  selector: 'app-warehouseexport',
  templateUrl: './warehouseexport.component.html',
  styleUrls: ['./warehouseexport.component.css']
})
export class WarehouseexportComponent implements OnInit {
  formValue !: FormGroup;
  WarehouseexportlObj: WarehouseexportModel = new WarehouseexportModel();
  WarehouseObj:WarehouseModel = new WarehouseModel();
  Order_ProductObj: order_products = new order_products();
  getWarehouseexportData !: any;

  filtered !: any[];
  filterBySub!:any;

  id!:string;
  user_export!:string;
  content_order!:string;
  note!:string;
  created_date!:string;
  Total_Order!:string;
  products!:string;
  id_product!:string;
  name_product!:string;
  supplier_product!:string;
  quantity_product!:string;
  price_product!:string;
  Total_product!:string;

  constructor(
    private formbuilber: FormBuilder,
    private api:ApiService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void { 
    this.getAllWarehouseexport();
  }
  getAllWarehouseexport(){
    this.api.getWareExport()
    .subscribe(res=>{
      this.getWarehouseexportData = res;
      this.filtered = [...this.getWarehouseexportData];
    })
  }
  filter() {
    this.filtered = [...this.getWarehouseexportData
      .filter((row: { id: string | any[]; }) => row.id
      .includes(this.filterBySub.toUpperCase()))];
  }
  openDialog(){
    const dialogRef = this.dialog.open(CrateWarehouseexportDialog, {
      data: {
          id: this.id,
          user_export:this.user_export,
          content_order:this.content_order,
          note:this.note,
          created_date:this.created_date,
          Total_Order:this.Total_Order,
          products:this.products,
          id_product:this.id_product,
          name_product:this.name_product,
          supplier_product:this.supplier_product,
          quantity_product:this.quantity_product,
          price_product:this.price_product,
          Total_product:this.Total_product,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllWarehouseexport();
    });
  }
  deleteWarehouseexport(row:any){
    this.api.deleteWareExport(row.id)
    .subscribe(res=>{
      this.toastr.success('Xóa phiếu xuất hàng thành công');
      this.getAllWarehouseexport();
    })
  }
  openDialogEdit(row:any){
    
  }
  openDialogView(row:any){
    console.log(row)
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data={
          id:row.id,
          user_export:row.user_export,
          content_order:row.content_order,
          note: row.note,
          created_date:row.created_date,
          Total_Order:row.Total_Order,
          products:row.products,
          id_product:row.products.id_product,
          name_product:row.products.name,
          supplier_product:row.products.supplier,
          quantity_product:row.products.quantity,
          price_product:row.products.price,
          Total_product:row.products.Total,
        }
        // console.log(dialogConfig.data)
        const dialogRef=  this.dialog.open(viewWarehouseexportDialog,dialogConfig)
        dialogRef.afterClosed().subscribe(data => {
          // console.log(data)
        }
        ); 
  }
}
@Component({
  selector: 'warehouseexport_dialog',
  templateUrl: 'warehouseexport_dialog.html',
  styleUrls: ['./warehouseexport.component.css']
})

export class viewWarehouseexportDialog {

  id!:string;
  user_export!:string;
  content_order!:string;
  note!:string;
  created_date!:string;
  Total_Order!:string;
    id_product!:string;
      name_product!:string;
      supplier_product!:string;
      quantity_product!:string;
      price_product!:string;
      Total_product!:string;
      products:any=[];
  

  getWarehouseexportData !: any;
  title!:any;
  row!:any;

  constructor(
    public dialogRef: MatDialogRef<viewWarehouseexportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WarehouseexportModel,

    private api:ApiService,
    private toastr: ToastrService,) {}
  
  ngOnInit(): void {
    // console.log(this.data ,this.data.id)
    this.api.viewWareExport(this.data,this.data.id)
      .subscribe(res=>{
        this.getWarehouseexportData = res;
        this.id=this.getWarehouseexportData.id;
        this.user_export=this.getWarehouseexportData.user_export;
        this.content_order=this.getWarehouseexportData.content_order;
        this.note=this.getWarehouseexportData.note;
        this.created_date=this.getWarehouseexportData.created_date;
        this.Total_Order=this.getWarehouseexportData.Total_Order;
        this.products=this.getWarehouseexportData.products;
      });
      this.title="Xem chi tiết phiếu xuất hàng";
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}

interface assetProduct{
  name:string,
  price_product:string,
}
interface productsimport{
  name:string,
  idp:string,
  img:string,
}
// }
@Component({
  selector: 'Createwarehouseexport_dialog',
  templateUrl: 'Createwarehouseexport_dialog.html',
  styleUrls: ['./warehouseexport.component.css']
})

export class CrateWarehouseexportDialog {

  
  formValue!:FormGroup;

  getWarehouseexportData !: any;

  filtered !: any[];
  title!:any;
  row!:any;

  getproducts!:any[];
  getsupplier!:any[];
  getWarehouseData!:any[];

  increase:number=0;

  // name_product!:string;
  // price_product!:string;

  getproduct:any[]=[0];
  getp:assetProduct[]=[];

  supplier:any[]=[]
  price:any[]=[];
  quantity:any[]=[];
  numberquantity!:number;
  totalmoney_product!:number;
  unitprice:any[]=[];
  Totalmoney_products:any=0;

  getProductImport: productsimport[]=[];

  public now!:string;

  DoneProduct:order_products[]=[];
  warehouse:WarehouseModel[]=[];

  WarehouseObj: WarehouseModel = new WarehouseModel();

  constructor(
    public dialogRef: MatDialogRef<CrateWarehouseexportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WarehouseexportModel,
    private api:ApiService,
    private toastr: ToastrService,
    private formbuilber: FormBuilder) {}
  
  ngOnInit(): void {
    // console.log(this.data ,this.data.id)
    this.formValue = this.formbuilber.group({
      user_export:[''],
      content_order:[''],
      note:[''],
      created_date:[''],
      Total_Order:[''],
      order_products:[''],
      price:[''],
      name_product1:[''],
      name_product2:[''],
      name_product3:[''],
      name_product4:[''],
      name_product5:[''],
      name_supplier1:[''],
      name_supplier2:[''],
      name_supplier3:[''],
      name_supplier4:[''],
      name_supplier5:[''],
      quantity_product:[''],

      })

      // this.getproduct
      
      this.getAllProducts();
      this.getAllWarehouse();
      this.getAllWarehouseexport();
      this.getAllSupllier();
      this.title="Tạo mới dữ liệu xuất hàng";
    }
    postWareexportDetails(){
      // console.log(this.getproduct[this.getproduct.length-2])
      var final:any=this.getproduct[this.getproduct.length-2];
      for(let temp=0;temp <final.length;temp++){
      this.DoneProduct.push({
        id_product:temp+1,
        name:final[temp].name,
        supplier:this.supplier[temp],
        price:this.price[temp],
        quantity:this.quantity[temp],
        Total:this.unitprice[temp],
      });

      };
     
      const event = new Date(Date.now());
      const name_admin:string=localStorage.getItem("name")?.valueOf()?"admin":"";
      this.data.user_export = name_admin;
      this.data.content_order = this.formValue.value.content_order;
      this.data.note =  this.formValue.value.note;
      this.data.created_date = event.toLocaleString();
      this.data.Total_Order = this.Totalmoney_products;
      this.data.products = this.DoneProduct;
      
      this.api.postWareExport(this.data)
      .subscribe(res=>{
          console.log(res);
          this.toastr.success('Tạo phiếu xuất hàng thành công');
          this.formValue.reset();
          this.getAllWarehouseexport();
        },
        err=>{
          alert("Something went wrong")
        });

        
        this.postWareHouse();    
    }
    
    postWareHouse(){
      for (let find of this.getproduct[this.getproduct.length-2]){
        this.getproducts.forEach((item:any) => {
          if(find.name == item.name_products){
            this.getProductImport.push({name:item.name_products,idp:item.id,img:item.image_product_src})
          }
        });
      }
      for(let setproduct in this.getProductImport){
      this.WarehouseObj.img = this.getProductImport[setproduct].img;
      this.WarehouseObj.id_product = this.getProductImport[setproduct].idp.toString();
      this.WarehouseObj.name_product =  this.getProductImport[setproduct].name;
      this.WarehouseObj.quantity = this.quantity[setproduct].toString();
      this.api.postWarehouse(this.WarehouseObj)
      .subscribe(res=>{
          console.log(res);
          this.toastr.success('Cập nhật thành công kho');
        },
        err=>{
          alert("Something went wrong")
        })
      }
    }
    getAllWarehouseexport(){
      this.api.getWareExport()
      .subscribe(res=>{
        this.getWarehouseexportData = res;
      })
    }
    getAllWarehouse(){
      this.api.getWarehouse()
      .subscribe(res=>{
        this.getWarehouseData = res;
      }
      )
    }
    getAllProducts(){
      this.api.getEmployee()
      .subscribe(res=>{
        this.getproducts = res;
      }
      )
    }
    getAllSupllier(){
      this.api.getSupplier()
      .subscribe(res=>{
        this.getsupplier = res;
      }
      )
    }
    addspace(){
      // for(let i=0;i<this.getproduct.length-1,i++)
      if(this.getproduct[this.increase]===0){
        this.getproduct.splice(this.increase,1);
      }
      this.getproducts.forEach((item:any)=>{
        // console.log(item);
        if(this.formValue.value.name_product1 == item.name_products){
          this.getp.push({name:item.name_products,price_product:item.price_product});
          this.price.push(item.price_product)
          this.quantity.push(1)
          this.unitprice.push(item.price_product)
          this.Totalmoney_products=this.calmoney(this.Totalmoney_products*1)
        }
        if(this.formValue.value.name_product2 == item.name_products){
          this.getp.push({name:item.name_products,price_product:item.price_product});
          this.price.push(item.price_product)
          this.quantity.push(1)
          this.unitprice.push(item.price_product)
          this.Totalmoney_products=this.calmoney(this.Totalmoney_products*1)
        }
        if(this.formValue.value.name_product3 == item.name_products){
          this.getp.push({name:item.name_products,price_product:item.price_product});
          this.price.push(item.price_product)
          this.quantity.push(1)
          this.unitprice.push(item.price_product)
          this.Totalmoney_products=this.calmoney(this.Totalmoney_products*1)
        }
        if(this.formValue.value.name_product4 == item.name_products){
          this.getp.push({name:item.name_products,price_product:item.price_product});
          this.price.push(item.price_product)
          this.quantity.push(1)
          this.unitprice.push(item.price_product)
          this.Totalmoney_products=this.calmoney(this.Totalmoney_products*1)
        }
        if(this.formValue.value.name_product5 == item.name_products){
          this.getp.push({name:item.name_products,price_product:item.price_product});
          this.price.push(item.price_product)
          this.quantity.push(1)
          this.unitprice.push(item.price_product)
          this.Totalmoney_products=this.calmoney(this.Totalmoney_products*1)
        }
      }
      );
      this.getproduct.push(this.getp,0);
      this.increase++;
      for(let temp=0;temp <this.getproduct.length-2;temp++){
        if (temp==0)
        this.formValue.controls['name_product1'].setValue(this.getproduct[this.getproduct.length-2][temp].name);
        if (temp==1)
        this.formValue.controls['name_product2'].setValue(this.getproduct[this.getproduct.length-2][temp].name);
        if (temp==2)
        this.formValue.controls['name_product3'].setValue(this.getproduct[this.getproduct.length-2][temp].name);
        if (temp==3)
        this.formValue.controls['name_product4'].setValue(this.getproduct[this.getproduct.length-2][temp].name);
        if (temp==4)
        this.formValue.controls['name_product5'].setValue(this.getproduct[this.getproduct.length-2][temp].name);
      }
      // console.log(this.getproduct)
      // console.log(this.price)
      // console.log(this.quantity)
      // console.log(this.unitprice)
      // console.log(this.Totalmoney_products)
      // console.log(this.getproduct[this.getproduct.length-2])
    }
    calmoney(temp:number):number{
      temp=0;
        for(let item of this.unitprice){
          temp+=item*1;
        }
        return temp;
    }
    savesupplier(){
      this.getsupplier.forEach((item:any)=>{
        if(this.formValue.value.name_supplier1 == item.name){
          var nameS = item.name;
          this.supplier.push(nameS);
        }
        if(this.formValue.value.name_supplier2 == item.name){
          var nameS = item.name;
          this.supplier.push(nameS);
        }
        if(this.formValue.value.name_supplier3 == item.name){
          var nameS = item.name;
          this.supplier.push(nameS);
        }
        if(this.formValue.value.name_supplier4 == item.name){
          var nameS = item.name;
          this.supplier.push(nameS);
        }
        if(this.formValue.value.name_supplier5 == item.name){
          var nameS = item.name;
          this.supplier.push(nameS);
        }
      })
    }
    square(value:any){
      var quantity_product=this.quantity[value];
      quantity_product --;
      this.quantity.splice(value,1,quantity_product);

      var price=this.price[value];
      this.totalmoney_product=price*quantity_product;
      // console.log(this.totalmoney_product)
      // this.quantity[value]=quantity_product;
      this.unitprice.splice(value,1,this.totalmoney_product);
      this.Totalmoney_products=this.calmoney(this.Totalmoney_products);

    }

    circle(value:any){
      var quantity_product=this.quantity[value];
      quantity_product ++;
      this.quantity.splice(value,1,quantity_product);

      var price=this.price[value];
      this.totalmoney_product=price*quantity_product;
      // console.log(this.totalmoney_product)
      // this.quantity[value]=quantity_product;
      this.unitprice.splice(value,1,this.totalmoney_product);
      this.Totalmoney_products=this.calmoney(this.Totalmoney_products)

      // console.log(this.unitprice)
    }
    delete_P_list(){
      // console.log(row)
      // console.log(this.getproduct[this.getproduct.length-2]);
      // this.getproduct[this.getproduct.length-2].splice(this.getproduct[this.getproduct.length-2][row],1);
      // this.formValue.value.name_product.setValue('')
      // delete this.getproduct[1];
      // console.log(this.getproduct)
      // console.log(this.getproduct[this.getproduct.length])
      // if(this.getproduct[this.increase]===0){
      //   this.getproduct.splice(this.increase,1);
      // }
      // this.getproducts.forEach((item:any)=>{
      //   if(this.formValue.value.name_product == item.name_products){
      //     this.getp.push({name:item.name_products,price_product:item.price_product});
      //     this.price.push(item.price_product)
      //     this.quantity.push(1)
      //     this.unitprice.push(item.price_product)
      //     this.Totalmoney_products=this.calmoney(this.Totalmoney_products*1)
      //   }
      // }
      // );
      // this.getproduct.push(this.getp,0);
      // this.increase--;
     
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}

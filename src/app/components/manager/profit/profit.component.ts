import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
interface statistical{
  name:string,
  image:string,
  import:string,
  export:string,
  exits:string,
}
interface Pimport{
  name:string,
  image:string,
  import:string,
}
@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css']
})
export class ProfitComponent implements OnInit {

  getWarehouseData: any[]=[];
  getProductData: any[]=[];
  getWarehouseExData:any[]=[];

  filtered !: any;
  filterBySub!:any;
  
  statistical:statistical[]=[];
  pimport:Pimport[]=[];

  import:any=0;
  export:any=0;
  exits:any=0;
  constructor(
    private api:ApiService,
  ) { }

  ngOnInit(): void {
    this.getAllWarehouse();
    this.getAllProduct();
    // this.getAllWarehouseExport();
  }

  getAllProduct(){
   
    this.api.getEmployee()
    .subscribe(res=>{
      this.getProductData = res;
     
      for (let item in this.getProductData){
        this.getWarehouseData.forEach((i:any) => {
          if(i.name_product == this.getProductData[item].name_products){
            this.pimport.push({name:i.name_product,image:this.getProductData[item].image_product_src,import:i.quantity})
          }
        });
  }
  
}
  )}
  getAllWarehouse(){
    this.api.getWarehouse()
    .subscribe(res=>{
      this.getWarehouseData=res;
    }
    );
  }
  getAllWarehouseExport(){
    this.api.getWareExport()
    .subscribe(res=>{
      this.getWarehouseExData=res;
      console.log(this.getWarehouseExData)
      console.log(this.statistical)
    }
    );
  }
  filter() {
    this.filtered = [...this.getWarehouseData
      .filter((row: { submenu: string | any[]; }) => row.submenu
      .includes(this.filterBySub.toUpperCase()))];
  };

}

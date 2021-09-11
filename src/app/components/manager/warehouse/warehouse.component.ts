import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  getWarehouseData !: any;

  filtered !: any;
  filterBySub!:any;
  
  constructor(
    private api:ApiService,
  ) { }

  ngOnInit(): void {
    this.getAllWarehouse();
    
  }
  getAllWarehouse(){
    this.api.getWarehouse()
    .subscribe(res=>{
      this.getWarehouseData = res;
      this.filtered = [...this.getWarehouseData];
    })
  };

  filter() {
    this.filtered = [...this.getWarehouseData
      .filter((row: { submenu: string | any[]; }) => row.submenu
      .includes(this.filterBySub.toUpperCase()))];
  };
  
}

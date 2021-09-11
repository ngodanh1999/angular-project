import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }
  
  postEmployee(data:any){
    return this.http.post<any>("http://localhost:3000/posts/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/posts/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id) 
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getUser(){
    return this.http.get<any>("http://localhost:3000/user/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postUser(data:any){
    return this.http.post<any>("http://localhost:3000/user/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getSupplier(){
    return this.http.get<any>("http://localhost:3000/supplier/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteSupplier(id:number){
    return this.http.delete<any>("http://localhost:3000/supplier/"+id) 
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postSupplier(data:any){
    return this.http.post<any>("http://localhost:3000/supplier/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateSupplier(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getWareImport(){
    return this.http.get<any>("http://localhost:3000/warehouseimport/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  viewWareImport(data:any,id:number){
    return this.http.get<any>("http://localhost:3000/warehouseimport/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postWareImport(data:any){
    return this.http.post<any>("http://localhost:3000/warehouseimport/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteWareImport(id:number){
    return this.http.delete<any>("http://localhost:3000/warehouseimport/"+id) 
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getWarehouse(){
    return this.http.get<any>("http://localhost:3000/Warehouse/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postWarehouse(data:any){
    return this.http.post<any>("http://localhost:3000/Warehouse/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getGroupProduct(){
    return this.http.get<any>("http://localhost:3000/GroupProduct/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getSubGroupProduct(){
    return this.http.get<any>("http://localhost:3000/SubGroupProduct/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getWareExport(){
    return this.http.get<any>("http://localhost:3000/warehouseexport/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  viewWareExport(data:any,id:number){
    return this.http.get<any>("http://localhost:3000/warehouseexport/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  postWareExport(data:any){
    return this.http.post<any>("http://localhost:3000/warehouseexport/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteWareExport(id:number){
    return this.http.delete<any>("http://localhost:3000/warehouseexport/"+id) 
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}

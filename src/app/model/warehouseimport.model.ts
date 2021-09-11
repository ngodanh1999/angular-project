export class WarehouseimportModel {
    id: number=0;
    user_import:string='';
    content_order:string='';
    note:string='';
    created_date:string='';
    products: Array<order_products>=[];
    Total_Order:string='';
}
export class order_products{
    id_product:number=0;
      name:string='';
      supplier:string='';
      quantity:string='';
      price:string='';
      Total:string='';
}
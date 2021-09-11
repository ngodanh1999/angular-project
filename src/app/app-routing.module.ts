import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ContentComponent } from './components/dashboard/content/content.component';
import { WarehouseimportComponent } from './components/manager/warehouseimport/warehouseimport.component';
import { SupplierComponent } from './components/manager/supplier/supplier.component';
import { WarehouseComponent } from './components/manager/warehouse/warehouse.component';
import { WarehouseexportComponent } from './components/manager/warehouseexport/warehouseexport.component';
import { changePasswordComponent, InforAdminComponent } from './components/dashboard/infor-admin/infor-admin.component';
import { StatisticalComponent } from './components/manager/statistical/statistical.component';
import { ProfitComponent } from './components/manager/profit/profit.component';

const routes: Routes=[
  {path:'login',component:LoginComponent},
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'product',component:EmployeeDashboardComponent},
      {path:'home',component:ContentComponent},
      {path:'register',component:RegisterComponent},
      {path:'supplier',component:SupplierComponent},
      {path:'warehouseimport',component:WarehouseimportComponent},
      {path:'warehouse',component:WarehouseComponent},
      {path:'warehouseexport',component:WarehouseexportComponent},
      {path:'informationAdmin',component:InforAdminComponent},
      {path:'changePassword',component:changePasswordComponent},
      {path:'statistical',component:StatisticalComponent},
      {path:'profit',component:ProfitComponent},
    ]
  },
  {path:'',redirectTo:'login',pathMatch:"full"}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

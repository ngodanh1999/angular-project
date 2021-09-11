import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';

import { DialogOverviewExampleDialog, EmployeeDashboardComponent, QuestionAgain } from './employee-dashboard/employee-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { HeaderComponent, QuestionAgainLogout } from './components/dashboard/header/header.component';
import { ContentComponent } from './components/dashboard/content/content.component';
import { FooterComponent } from './components/dashboard/footer/footer.component';
import { SuplierDialog } from './components/manager/supplier/supplier.component';
import { CrateWarehouseimportDialog, viewWarehouseimportDialog, WarehouseimportComponent } from './components/manager/warehouseimport/warehouseimport.component';
import { SupplierComponent } from './components/manager/supplier/supplier.component';
import { WarehouseComponent } from './components/manager/warehouse/warehouse.component';
import { CrateWarehouseexportDialog, viewWarehouseexportDialog, WarehouseexportComponent } from './components/manager/warehouseexport/warehouseexport.component';
import { changePasswordComponent, InforAdminComponent } from './components/dashboard/infor-admin/infor-admin.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import {NgxPrintModule} from 'ngx-print';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatisticalComponent } from './components/manager/statistical/statistical.component';
import { ProfitComponent } from './components/manager/profit/profit.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    DialogOverviewExampleDialog,
    SupplierComponent,
    SuplierDialog,
    WarehouseimportComponent,
    viewWarehouseimportDialog,
    CrateWarehouseimportDialog,
    WarehouseComponent,
    QuestionAgain,
    WarehouseexportComponent,
    InforAdminComponent,
    changePasswordComponent,
    QuestionAgainLogout,
    CrateWarehouseexportDialog,
    viewWarehouseexportDialog,
    StatisticalComponent,
    ProfitComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    NgxPrintModule,
    FileUploadModule,
    NgbModule,
    MatButtonModule,
    NgApexchartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

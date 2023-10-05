import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./components/customers/customers.component";
import {ProductsComponent} from "./components/products/products.component";
import {LoginComponent} from "./components/login/login.component";
import {AdminTemplateComponent} from "./components/admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AdminProductImageComponent} from "./components/admin-product-image/admin-product-image.component";

const routes: Routes = [
  {path:"image",component:AdminProductImageComponent},
  {path : "login" , component : LoginComponent} ,
  {path : "" , component : LoginComponent},
  {path : "admin" , component : AdminTemplateComponent ,canActivate:[AuthenticationGuard], children : [
      {path : "products" ,  component : ProductsComponent},
      {path : "customers" , component : CustomersComponent},
      {path:"image",component:AdminProductImageComponent},

    ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

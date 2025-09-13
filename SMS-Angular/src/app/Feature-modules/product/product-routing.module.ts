import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { AuthGuard } from 'src/app/Core/auth/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo:'create', children: [
      { path: 'create', component: AddProductComponent, canActivate: [AuthGuard], },
      { path: 'list', component: ProductListComponent, canActivate: [AuthGuard], },
      { path: 'edit/:id', component: AddProductComponent, canActivate: [AuthGuard], }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

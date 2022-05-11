import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path:'', component: LayoutsComponent, children:[
    { path:'', component:HomeComponent},
    { path:'product-add', canActivate:[AuthGuard],component:ProductAddComponent},
    { path:'product-update/:id', canActivate:[AuthGuard],component:ProductUpdateComponent},
    { path: 'orders', component:OrderComponent}
  ]},
  { path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

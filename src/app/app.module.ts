import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { BasketComponent } from './components/basket/basket.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './components/order/order.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { FilterProductPipe } from './pipe/filter-product.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/layouts/spinner/spinner.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductComponent,
    BasketComponent,
    PaymentComponent,
    OrderComponent,
    LayoutsComponent,
    FooterComponent,
    ProductAddComponent,
    NotFoundComponent,
    ProductUpdateComponent,
    FilterProductPipe,
    LoginComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      closeButton:true,
      progressBar:true,
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    { provide: 'apiUrl', useValue: 'https://webapi.angulareducation.com/api/'},
    { provide: 'validError', useValue: 'Zorunlu alanları doldurun'},
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

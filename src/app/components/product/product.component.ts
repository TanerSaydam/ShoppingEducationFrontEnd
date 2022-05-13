import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';
import { ResponseModel } from 'src/app/models/responseModel';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterContentChecked {
  products: ProductModel[];
  isAuth:boolean = false;
  filterText:string = "";
  isLoaded = false;

  constructor(
    private toastrService:ToastrService,
    private productService:ProductService,
    private basketService:BasketService,
    private authService:AuthService,
    private httpClient:HttpClient,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuth;
  }

  getList(){
    this.spinner.show();
    this.productService.getList().subscribe((res)=>{
      //console.log(res)
      this.spinner.hide();
      this.products = res.data;
    },(err)=>{
      this.spinner.hide();
      if (err.status == "404") {
        this.toastrService.error(err.statusText)
      }else{
        console.log(err);
      }
    })
  }

  addBasket(product:ProductModel){
    let basketModel = new BasketModel();
    basketModel.product = product;
    basketModel.quantity = parseInt((<HTMLInputElement>document.getElementById("quantity-" + product.name)).value);
    (<HTMLInputElement>document.getElementById("quantity-" + product.name)).value = "1"

    this.basketService.addBasket(basketModel);
  }
}

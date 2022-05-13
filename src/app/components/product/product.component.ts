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
    //this.isAuth = this.authService.isAuthenticated();
    this.getList();
  }

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuthenticated();
    this.products = this.productService.products;
  }

  getList(){
    this.productService.getList();
  }

  addBasket(product:ProductModel){
    let quantity:number = parseInt((<HTMLInputElement>document.getElementById("quantity-" + product.name)).value);
    if (product.inventoryQuantity < quantity) {
      this.toastrService.error("Eklemek istediğiniz adet, ürün adedinden fazla olamaz!")
      return;
    }

    this.spinner.show();

    let basketModel = new BasketModel();
    basketModel.product = product;
    basketModel.productId = product.id;
    basketModel.quantity = quantity;
    (<HTMLInputElement>document.getElementById("quantity-" + product.name)).value = "1"

    this.basketService.add(basketModel).subscribe((res)=>{
      this.spinner.hide();
      this.toastrService.info(res.message)
      this.basketService.getList();
      this.getList();
    },(err)=>{
      this.spinner.hide();
      console.log(err);
    })

    // this.basketService.addBasket(basketModel);
  }
}

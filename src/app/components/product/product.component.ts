import { Component, OnInit, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';
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

  constructor(
    private toastrService:ToastrService,
    private productService:ProductService,
    private basketService:BasketService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getList().subscribe((res)=>{
      this.products = res;
    })
  }

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuth;
  }

  addBasket(product:ProductModel){
    let basketModel = new BasketModel();
    basketModel.product = product;
    basketModel.quantity = parseInt((<HTMLInputElement>document.getElementById("quantity-" + product.name)).value);
    (<HTMLInputElement>document.getElementById("quantity-" + product.name)).value = "1"

    this.basketService.addBasket(basketModel);
  }
}

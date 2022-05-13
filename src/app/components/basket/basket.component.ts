import { ThisReceiver } from '@angular/compiler';
import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { BasketService } from 'src/app/services/basket.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, AfterContentChecked {

  baskets: BasketModel[] = [];
  total: number = 0;

  constructor(
    private toastrService: ToastrService,
    private basketService: BasketService,
    private spinnerService:NgxSpinnerService,
    private productService:ProductService,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.geList();
  }

  ngAfterContentChecked(): void {
    this.baskets = this.basketService.baskets;
    this.total = this.basketService.total
  }

  geList(){
    this.basketService.getList()
  }

  updateBasket(basket: BasketModel, quantity:number) {
    if ((basket.quantity + quantity) <= 0) {
      this.toastrService.error("Sepetteki ürün adedi 1'den daha düşük olamaz")
      return;
    }

    if (basket.product.inventoryQuantity - quantity < 0) {
      this.toastrService.error("Eklemek istediğiniz adet, ürün adedinden fazla olamaz!")
      return;
    }
    basket.quantity = basket.quantity + quantity;

    this.spinnerService.show();
    this.basketService.update(basket).subscribe((res)=>{
      this.geList();
      this.spinnerService.hide();
      this.productService.getList();
    },(err)=>{
      this.spinnerService.hide();
      this.errorService.errorHandler(err);
    })
  }

  deleteBasket(basket: BasketModel) {
    this.spinnerService.show();
    this.basketService.delete(basket).subscribe((res)=>{
      this.spinnerService.hide();
      this.productService.getList();
      this.geList();
    },(err)=>{
      this.spinnerService.hide();
      this.errorService.errorHandler(err);
    })
  }
}

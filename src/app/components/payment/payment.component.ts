import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterContentChecked {

  total:number;
  @Output() myEvent:EventEmitter<any> = new EventEmitter();

  constructor(
    private basketService:BasketService
  ) { }

  ngOnInit(): void {

  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total;
  }

  payment(){
    this.basketService.payment(this.total);
    document.getElementById("paymentModalCloseBtn").click();
  }
}

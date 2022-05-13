import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderModel } from 'src/app/models/order';
import { OrderDtoModel } from 'src/app/models/orderDtoModel';
import { ErrorService } from 'src/app/services/error.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders:OrderDtoModel[] = [];

  constructor(
    private orderService:OrderService,
    private spinner:NgxSpinnerService,
    private errorService:ErrorService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.spinner.show();
    this.orderService.getList().subscribe((res)=>{
      this.spinner.hide();
      this.orders = res.data;
      //console.log(this.orders)
    },(err)=>{
      this.spinner.hide();
      this.errorService.errorHandler(err);
    })
  }

}

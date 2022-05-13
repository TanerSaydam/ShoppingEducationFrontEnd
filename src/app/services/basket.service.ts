import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketModel } from '../models/basket';
import { ListReponseModel } from '../models/listResponseModel';
import { OrderModel } from '../models/order';
import { OrderAddDtoModel } from '../models/orderAddDto';
import { PaymentModel } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { ErrorService } from './error.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baskets:BasketModel[] = [];
  total:number = 0;
  orders:OrderModel[] = [];

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private toastrService:ToastrService,
    private orderService:OrderService,
    private httpClient:HttpClient,
    private errorService:ErrorService
  ) { }

  getList(){
    let api = this.apiUrl + "baskets/getlist";
    this.httpClient.get<ListReponseModel<BasketModel>>(api).subscribe((res)=>{
      this.baskets = res.data
      this.calc();
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  add(model:BasketModel):Observable<ResponseModel>{
    let api = this.apiUrl + "baskets/add";
    return this.httpClient.post<ResponseModel>(api,model);
  }

  update(model:BasketModel):Observable<ResponseModel>{
    let api = this.apiUrl + "baskets/update";
    return this.httpClient.post<ResponseModel>(api,model);
  }

  delete(model:BasketModel):Observable<ResponseModel>{
    let api = this.apiUrl + "baskets/delete";
    return this.httpClient.post<ResponseModel>(api,model);
  }

  calc(){
    this.total = 0
    this.baskets.forEach(element => {
      this.total = this.total + (element.product.price * element.quantity)
    });
  }

  payment(paymentModel:PaymentModel){
    let api = this.apiUrl + "Orders/addPayment";
    let model = new OrderAddDtoModel();
    model.payment = paymentModel;
    model.baskets = this.baskets;
    this.httpClient.post(api,model).subscribe((res)=>{
      this.getList();
      this.toastrService.success("Ödeme başarıyla gerçekleşti. Siparişiniz alındı.")
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

}

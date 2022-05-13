import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketModel } from '../models/basket';
import { ListReponseModel } from '../models/listResponseModel';
import { OrderModel } from '../models/order';
import { ResponseModel } from '../models/responseModel';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baskets:BasketModel[] = [];
  total:number = 0;
  orders:OrderModel[] = [];

  constructor(
    private toastrService:ToastrService,
    private orderService:OrderService,
    private httpClient:HttpClient
  ) { }

  getList(){
    let api = "https://webapi.angulareducation.com/api/baskets/getlist";
    this.httpClient.get<ListReponseModel<BasketModel>>(api).subscribe((res)=>{
      this.baskets = res.data
      this.calc();
    },(err)=>{
      console.log(err)
    })
    //return this.httpClient.get<ListReponseModel<BasketModel>>(api);
  }

  add(model:BasketModel):Observable<ResponseModel>{
    let api = "https://webapi.angulareducation.com/api/baskets/add";
    return this.httpClient.post<ResponseModel>(api,model);
  }

  update(model:BasketModel):Observable<ResponseModel>{
    let api = "https://webapi.angulareducation.com/api/baskets/update";
    return this.httpClient.post<ResponseModel>(api,model);
  }

  delete(model:BasketModel):Observable<ResponseModel>{
    let api = "https://webapi.angulareducation.com/api/baskets/delete";
    return this.httpClient.post<ResponseModel>(api,model);
  }

  calc(){
    this.total = 0
    this.baskets.forEach(element => {
      this.total = this.total + (element.product.price * element.quantity)
      //console.log(this.total)
    });
  }

  // changeData(basket:BasketModel, quantity:number){
  //   let index = this.baskets.indexOf(basket);
  //   this.baskets[index].quantity = quantity;
  //   // this.baskets.splice(index,1);
  //   // basket.quantity = quantity;
  //   // this.baskets.push(basket);
  //   this.calc();
  // }



  // payment(total:number){
  //   if (this.total == total) {
  //     let count = this.baskets.length;
  //     this.orderService.addOrder(this.baskets);
  //     //this.baskets.splice(0,count);
  //     this.toastrService.info("Ödeme başarılı. Siparişiniz sevk aşamasına geçti");
  //   }
  //   this.calc();
  // }

}

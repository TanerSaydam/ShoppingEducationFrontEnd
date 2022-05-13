import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BasketModel } from "../models/basket";
import { ListReponseModel } from "../models/listResponseModel";
import { OrderModel } from "../models/order";
import { OrderDtoModel } from "../models/orderDtoModel";

@Injectable({
  providedIn: 'root'
})
export class OrderService{

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private httpClient:HttpClient
  ){}

  getList():Observable<ListReponseModel<OrderDtoModel>>{
    let api = this.apiUrl + "Orders/getList";
    return this.httpClient.get<ListReponseModel<OrderDtoModel>>(api);
  }

}

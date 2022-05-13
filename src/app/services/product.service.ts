import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { ListReponseModel } from "../models/listResponseModel";
import { ProductModel } from "../models/product";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private toastrService: ToastrService,
    private httpClient:HttpClient
  ) { }

  add(productModel:ProductModel):Observable<ResponseModel>{
    let token = localStorage.getItem("token");
    let api = "https://webapi.angulareducation.com/api/products/add";
    return this.httpClient.post<ResponseModel>(api,productModel,{
      headers: new HttpHeaders({"Authorization":"Bearer " + token})
    });
  }

  // add(model: ProductModel):boolean {
  //   let length = this.products.filter(p => p.name.toLocaleLowerCase() == model.name.toLocaleLowerCase()).length
  //   if (length == 0) {
  //     this.products.push(model);
  //     this.toastrService.success(model.name + " başarıyla eklendi");
  //     return true;
  //   } else {
  //     this.toastrService.error("Eklemeye çalıştığınız ürün kayıtlarda mevcut!");
  //     return false;
  //   }
  // }

  getList():Observable<ListReponseModel<ProductModel>>{
    let api = "https://webapi.angulareducation.com/api/products/getlist"
    let token = localStorage.getItem("token");
    return this.httpClient.get<ListReponseModel<ProductModel>>(api,{
      headers: new HttpHeaders({"Authorization":"Bearer " + token})
    });
  }

  // getById(id:number):Observable<any>{
  //   //console.log(id);
  //   let model:ProductModel = this.products.find(i=> i.id == id);
  //   //console.log(model);
  //   return of(model);
  // }

  // update(model: ProductModel){
  //   let productModel:ProductModel = this.products.find(i=> i.id == model.id);
  //   let index = this.products.indexOf(productModel);
  //   this.products[index] = model;
  //   //console.log(productModel);
  // }

}

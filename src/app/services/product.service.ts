import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { ListReponseModel } from "../models/listResponseModel";
import { ProductModel } from "../models/product";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:ProductModel[] = [];

  constructor(
    private toastrService: ToastrService,
    private httpClient:HttpClient
  ) { }

  add(productModel:ProductModel):Observable<ResponseModel>{
    let api = "https://webapi.angulareducation.com/api/products/add";
    let token = localStorage.getItem("token");
    return this.httpClient.post<ResponseModel>(api,productModel,{
      headers: new HttpHeaders({"Authorization":"Bearer " + token})
    });
  }

  getList(){
    let api = "https://webapi.angulareducation.com/api/products/getlist"
    this.httpClient.get<ListReponseModel<ProductModel>>(api).subscribe((res)=>{
      this.products = res.data;
    },(err)=>{
      if (err.status == "404") {
        this.toastrService.error(err.statusText)
      }else{
        console.log(err);
      }
    })
  }

  getById(guid:string):Observable<SingleResponseModel<ProductModel>>{
    let token = localStorage.getItem("token");
    let api = "https://webapi.angulareducation.com/api/products/getById?guid=" + guid;
    return this.httpClient.get<SingleResponseModel<ProductModel>>(api,{
      headers: new HttpHeaders({"Authorization":"Bearer " + token})
    });
  }

  update(model: ProductModel):Observable<ResponseModel>{
    let api = "https://webapi.angulareducation.com/api/products/update";
    let token = localStorage.getItem("token");
    return this.httpClient.post<ResponseModel>(api,model,{
      headers: new HttpHeaders({"Authorization":"Bearer " + token})
    })
  };

  delete(model: ProductModel):Observable<ResponseModel>{
    let api = "https://webapi.angulareducation.com/api/products/delete";
    let token = localStorage.getItem("token");
    return this.httpClient.post<ResponseModel>(api,model,{
      headers: new HttpHeaders({"Authorization":"Bearer " + token})
    })
  };

}

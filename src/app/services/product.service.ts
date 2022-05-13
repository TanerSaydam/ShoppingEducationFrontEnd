import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { ListReponseModel } from "../models/listResponseModel";
import { ProductModel } from "../models/product";
import { ResponseModel } from "../models/responseModel";
import { SingleResponseModel } from "../models/singleResponseModel";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:ProductModel[] = [];

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private toastrService: ToastrService,
    private httpClient:HttpClient,
    private errorService:ErrorService
  ) { }

  add(productModel:ProductModel):Observable<ResponseModel>{
    let api = this.apiUrl + "products/add";
    return this.httpClient.post<ResponseModel>(api,productModel);
  }

  getList(){
    let api = this.apiUrl + "products/getlist"
    this.httpClient.get<ListReponseModel<ProductModel>>(api).subscribe((res)=>{
      this.products = res.data;
    },(err)=>{
      this.errorService.errorHandler(err);
    })
  }

  getById(guid:string):Observable<SingleResponseModel<ProductModel>>{
    let api = this.apiUrl + "products/getById?guid=" + guid;
    return this.httpClient.get<SingleResponseModel<ProductModel>>(api);
  }

  update(model: ProductModel):Observable<ResponseModel>{
    let api = this.apiUrl + "products/update";
    return this.httpClient.post<ResponseModel>(api,model)
  };

  delete(model: ProductModel):Observable<ResponseModel>{
    let api = this.apiUrl + "products/delete";
    return this.httpClient.post<ResponseModel>(api,model)
  };

}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable,of} from 'rxjs';
import { Login } from '../models/login';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth:boolean = false;

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private toastrService:ToastrService,
    private httpClient:HttpClient,
    private router:Router,
    private errorService:ErrorService
  ) { }

  isAuthenticated():boolean{
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }

  login(loginModel:Login):boolean{
    let api = this.apiUrl + "users/login";
    this.httpClient.post<SingleResponseModel<TokenModel>>(api,loginModel).subscribe((res)=>{
      localStorage.setItem("token", res.data.token)
      this.toastrService.success(res.message);
      this.isAuth = true;
      this.router.navigate(['/']);
      return true;
    }, (err)=>{
      this.errorService.errorHandler(err);
      return false;
    });
    return false;
  }

  logout(){
    localStorage.removeItem("token");
    this.isAuth = false;
    this.router.navigate(["/"]);
    this.toastrService.warning("Çıkış başarılı");
  }
}

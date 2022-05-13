import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable,of} from 'rxjs';
import { Login } from '../models/login';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth:boolean = false;

  constructor(
    private toastrService:ToastrService,
    private httpClient:HttpClient,
    private router:Router
  ) { }

  isAuthenticated():boolean{
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }

  login(loginModel:Login):boolean{
    //let api = "https://webapi.angulareducation.com/api/users/login";
    let api = "https://localhost:44343/api/Users/login"
    this.httpClient.post<SingleResponseModel<TokenModel>>(api,loginModel).subscribe((res)=>{
      console.log(res.data)
      localStorage.setItem("token", res.data.token)
      this.toastrService.success(res.message);
      this.isAuth = true;
      this.router.navigate(['/']);
      return true;
    }, (err)=>{
      if (err.status == "400") {
        this.toastrService.error(err.error);
      }else{
        console.log(err)
      }
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

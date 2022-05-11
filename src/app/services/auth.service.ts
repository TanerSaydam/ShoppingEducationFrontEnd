import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth:boolean = false;

  constructor(
    private toastrService:ToastrService
  ) { }

  isAuthenticated():Observable<any>{
    return of(this.isAuth);
  }

  login(){
    this.isAuth = true;
    this.toastrService.info("Giriş başarılı");
  }

  logout(){
    this.isAuth = false;
    this.toastrService.warning("Çıkış başarılı");
  }
}

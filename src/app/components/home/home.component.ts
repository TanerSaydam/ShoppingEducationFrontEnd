import { AfterContentChecked, Component, OnInit } from "@angular/core";
import { BasketModel } from "src/app/models/basket";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector:'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, AfterContentChecked{
  isAuth:boolean = false;

  constructor(
    private authService:AuthService
  ){}

  ngOnInit(): void {
    console.log(this.isAuth)
    this.authService.isAuthenticated().subscribe((res)=>{
      console.log(res)
      this.isAuth = res
    })
  }

  ngAfterContentChecked(): void {
    this.isAuth = this.authService.isAuth;
  }
}

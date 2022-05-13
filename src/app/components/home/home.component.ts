import { AfterContentChecked, AfterContentInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { BasketModel } from "src/app/models/basket";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector:'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
  isAuth:boolean = false;

  constructor(
    private authService:AuthService
  ){}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
  }

  ngAfterContentChecked(): void {
    //console.log("ngAfterContentChecked çalışıyor")
    this.isAuth = this.authService.isAuthenticated();
  }

}

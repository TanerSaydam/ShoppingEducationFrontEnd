import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentChecked, AfterContentChecked {

  baskets:BasketModel[] = [];
  total:number = 0;
  isAuth:boolean = false;

  constructor(
    private basketService:BasketService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.baskets = this.basketService.baskets;
    this.isAuth = this.authService.isAuthenticated();
  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total;
    this.isAuth = this.authService.isAuthenticated();
  }


  logout(){
    this.authService.logout();
    this.isAuth = this.authService.isAuthenticated();
  }
}

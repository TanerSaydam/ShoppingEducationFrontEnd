import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentChecked {

  baskets:BasketModel[] = [];
  total:number = 0;

  constructor(
    private basketService:BasketService
  ) { }

  ngOnInit(): void {
    this.baskets = this.basketService.baskets;
  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total;
  }

}

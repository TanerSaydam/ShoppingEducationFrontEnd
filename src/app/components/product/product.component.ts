import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: ProductModel[] = [
    {
      name: 'Peynir',
      price: 26.61,
      imageUrl: 'https://www.peynircibaba.com/image/catalog/urunler/1008.jpg',
    },
    {
      name: 'Zeytin',
      price: 132.5,
      imageUrl:
        'https://ayb.akinoncdn.com/products/2022/01/11/86068/e8dc8586-0cf0-4efb-b2d6-bdecac9800b7_size780x780_quality60_cropCenter.jpg',
    },
    {
      name: 'Tereyağ',
      price: 60,
      imageUrl:
        'https://d2uiaykj5yb3c0.cloudfront.net/bravo/img/p/c2b92da5-46bd-4083-a3d3-34a4980bf1a0.jpg',
    },
    {
      name: 'Lavaş',
      price: 26.5,
      imageUrl:
        'https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05051773/05051773-2e6f99-1650x1650.jpg',
    },
    {
      name: 'Yeşil Zeytin',
      price: 99.99,
      imageUrl:
        'https://st3.myideasoft.com/idea/dr/93/myassets/products/008/kirmizi-biber-dolgulu-zeytin-png_min.png?revision=1641304360',
    },
    {
      name: 'Telefon Kablosu',
      price: 18.90,
      imageUrl:
        'https://productimages.hepsiburada.net/s/10/500/9207755767858.jpg',
    },
    {
      name: 'Priz',
      price: 9.99,
      imageUrl:
        'https://productimages.hepsiburada.net/s/25/375/10125665042482.jpg',
    },
    {
      name: 'Ekmek',
      price: 2.50,
      imageUrl:
        'https://esenlik.com.tr//images/prod/2540.jpg',
    },
  ];

  baskets: BasketModel[] = [];
  total:number = 0;
  @Output() myEvent:EventEmitter<any> = new EventEmitter();



  constructor(
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {}

  addBasket(product:ProductModel){
    let basketModel = new BasketModel();
    basketModel.product = product;
    basketModel.quantity = parseInt((<HTMLInputElement>document.getElementById("quantity-" + product.name)).value);

    (<HTMLInputElement>document.getElementById("quantity-" + product.name)).value = "1"

    this.baskets.push(basketModel);
    //this.total = this.total + (basketModel.quantity * product.price);

    this.myEvent.emit({ data: this.baskets});
    this.toastrService.success(product.name + " sepete başarıyla eklendi");
  }
}

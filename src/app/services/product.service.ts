import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { ProductModel } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[] = [
    {
      id:0,
      name: 'Peynir',
      inventoryQuantity: 100,
      price: 26.61,
      imageUrl: 'https://www.peynircibaba.com/image/catalog/urunler/1008.jpg',
    },
    {
      id:1,
      name: 'Zeytin',
      inventoryQuantity: 100,
      price: 132.5,
      imageUrl:
        'https://ayb.akinoncdn.com/products/2022/01/11/86068/e8dc8586-0cf0-4efb-b2d6-bdecac9800b7_size780x780_quality60_cropCenter.jpg',
    },
    {
      id:2,
      name: 'Tereyağ',
      inventoryQuantity: 100,
      price: 60,
      imageUrl:
        'https://d2uiaykj5yb3c0.cloudfront.net/bravo/img/p/c2b92da5-46bd-4083-a3d3-34a4980bf1a0.jpg',
    },
    {
      id:3,
      name: 'Lavaş',
      inventoryQuantity: 100,
      price: 26.5,
      imageUrl:
        'https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05051773/05051773-2e6f99-1650x1650.jpg',
    },
    {
      id:4,
      name: 'Yeşil Zeytin',
      inventoryQuantity: 100,
      price: 99.99,
      imageUrl:
        'https://st3.myideasoft.com/idea/dr/93/myassets/products/008/kirmizi-biber-dolgulu-zeytin-png_min.png?revision=1641304360',
    },
    {
      id:5,
      name: 'Telefon Kablosu',
      inventoryQuantity: 100,
      price: 18.90,
      imageUrl:
        'https://productimages.hepsiburada.net/s/10/500/9207755767858.jpg',
    },
    {
      id:6,
      name: 'Priz',
      inventoryQuantity: 100,
      price: 9.99,
      imageUrl:
        'https://productimages.hepsiburada.net/s/25/375/10125665042482.jpg',
    },
    {
      id:7,
      name: 'Ekmek',
      inventoryQuantity: 100,
      price: 2.50,
      imageUrl:
        'https://esenlik.com.tr//images/prod/2540.jpg',
    },
  ];

  constructor(
    private toastrService: ToastrService
  ) { }

  add(model: ProductModel):boolean {
    let length = this.products.filter(p => p.name.toLocaleLowerCase() == model.name.toLocaleLowerCase()).length
    if (length == 0) {
      this.products.push(model);
      this.toastrService.success(model.name + " başarıyla eklendi");
      return true;
    } else {
      this.toastrService.error("Eklemeye çalıştığınız ürün kayıtlarda mevcut!");
      return false;
    }
  }

  getList():Observable<any>{
    return of(this.products);
  }

  getById(id:number):Observable<any>{
    //console.log(id);
    let model:ProductModel = this.products.find(i=> i.id == id);
    //console.log(model);
    return of(model);
  }

  update(model: ProductModel){
    let productModel:ProductModel = this.products.find(i=> i.id == model.id);
    let index = this.products.indexOf(productModel);
    this.products[index] = model;
    //console.log(productModel);
  }

}

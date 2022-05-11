import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  updateForm: FormGroup
  productModel:ProductModel;

  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getById();
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      'id': [0, [Validators.required]],
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'inventoryQuantity': [0, [Validators.required, Validators.min(1)]],
      'price': [, [Validators.required, Validators.min(1)]],
      'imageUrl': [, [Validators.required, Validators.minLength(5)]],
    })
  }

  getById(){
    //let id = +this.activatedRoute.snapshot.params["id"];
    let id:number = 0;
    this.activatedRoute.params.subscribe((params)=>{
       id = params["id"];
    })
    this.productService.getById(id).subscribe((res)=>{
      this.productModel = res
      this.updateForm.controls["id"].setValue(res.id);
      this.updateForm.controls["name"].setValue(res.name);
      this.updateForm.controls["inventoryQuantity"].setValue(res.inventoryQuantity);
      this.updateForm.controls["price"].setValue(res.price);
      this.updateForm.controls["imageUrl"].setValue(res.imageUrl);
    },(err)=>{
      console.log(err);
    });
  }

  update(){
    if (this.updateForm.valid) {
      this.productService.update(this.updateForm.value);
      this.router.navigate(["/"]);
    }else{
      console.log("Girilen bilgiler eksik");
    }
  }

}

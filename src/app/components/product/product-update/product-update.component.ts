import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
  img:string = "";

  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private toastrService:ToastrService
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
      'codeGuid': [""],
    })
  }

  getById(){
    this.spinner.show();
    let guid:string = "";
    this.activatedRoute.params.subscribe((params)=>{
       guid = params["value"];
    })
    this.productService.getById(guid).subscribe((res)=>{
      this.spinner.hide();
      this.productModel = res.data
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["name"].setValue(res.data.name);
      this.updateForm.controls["inventoryQuantity"].setValue(res.data.inventoryQuantity);
      this.updateForm.controls["price"].setValue(res.data.price);
      this.updateForm.controls["imageUrl"].setValue(res.data.imageUrl);
      this.updateForm.controls["codeGuid"].setValue(res.data.codeGuid);
    },(err)=>{
      this.spinner.hide();
      console.log(err);
    });
  }

  update(){
    if (this.updateForm.valid) {
      this.productService.update(this.updateForm.value).subscribe((res)=>{
        this.spinner.hide();
        this.router.navigate(["/"]);
        this.toastrService.info(res.message);
      },(err)=>{
        this.spinner.hide();
      });
    }else{
      this.spinner.hide();
      this.toastrService.error("Zorunlu alanları doldurun");
    }
  }

  deleteProduct(){
    this.spinner.show();
    this.productService.delete(this.updateForm.value).subscribe((res)=>{
      this.spinner.hide();
      this.router.navigate(["/"]);
      this.toastrService.warning(res.message);
    },(err)=>{
      this.spinner.hide();
      console.log(err);
    });
  }

}

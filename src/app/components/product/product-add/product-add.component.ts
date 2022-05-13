import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ProductModel } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {

  addForm: FormGroup
  img:string = "";

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private spinner:NgxSpinnerService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'inventoryQuantity': [0, [Validators.required, Validators.min(1)]],
      'price': [, [Validators.required, Validators.min(1)]],
      'imageUrl': [, [Validators.required, Validators.minLength(5)]],
      "codeGuid": ['']
    })
  }

  add() {
    this.spinner.show();
   if (this.addForm.valid) {
    let model:ProductModel = this.addForm.value;
    this.productService.add(model).subscribe((res)=>{
      this.spinner.hide();
      this.router.navigate(["/"]);
      this.toastrService.success(res.message);
    },(err)=>{
      this.spinner.hide();
      console.log(err)
    })
   }else{
    this.spinner.hide();
    this.toastrService.error("Zorunlu alanları doldurun");
   }
  }
}

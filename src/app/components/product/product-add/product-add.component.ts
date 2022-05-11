import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductModel } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {

  // @ViewChild("inputName") name:ElementRef;
  // @ViewChild("inputQuantity") quantity:ElementRef;
  // @ViewChild("inputPrice") price:ElementRef;
  // @ViewChild("inputImage") image:ElementRef;

  addForm: FormGroup

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
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
    })
  }

  add() {
    if (this.addForm.valid) {
      let status: Boolean = this.productService.add(this.addForm.value);
      if (status) {
        this.addForm.reset();
      }
    }
  }
}

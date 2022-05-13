import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterContentChecked {

  total: number;
  @Output() myEvent: EventEmitter<any> = new EventEmitter();
  paymentForm: FormGroup;

  constructor(
    private basketService: BasketService,
    private formBuilder: FormBuilder,
    private spinnerService:NgxSpinnerService,
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      "id": [0],
      "date": [Date()],
      "cartNumber": ["", Validators.required],
      "cartOwner": ["", Validators.required],
      "expirationDate": ["", Validators.required],
      "cvv": ["", [Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    });
  }

  ngAfterContentChecked(): void {
    this.total = this.basketService.total;
  }



  payment() {
    this.spinnerService.show();
    if (this.paymentForm.valid) {
      let model = this.paymentForm.value;
      this.basketService.payment(model);
      this.spinnerService.hide();
      document.getElementById("paymentModalCloseBtn").click();
    }else{
      this.spinnerService.hide();
      this.toastrService.error("Zorunlu alanları doldurun");
    }
  }
}

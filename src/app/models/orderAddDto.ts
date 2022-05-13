import { BasketModel } from "./basket";
import { PaymentModel } from "./payment";

export class OrderAddDtoModel{
  payment:PaymentModel;
  baskets:BasketModel[];
}

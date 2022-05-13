import { OrderModel } from "./order";
import { PaymentModel } from "./payment";

export class OrderDtoModel{
  orders: OrderModel[];
  payment:PaymentModel;
  total:number;
}

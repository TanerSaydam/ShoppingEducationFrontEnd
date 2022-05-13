import { ResponseModel } from "./responseModel";

export class ListReponseModel<T> extends ResponseModel{
  data: T[];
}

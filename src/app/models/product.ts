import { Customer } from "./customer";
export interface Product {
  code: string;
  desc: string;
  price: string;
  points: number;
  customer: Customer;
  id?: any;
}

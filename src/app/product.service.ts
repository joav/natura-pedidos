import { Injectable } from "@angular/core";
import { Product } from "./models/product";
import { Customer } from "./models/customer";
import { CustomersService } from "./customers.service";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  products: Product[] = [];
  constructor(private cService: CustomersService) {}

  add(product: Product) {
    this.products.push(product);
  }
  /// Filtrar por customer
  total() {
    return this.filter().reduce(
      (last: number, current: Product) => last + +current.price,
      0
    );
  }

  totalPoints() {
    return this.filter().reduce(
      (last: number, current: Product) => last + +current.points,
      0
    );
  }

  countProducts(c: Customer) {
    return this.products.filter(
      p => p.customer.name.toLowerCase() === c.name.toLowerCase()
    ).length;
  }

  filter() {
    return this.cService.currentCustomer && this.cService.currentCustomer.name
      ? this.products.filter(
          p =>
            p.customer.name.toLowerCase() ===
            this.cService.currentCustomer.name.toLowerCase()
        )
      : this.products;
  }

  remove(keys:any[]){
    const products = this.products.filter(p => keys.indexOf(p.id) == -1);
    this.products = products;
  }
}

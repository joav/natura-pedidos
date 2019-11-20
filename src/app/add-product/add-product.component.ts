import { Component, OnInit, Input } from "@angular/core";
import { Customer } from "../models/customer";
import { Product } from "../models/product";
import { ProductService } from "../product.service";
import { CustomersService } from "../customers.service";
import { TabsService } from "../tabs.service";
import { DbService } from "../db.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  @Input("customer") customer: Customer = { name: "" };
  product: Product = {
    code: "",
    desc: "",
    price: "",
    points: 0,
    customer: { name: "" }
  };
  withCustomer = true;
  constructor(
    private pService: ProductService,
    private cService: CustomersService,
    private tabs: TabsService,
    private db: DbService
  ) {
    if (this.tabs.lastPage === "products") {
      this.cService.currentCustomer = { name: "" };
      this.withCustomer = false;
    }
  }

  ngOnInit() {}

  add() {
    if(this.product.code && this.customer.name && this.product.price){
      this.product.customer = this.customer;
      this.pService.add(this.product);
      this.db.add("products", this.product).subscribe(p => {
        this.pService.products[this.pService.products.length - 1] = p as Product;
      });
      const inserted = this.cService.add(this.customer);
      if (inserted) {
        this.db.add("customers", this.customer).subscribe(c => {
          this.cService.customers[
            this.cService.customers.length - 1
          ] = c as Customer;
        });
      }
      const product: Product = {
        code: "",
        desc: "",
        price: "",
        customer: this.customer,
        points: 0
      };
      this.product = product;
    }
  }
}

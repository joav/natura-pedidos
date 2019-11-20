import { Component, OnInit } from "@angular/core";
import { Customer } from "../models/customer";
import { ProductService } from "../product.service";
import { CustomersService } from "../customers.service";
import { TabsService } from "../tabs.service";
import { DbService } from "../db.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  customer: Customer = {
    name: ""
  };

  constructor(
    public pService: ProductService,
    public cService: CustomersService,
    private tabs: TabsService,
    private db: DbService
  ) {
    this.cService.currentCustomer = { name: "" };
  }

  ngOnInit() {}

  add() {
    if(this.customer.name){
      this.cService.add(this.customer);
      this.db.add("customers", this.customer).subscribe(c => {
        console.log(c);
      });
      this.customer = {
        name: ""
      };
    }
  }

  addProduct(c: Customer) {
    this.cService.currentCustomer = c;
    this.tabs.change({ creationActive: true });
  }

  viewProducts(c: Customer) {
    this.cService.currentCustomer = c;
    this.tabs.change({ listActive: true });
  }
}

import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { CustomersService } from "../customers.service";
import { TabsService } from "../tabs.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  constructor(
    public pService: ProductService,
    public cService: CustomersService,
    private tabs: TabsService
  ) {
    if (this.tabs.lastPage === "creation") {
      this.cService.currentCustomer = { name: "" };
    }
  }

  ngOnInit() {}
}

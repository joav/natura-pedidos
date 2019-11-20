import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { CustomersService } from "../customers.service";
import { TabsService } from "../tabs.service";
import { DbService } from '../db.service';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  withCustomer = false;
  constructor(
    public pService: ProductService,
    public cService: CustomersService,
    private tabs: TabsService,
    private db:DbService
  ) {
    if (this.tabs.lastPage === "creation") {
      this.cService.currentCustomer = { name: "" };
    }else if(this.cService.currentCustomer.name !== ''){
      this.withCustomer = true;
    }
  }

  ngOnInit() {}

  clear(){
    if(this.withCustomer){
      this.clearForCustomer();
    }else{
      this.clearAll();
    }
  }

  clearAll(){
    if(this.pService.products.length){
      this.db.clear('products').subscribe(clean => {
        if(clean){
          this.pService.products = [];
        }
      });
    }
  }

  clearForCustomer(){
    const keys = this.pService.filter().map(p => p.id);
    if(keys.length){
      this.db.deleteMultiple('products', keys).subscribe(clean => {
        if(clean.indexOf(false) === -1){
          this.pService.remove(keys);
        }
      });
    }
  }
}

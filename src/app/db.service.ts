import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomersService } from "./customers.service";
import { ProductService } from "./product.service";
import { Customer } from "./models/customer";
import { Product } from "./models/product";

@Injectable({
  providedIn: "root"
})
export class DbService {
  db: IDBDatabase;
  db_name = "natura-pedidos";
  db_v = 1;
  constructor(
    private pService: ProductService,
    private cService: CustomersService
  ) {
    const req = indexedDB.open(this.db_name, this.db_v);

    req.onerror = this._error;

    req.onsuccess = this._succesOpen;

    req.onupgradeneeded = this._createDatabase;
  }

  private _createDatabase = (e: IDBVersionChangeEvent) => {
    const target: any = e.target;
    const db: IDBDatabase = target.result;
    const customerOS = db.createObjectStore("customers", {
      autoIncrement: true
    });
    const productsOS = db.createObjectStore("products", {
      autoIncrement: true
    });
    customerOS.createIndex("name", "name", { unique: true });
    productsOS.createIndex("code", "code", { unique: false });
  };

  private _succesOpen = (e: Event) => {
    const target: any = e.target;
    this.db = target.result;
    this.db.onerror = this._error;
    const transaction = this.db.transaction(
      ["customers", "products"],
      "readwrite"
    );
    const reqC = transaction.objectStore("customers").getAll();
    reqC.onsuccess = () => {
      this.cService.customers = reqC.result;
    };
    const reqP = transaction.objectStore("products").getAll();
    reqP.onsuccess = () => {
      this.pService.products = reqP.result;
    };
  };

  private _error = (e: Event) => {
    const target: any = e.target;
    console.log(target);
  };

  add(store: string, item: Customer | Product) {
    return new Observable<Customer | Product>(sub => {
      const transaction = this.db.transaction([store], "readwrite");
      const req = transaction.objectStore(store).add(item);
      req.onsuccess = () => {
        console.log(req.result);
        item.id = req.result;
        sub.next(item);
        sub.complete();
      };
    });
  }
}

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TabsService {
  customersActive = false;
  creationActive = true;
  listActive = false;
  lastPage: string = "creation";

  change({
    customersActive = false,
    creationActive = false,
    listActive = false
  }) {
    this.lastPage = this.creationActive
      ? "creation"
      : this.customersActive
      ? "cutomer"
      : "products";
    this.customersActive = customersActive;
    this.creationActive = creationActive;
    this.listActive = listActive;
  }
}

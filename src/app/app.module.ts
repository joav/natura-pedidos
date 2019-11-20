import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductListComponent } from "./product-list/product-list.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CustomerListComponent,
    AddProductComponent,
    ProductListComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

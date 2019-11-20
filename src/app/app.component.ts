import { Component } from "@angular/core";
import { TabsService } from "./tabs.service";
import { CustomersService } from "./customers.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  constructor(public tabs: TabsService, public cService: CustomersService) {}
}

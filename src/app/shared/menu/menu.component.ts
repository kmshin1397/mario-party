import { Component, OnInit, Input } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Input()
  items: MenuItem[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // If a logout button is included in the menu, attach the logout function to it
    if (this.items.findIndex(val => val.label == "Logout")) {
      this.items.pop();
      this.items.push({
        label: "Logout",
        icon: "fas fa-sign-out-alt",
        command: event => {
          this.logout();
        }
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}

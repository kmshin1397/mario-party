import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"]
})
export class RulesComponent implements OnInit {
  items: MenuItem[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: "Game",
        icon: "fas fa-dice",
        routerLink: "/game"
      },
      { label: "Shop", icon: "fas fa-shopping-cart", routerLink: "/shop" },
      {
        label: "Profile",
        icon: "fas fa-user-alt",
        routerLink: "/profile"
      },
      {
        label: "Scoreboard",
        icon: "fas fa-list-ol",
        routerLink: "/scoreboard"
      },
      {
        label: "QR Reader",
        icon: "fas fa-qrcode",
        routerLink: "/qr"
      }
    ];

    if (this.authService.isAdmin()) {
      this.items = [
        {
          label: "Admin",
          icon: "fas fa-user-lock",
          routerLink: "/admin"
        },
        {
          label: "Scoreboard",
          icon: "fas fa-list-ol",
          routerLink: "/scoreboard"
        }
      ];
    }
    this.items.push({
      label: "Logout",
      icon: "fas fa-sign-out-alt"
    });
  }
}

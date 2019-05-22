import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.css"]
})
export class ScoreboardComponent implements OnInit {
  items: MenuItem[];

  scoreboardData: any[];
  cols: any[];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: "Game",
        icon: "fas fa-dice",
        routerLink: "/game"
      },
      {
        label: "Rules",
        icon: "fas fa-gavel",
        routerLink: "/rules"
      },
      { label: "Shop", icon: "fas fa-shopping-cart", routerLink: "/shop" },
      {
        label: "Profile",
        icon: "fas fa-user-alt",
        routerLink: "/profile"
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
          label: "Rules",
          icon: "fas fa-gavel",
          routerLink: "/rules"
        }
      ];
    }

    this.items.push({
      label: "Logout",
      icon: "fas fa-sign-out-alt"
    });

    this.userService.getScoreboardData().then(data => {
      this.scoreboardData = data;
      console.log(this.scoreboardData);
    });

    this.cols = [
      { field: "name", header: "Team" },
      { field: "numStars", header: "Stars" },
      { field: "numCoins", header: "Coins" }
    ];
  }
}

import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.css"]
})
export class ScoreboardComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

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
      {
        label: "Profile",
        icon: "fas fa-user-alt",
        routerLink: "/profile"
      },
      {
        label: "QR Reader",
        icon: "fas fa-qrcode",
        routerLink: "/qr"
      },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt"
      }
    ];
  }
}

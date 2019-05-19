import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.css"]
})
export class RulesComponent implements OnInit {
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
        label: "Scoreboard",
        icon: "fas fa-list-ol"
      },
      {
        label: "Rules",
        icon: "fas fa-gavel"
      },
      { separator: true },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt"
      }
    ];
  }
}

import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  items: MenuItem[];

  dice: boolean = false;

  constructor() {}

  ngOnInit() {
    // Set up menu
    this.items = [
      {
        label: "Profile",
        icon: "fas fa-user-alt",
        routerLink: "/profile"
      },
      {
        label: "Scoreboard",
        icon: "fas fa-list-ol"
      },
      { separator: true },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt"
      }
    ];
  }

  openDice() {
    this.dice = true;
  }

  closeDice() {
    this.dice = false;
  }
}

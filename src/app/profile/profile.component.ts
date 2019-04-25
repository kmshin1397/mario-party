import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "../auth.service";
import { Characters } from "../characters";
import { UserService } from "../user.service";

import { MenuItem } from "primeng/api";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnChanges {
  character: any = null;
  items: MenuItem[];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: "Game",
        icon: "fas fa-dice",
        routerLink: "/board"
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
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.character = null;
    this.userService
      .getCharacterDetails()
      .then(character => (this.character = character));
    console.log(this.character);
  }
}

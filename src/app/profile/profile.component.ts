import { Component, OnInit, OnChanges, HostBinding } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Characters } from "../characters";
import { UserService } from "../services/user.service";

import { MenuItem } from "primeng/api";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnChanges {
  character: any = null;
  items: MenuItem[];
  color: string;

  @HostBinding("attr.style")
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(
      `--char-color: ${this.color}`
    );
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer
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

    this.items.push({
      label: "Logout",
      icon: "fas fa-sign-out-alt"
    });

    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.character = null;
    this.userService.getCharacterDetails().then(character => {
      this.character = character;
      this.color = character.color;
    });
    console.log(this.character);
  }
}

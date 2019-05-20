import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { UserService } from "../user.service";

@Component({
  selector: "app-qr",
  templateUrl: "./qr.component.html",
  styleUrls: ["./qr.component.css"]
})
export class QrComponent implements OnInit {
  @ViewChild("scanner")
  private scanner: ZXingScannerComponent;

  items: MenuItem[];

  constructor(private userService: UserService) {}

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
        label: "Scoreboard",
        icon: "fas fa-list-ol",
        routerLink: "/scoreboard"
      },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt"
      }
    ];
  }

  processQR(code: string) {
    console.log(code);
    var starRE = new RegExp("^STAR");
    if (starRE.test(code)) {
      this.userService.updateCanMove(true);
    }
  }

  camerasFoundHandler(event) {
    this.scanner.scan(event[0].deviceId);
  }
}

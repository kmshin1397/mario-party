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

  showStar: boolean;
  showCoin: boolean;
  numCoins: number;
  showPuzzle: boolean;
  puzzleMsg: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.showStar = false;
    this.showCoin = false;
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
    var coinRE = new RegExp("^COIN");
    if (starRE.test(code)) {
      this.userService.updateCanMove(true);
      this.showStar = true;
    } else if (coinRE.test(code)) {
      this.numCoins = parseInt(code.split(" ")[1]);
      this.showCoin = true;
    } else {
      this.puzzleMsg = code;
      this.showPuzzle = true;
    }
  }

  camerasFoundHandler(event) {
    // console.log(camera);

    // Find camera
    var backRE = new RegExp("back", "i");
    var backCamera = event[0];
    for (var i = 0; i < event.length; i++) {
      var camera = event[i];
      // Found
      if (backRE.test(camera.label)) {
        backCamera = camera;
      }
    }

    this.scanner.scan(backCamera.deviceId);
  }

  closeStar() {
    this.showStar = false;
  }

  closeCoin() {
    this.showCoin = false;
  }

  closePuzzle() {
    this.showPuzzle = false;
  }
}

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

  scannerInUse: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.showStar = false;
    this.showCoin = false;
    this.scannerInUse = false;
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

  async processQR(code: string) {
    console.log(code);
    if (!this.scannerInUse) {
      var starRE = new RegExp("^STAR");
      var coinRE = new RegExp("^COIN");
      if (starRE.test(code)) {
        var starId = parseInt(code.split(" ")[1]);

        this.scannerInUse = true;
        var promise1 = this.userService.updateCanMove(true);
        var promise2 = this.userService.addStar(starId);

        // 3 second buffer window to ignore scans
        var sleep = new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 10000);
        });

        Promise.all([promise1, promise2, sleep]).then(x => {
          this.scannerInUse = false;
        });

        this.showStar = true;
      } else if (coinRE.test(code)) {
        this.numCoins = parseInt(code.split(" ")[1]);
        var coinId = parseInt(code.split(" ")[2]);

        this.scannerInUse = true;
        var promise = this.userService.addCoins(this.numCoins, coinId);
        var sleep = new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 10000);
        });

        Promise.all([promise, sleep]).then(x => {
          this.scannerInUse = false;
        });

        this.showCoin = true;
      } else {
        this.puzzleMsg = code;
        this.showPuzzle = true;
      }
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

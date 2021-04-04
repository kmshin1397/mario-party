import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { delay } from "q";
import { BoardComponent } from "../board/board.component";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
  items: MenuItem[];

  dice: boolean = false;

  diceRoll: number;

  user: any;

  canMove: boolean;

  @ViewChild(BoardComponent) board: BoardComponent;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    // Set up menu
    this.items = [
      {
        label: "Rules",
        icon: "fas fa-gavel",
        routerLink: "/rules",
      },
      { label: "Shop", icon: "fas fa-shopping-cart", routerLink: "/shop" },
      {
        label: "Profile",
        icon: "fas fa-user-alt",
        routerLink: "/profile",
      },
      {
        label: "Scoreboard",
        icon: "fas fa-list-ol",
        routerLink: "/scoreboard",
      },
      {
        label: "QR Reader",
        icon: "fas fa-qrcode",
        routerLink: "/qr",
      },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt",
      },
    ];

    this.user = await this.userService.getCharacterDetails();
    console.log(this.user);
    console.log("can move is at " + this.user.canMove);
    this.canMove = this.user.canMove;
  }

  openDice() {
    this.dice = true;
  }

  closeDice() {
    this.dice = false;

    // Disable dice after moving until next puzzle is completed
    // COMMENTED OUT FOR DEMO PURPOSES
    // this.userService.updateCanMove(false);
    this.canMove = false;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async moveCharacter(numSpaces: number) {
    // 1 and 6 are switched for some reason, so adjust accordingly
    switch (numSpaces) {
      case 1: {
        this.diceRoll = 6;
        break;
      }
      case 6: {
        this.diceRoll = 1;
        break;
      }
      default: {
        this.diceRoll = numSpaces;
        break;
      }
    }

    this.board.moveCharacter(this.diceRoll);

    await delay(1800);

    this.closeDice();
  }
}

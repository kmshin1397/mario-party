import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { delay } from "q";
import { BoardComponent } from "../board/board.component";
import { UserService } from "src/app/user.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  items: MenuItem[];

  dice: boolean = false;

  diceRoll: number;

  user: any;

  @ViewChild(BoardComponent) board: BoardComponent;

  constructor(private userService: UserService) {}

  async ngOnInit() {
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
      {
        label: "Rules",
        icon: "fas fa-gavel",
        routerLink: "/rules"
      },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt"
      }
    ];

    this.user = await this.userService.getCharacterDetails();
  }

  openDice() {
    this.dice = true;
  }

  closeDice() {
    this.dice = false;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

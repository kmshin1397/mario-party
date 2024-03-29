import { Component, OnInit } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { UserService } from "../services/user.service";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { Character } from "../character";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
  animations: [
    trigger("rowExpansionTrigger", [
      state(
        "void",
        style({
          transform: "translateX(-10%)",
          opacity: 0
        })
      ),
      state(
        "active",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),
      transition("* <=> *", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)"))
    ])
  ]
})
export class ShopComponent implements OnInit {
  items: MenuItem[];

  shopData: any[];
  cols: any[];

  selectedItem: any;

  displayDialogue: boolean;
  loadingPur: boolean;
  showPurchase: boolean;
  rollRNG: boolean;

  userData: Character;

  ready: boolean = false;

  errMsg: string;

  // Result of random bonus roll
  rng: any;
  showRandomPurchase: boolean;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.displayDialogue = false;
    this.showPurchase = false;
    this.showRandomPurchase = false;
    this.loadingPur = false;
    this.rollRNG = false;
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
        label: "QR Reader",
        icon: "fas fa-qrcode",
        routerLink: "/qr"
      },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt"
      }
    ];

    this.cols = [
      { field: "name", header: "Name" },
      { field: "price", header: "Price" },
      { field: "cap", header: "In Stock" }
    ];

    this.userData = await this.userService.getCharacterDetails();

    this.userService.getShopData().then(data => {
      this.shopData = data;
      console.log(this.shopData);
      this.ready = true;
    });
  }

  selectHandler() {
    console.log(this.selectedItem);
    this.displayDialogue = true;
  }

  closeDialogue() {
    this.displayDialogue = false;
  }

  loadingPurchase() {
    this.loadingPur = true;
  }

  async buyItem() {
    this.userData = await this.userService.getCharacterDetails();
    if (this.selectedItem.cap <= 0) {
      this.closeDialogue();
      this.errMsg = "There are no more of these in stock!";
      this.addSingle();
    } else if (this.userData.numCoins >= this.selectedItem.price) {
      if (this.selectedItem.name != "Random Bonus Dice") {
        this.loadingPurchase();
        await Promise.all([
          this.userService.subtractCoins(this.selectedItem.price),
          this.userService.buyItem(this.selectedItem.name)
        ]);
        this.loadingPur = false;
        this.closeDialogue();
        this.showPurchase = true;
        this.ready = false;
        this.userService.getShopData().then(data => {
          this.shopData = data;
          this.ready = true;
        });
      } else {
        this.loadingPurchase();
        await Promise.all([
          this.userService.subtractCoins(this.selectedItem.price),
          this.userService.buyItem(this.selectedItem.name)
        ]);

        this.loadingPur = false;
        this.closeDialogue();
        this.rollRNG = true;
      }
    } else {
      this.closeDialogue();
      this.errMsg = "You don't have enough coins for this!";
      this.addSingle();
    }
  }

  closePurchase() {
    this.showPurchase = false;
  }

  addSingle() {
    this.messageService.add({
      severity: "error",
      summary: "Purchase Failed",
      detail: this.errMsg
    });
  }

  clear() {
    this.messageService.clear();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async diceRoll(event) {
    console.log(event);

    await this.delay(1800);

    this.rng = event;

    switch (this.rng.roll) {
      case 2: {
        this.userData = await this.userService.getCharacterDetails();
        this.userService.subtractCoins(this.rng.numCoins);
        break;
      }
      case 3: {
        this.userService.addStar(-1 * Math.random());
        break;
      }

      case 5: {
        this.userService.addHints(this.rng.numHints);
        break;
      }
      case 6: {
        this.userData = await this.userService.getCharacterDetails();
        this.userService.addCoins(this.rng.numCoins, Math.random());
        break;
      }
    }

    this.showRandomPurchase = true;
    this.closeDice();
  }

  closeDice() {
    this.rollRNG = false;
  }

  closeRandomPurchase() {
    this.showRandomPurchase = false;
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { Character } from "src/app/character";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-rng-dice",
  templateUrl: "./rng-dice.component.html",
  styleUrls: ["./rng-dice.component.css"]
})
export class RngDiceComponent implements OnInit {
  @ViewChild("dice1") elDice: ElementRef;

  @Output() closed = new EventEmitter<boolean>();

  @Output() diceRoll = new EventEmitter<any>();

  user: Character;

  randomCoinAmount: number;
  numHints: number;
  bonusMsg: string;
  bonusType: string;
  iconSrc: string;

  rolled: boolean;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.rolled = false;
    this.user = await this.userService.getCharacterDetails();
  }

  rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  getRandomItem(list: any[], weight: number[]) {
    var total_weight = weight.reduce(function(prev, cur, i, arr) {
      return prev + cur;
    });

    var random_num = this.rand(0, total_weight);
    var weight_sum = 0;
    //console.log(random_num)

    for (var i = 0; i < list.length; i++) {
      weight_sum += weight[i];
      weight_sum = +weight_sum.toFixed(2);

      if (random_num <= weight_sum) {
        return list[i];
      }
    }
  }

  // Roll Function
  async roll() {
    // Initial dice variables
    var rewards = [1, 2, 3, 4, 5, 6];
    var weights = [0.19, 0.19, 0.05, 0.19, 0.19, 0.19];

    // var diceOne = this.filterRoll(this.getRandomItem(rewards, weights));
    var diceOne = this.getRandomItem(rewards, weights);

    console.log(diceOne);
    switch (diceOne) {
      case 1: {
        this.bonusMsg = "You must roll the exercise die!";
        this.bonusType = "bad";
        this.iconSrc = "../../assets/item_block.png";
        break;
      }
      case 2: {
        this.randomCoinAmount = Math.floor(Math.random() * 10) + 1;
        this.bonusMsg =
          "You lost " + this.randomCoinAmount.toString() + " coins!";
        this.bonusType = "bad";
        this.iconSrc = "../../assets/red_coin.png";
        break;
      }
      case 3: {
        this.bonusMsg = "You got a bonus star!";
        this.bonusType = "good";
        this.iconSrc = "../../assets/star.png";
        break;
      }
      case 4: {
        this.bonusMsg = "You get a free snack!";
        this.bonusType = "good";
        this.iconSrc = "../../assets/donut.png";
        break;
      }
      case 5: {
        this.numHints = Math.floor(Math.random() * 2) + 1;
        this.bonusMsg = "You got " + this.numHints.toString() + " free hints!";
        this.bonusType = "good";
        this.iconSrc = "../../assets/hint.png";
        break;
      }
      case 6: {
        this.randomCoinAmount = Math.floor(Math.random() * 16) + 10;
        this.bonusMsg =
          "You got bonus " + this.randomCoinAmount.toString() + " coins!";
        this.bonusType = "good";
        this.iconSrc = "../../assets/coin.png";
        break;
      }
    }

    this.elDice.nativeElement.classList.toggle("animate");

    //Dice reset and display
    for (var i = 1; i <= 6; i++) {
      this.elDice.nativeElement.classList.remove("show-" + i);
      if (diceOne === i) {
        this.elDice.nativeElement.classList.add("show-" + i);
      }
      this.rolled = true;
    }

    this.diceRoll.emit({
      roll: diceOne,
      msg: this.bonusMsg,
      type: this.bonusType,
      iconSrc: this.iconSrc,
      numCoins: this.randomCoinAmount,
      numHints: this.numHints
    });
  }

  close() {
    this.closed.emit(true);
  }

  filterRoll(roll: number) {
    switch (roll) {
      case 1: {
        return 6;
      }
      case 6: {
        return 1;
      }
      default: {
        return roll;
      }
    }
  }
}

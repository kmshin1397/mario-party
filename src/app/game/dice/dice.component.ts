import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Character } from "src/app/character";

@Component({
  selector: "app-dice",
  templateUrl: "./dice.component.html",
  styleUrls: ["./dice.component.css"]
})
export class DiceComponent implements OnInit {
  @ViewChild("dice1") elDice: ElementRef;

  @Output() closed = new EventEmitter<boolean>();

  @Output() diceRoll = new EventEmitter<Number>();

  user: Character;

  nextRoll: number;

  I = 0;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.user = await this.userService.getCharacterDetails();

    // Turn index is set to next turn i
    var currTurnIndex = this.user.turnIndex;

    this.nextRoll = this.user.diceRolls[currTurnIndex];
  }

  // Roll Function
  async roll() {
    // Initial dice variables
    // var diceOne = Math.floor(Math.random() * 6 + 1);
    // var nums = [3, 1, 2, 3, 4, 5, 6];
    // var diceOne = nums[this.I];
    // this.I = (this.I + 1) % 6;

    var diceOne = this.filterRoll(this.nextRoll);
    this.elDice.nativeElement.classList.toggle("animate");

    //Dice reset and display
    for (var i = 1; i <= 6; i++) {
      this.elDice.nativeElement.classList.remove("show-" + i);
      if (diceOne === i) {
        this.elDice.nativeElement.classList.add("show-" + i);
      }
    }

    this.diceRoll.emit(diceOne);

    if (this.user == undefined) {
      this.user = await this.userService.getCharacterDetails();
    }

    var currTurnIndex = this.user.turnIndex;
    var i = (currTurnIndex + 1) % this.user.diceRolls.length;
    this.userService.updateTurnIndex(i);
    this.nextRoll = this.user.diceRolls[i];
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

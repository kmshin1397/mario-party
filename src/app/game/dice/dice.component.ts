import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "app-dice",
  templateUrl: "./dice.component.html",
  styleUrls: ["./dice.component.css"]
})
export class DiceComponent implements OnInit {
  @ViewChild("dice1") elDice: ElementRef;

  constructor() {}

  ngOnInit() {}

  // Roll Function
  roll() {
    // Initial dice variables
    var diceOne = Math.floor(Math.random() * 6 + 1);
    this.elDice.nativeElement.classList.toggle("animate");

    //Dice reset and display
    for (var i = 1; i <= 6; i++) {
      this.elDice.nativeElement.classList.remove("show-" + i);
      if (diceOne === i) {
        this.elDice.nativeElement.classList.add("show-" + i);
      }
    }
  } // END Come out roll function
}

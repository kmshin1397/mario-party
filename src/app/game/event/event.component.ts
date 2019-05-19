import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventComponent implements OnInit {
  @ViewChild("dice1") elDice: ElementRef;

  @Output() closed = new EventEmitter<boolean>();

  @Output() diceRoll = new EventEmitter<Number>();

  I = 0;

  constructor() {}

  ngOnInit() {}

  // Roll Function
  spin() {
    // Initial dice variables
    // var diceOne = Math.floor(Math.random() * 6 + 1);
    var nums = [3, 1, 2, 3, 4, 5, 6];
    var diceOne = nums[this.I];
    this.I = (this.I + 1) % 6;
    this.elDice.nativeElement.classList.toggle("animate");

    //Dice reset and display
    for (var i = 1; i <= 6; i++) {
      this.elDice.nativeElement.classList.remove("show-" + i);
      if (diceOne === i) {
        this.elDice.nativeElement.classList.add("show-" + i);
      }
    }

    this.diceRoll.emit(diceOne);
  }

  close() {
    this.closed.emit(true);
  }
}

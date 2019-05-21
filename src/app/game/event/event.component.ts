import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input
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

  @Input() eventType: any;

  I = 0;

  constructor() {}

  ngOnInit() {}

  close() {
    this.closed.emit(true);
  }
}

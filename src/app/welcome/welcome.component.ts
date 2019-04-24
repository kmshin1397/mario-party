import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  @ViewChild("logo") logo: ElementRef;

  bounce: any;

  items: Observable<any[]>;
  begun: Boolean;
  constructor(db: AngularFirestore) {
    this.items = db.collection("items").valueChanges();
    this.begun = false;
  }

  ngOnInit() {}

  beginGame() {
    console.log("here");
    this.begun = true;
    this.logo.nativeElement.classList.toggle("disabled");
  }
}

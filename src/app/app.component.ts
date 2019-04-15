import { Component, ElementRef, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("logo") logo: ElementRef;

  items: Observable<any[]>;
  begun: Boolean;
  constructor(db: AngularFirestore) {
    this.items = db.collection("items").valueChanges();
    this.begun = false;
  }
  title = "mario-party";

  beginGame() {
    console.log("here");
    this.begun = true;
    this.logo.nativeElement.classList.toggle("disabled");
  }
}

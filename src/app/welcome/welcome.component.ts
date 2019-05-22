import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  @ViewChild("logo") logo: ElementRef;

  bounce: any;

  begun: Boolean;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.begun = false;
  }

  beginGame() {
    this.begun = true;
    this.logo.nativeElement.classList.toggle("disabled");

    if (this.authService.isLoggedIn) {
      if (this.authService.isAdmin()) {
        this.router.navigateByUrl("/admin");
      } else {
        this.router.navigateByUrl("/profile");
      }
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./../auth.service";

import { Characters } from "../characters";
import { LoginInfo } from "./login-info";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  currentSlide: number = 0;
  email: string;
  password: string;

  characters: any[];

  loggedIn: Boolean;

  promptPassword: boolean;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.promptPassword = false;
    this.characters = Characters;
  }

  login() {
    var characterName = this.characters[this.currentSlide].name;
    var loginInfo = LoginInfo[this.currentSlide];
    var loginName = loginInfo.name;
    console.log(characterName);

    if (characterName == "Bob-omb" && this.password == undefined) {
      this.promptPassword = true;
      return;
    } else if (characterName != "Bob-omb") {
      this.password = loginInfo.password;
    }
    if (characterName == loginName) {
      this.authService.login(loginInfo.email, this.password).then(resolve => {
        this.router.navigateByUrl("/profile");
      });
    } else {
      console.log("Character login failed! Character account not found");
    }
  }

  closeDialogue() {
    this.promptPassword = false;
  }

  logout() {
    this.authService.logout();
  }

  // Swiper set-up
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow:
      "<div class='nav-btn next-slide'><i class=\"fa fa-chevron-right\"></i></div>",
    prevArrow:
      "<div class='nav-btn prev-slide'><i class=\"fa fa-chevron-left\"></i></div>",
    dots: true,
    infinite: false
  };

  slickInit(e) {}

  breakpoint(e) {}

  afterChange(e) {
    this.currentSlide = e.currentSlide;
  }

  beforeChange(e) {}
}

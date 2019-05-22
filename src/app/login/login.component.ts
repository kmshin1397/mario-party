import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

import { Characters } from "../characters";
import { LoginInfo } from "./login-info";
import { MessageService } from "primeng/api";

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

  constructor(
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.promptPassword = false;
    this.characters = Characters;
    this.password = undefined;
  }

  login() {
    var characterName = this.characters[this.currentSlide].name;
    var loginInfo = LoginInfo[this.currentSlide];
    var loginName = loginInfo.name;
    console.log(characterName);

    if (this.password == undefined) {
      this.promptPassword = true;
      return;
    }

    if (characterName == loginName) {
      this.authService
        .login(loginInfo.email, this.password)
        .then(resolve => {
          if (characterName == "Bob-omb") {
            this.router.navigateByUrl("/admin");
          } else {
            this.router.navigateByUrl("/profile");
          }
        })
        .catch(err => {
          this.promptPassword = false;
          this.password = undefined;
          this.addSingle(err);
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

  addSingle(msg) {
    this.messageService.add({
      severity: "error",
      summary: "Login Failed",
      detail: msg
    });
  }

  clear() {
    this.messageService.clear();
  }
}

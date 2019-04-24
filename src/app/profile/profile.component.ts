import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "../auth.service";
import { Characters } from "../characters";
import { UserService } from "../user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnChanges {
  character: any = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.character = null;
    this.userService
      .getCharacterDetails()
      .then(character => (this.character = character));
    console.log(this.character);
  }

  logout() {
    this.authService.logout();
  }
}

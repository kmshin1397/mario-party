import { Component, OnInit } from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  items: MenuItem[];
  showPanel: boolean;
  selectedCharacter: string;
  numCoins: number;
  numStars: number;
  numHints: number;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.showPanel = false;
    this.items = [
      {
        label: "Rules",
        icon: "fas fa-gavel",
        routerLink: "/rules"
      },
      {
        label: "Scoreboard",
        icon: "fas fa-list-ol",
        routerLink: "/scoreboard"
      },
      {
        label: "Logout",
        icon: "fas fa-sign-out-alt"
      }
    ];
  }

  characterClick(characterName: string) {
    console.log(characterName);
    this.selectedCharacter = characterName;
    this.showPanel = true;
  }

  closePanel() {
    this.showPanel = false;
  }

  async submitForm() {
    var promises = [];
    if (this.numCoins > 0) {
      promises.push(
        this.userService.addCoins(
          this.numCoins,
          -1 * Math.random(),
          this.selectedCharacter
        )
      );
    } else if (this.numCoins < 0) {
      promises.push(
        this.userService.subtractCoins(this.numCoins, this.selectedCharacter)
      );
    }

    if (this.numStars > 0) {
      promises.push(
        this.userService.addStars(
          this.numStars,
          -1 * Math.random(),
          this.selectedCharacter
        )
      );
    } else if (this.numStars < 0) {
      promises.push(
        this.userService.subtractStars(this.numStars, this.selectedCharacter)
      );
    }

    if (this.numHints > 0) {
      promises.push(
        this.userService.addHints(this.numHints, this.selectedCharacter)
      );
    } else if (this.numHints < 0) {
      promises.push(
        this.userService.subtractHints(this.numHints, this.selectedCharacter)
      );
    }

    await Promise.all(promises);
    this.addSingle("success", "Success", "Character updated successfully!");
    this.numCoins = undefined;
    this.numHints = undefined;
    this.numStars = undefined;
    this.closePanel();
  }

  addSingle(type, summary, message) {
    this.messageService.add({
      severity: type,
      summary: summary,
      detail: message
    });
  }

  clear() {
    this.messageService.clear();
  }
}

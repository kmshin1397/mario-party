import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ProfileComponent } from "./profile/profile.component";
import { GameComponent } from "./game/game/game.component";
import { RulesComponent } from "./rules/rules.component";
import { QrComponent } from "./qr/qr.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "game", component: GameComponent },
  { path: "profile", component: ProfileComponent },
  { path: "rules", component: RulesComponent },
  { path: "qr", component: QrComponent },
  { path: "scoreboard", component: ScoreboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

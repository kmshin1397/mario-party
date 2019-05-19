import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ProfileComponent } from "./profile/profile.component";
import { GameComponent } from "./game/game/game.component";
import { RulesComponent } from "./rules/rules.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "game", component: GameComponent },
  { path: "profile", component: ProfileComponent },
  { path: "rules", component: RulesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

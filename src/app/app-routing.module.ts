import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ProfileComponent } from "./profile/profile.component";
import { GameComponent } from "./game/game/game.component";
import { RulesComponent } from "./rules/rules.component";
import { QrComponent } from "./qr/qr.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { ShopComponent } from "./shop/shop.component";

import { AuthGuard } from "./guards/auth-guard.service";
import { AdminGuard } from "./guards/admin-guard.service";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "game", component: GameComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "rules", component: RulesComponent, canActivate: [AuthGuard] },
  { path: "qr", component: QrComponent, canActivate: [AuthGuard] },
  {
    path: "scoreboard",
    component: ScoreboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "shop", component: ShopComponent, canActivate: [AuthGuard] },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

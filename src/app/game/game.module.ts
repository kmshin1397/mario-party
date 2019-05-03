import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board/board.component";
import { GameComponent } from "./game/game.component";
import { CytoscapeModule } from "ngx-cytoscape";
import { SharedModule } from "../shared/shared.module";
import { ButtonModule } from "primeng/button";
import { DiceComponent } from "./dice/dice.component";
import { CardModule } from "primeng/card";
@NgModule({
  declarations: [BoardComponent, GameComponent, DiceComponent],
  imports: [
    CommonModule,
    CytoscapeModule,
    SharedModule,
    ButtonModule,
    CardModule
  ],
  exports: [GameComponent]
})
export class GameModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board/board.component";
import { GameComponent } from "./game/game.component";
import { CytoscapeModule } from "ngx-cytoscape";
import { SharedModule } from "../shared/shared.module";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [BoardComponent, GameComponent],
  imports: [CommonModule, CytoscapeModule, SharedModule, ButtonModule],
  exports: [GameComponent]
})
export class GameModule {}

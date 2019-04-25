import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board/board.component";
import { GameComponent } from "./game/game.component";
import { CytoscapeModule } from "ngx-cytoscape";

@NgModule({
  declarations: [BoardComponent, GameComponent],
  imports: [CommonModule, CytoscapeModule],
  exports: [GameComponent]
})
export class GameModule {}

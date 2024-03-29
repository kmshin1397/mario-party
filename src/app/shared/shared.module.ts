import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./icon/icon.component";
import { MenuComponent } from "./menu/menu.component";

import { MenubarModule } from "primeng/menubar";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { RngDiceComponent } from "./rng-dice/rng-dice.component";

import { ClickOutsideModule } from "ng-click-outside";

@NgModule({
  declarations: [IconComponent, MenuComponent, RngDiceComponent],
  imports: [
    CommonModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    ClickOutsideModule
  ],
  exports: [IconComponent, MenuComponent, RngDiceComponent]
})
export class SharedModule {}

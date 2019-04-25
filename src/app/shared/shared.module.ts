import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./icon/icon.component";
import { MenuComponent } from "./menu/menu.component";

import { MenubarModule } from "primeng/menubar";

@NgModule({
  declarations: [IconComponent, MenuComponent],
  imports: [CommonModule, MenubarModule],
  exports: [IconComponent, MenuComponent]
})
export class SharedModule {}

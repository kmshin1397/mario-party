import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";

// PrimeNG
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { TabViewModule } from "primeng/tabview";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ToastModule } from "primeng/toast";

import { SlickCarouselModule } from "ngx-slick-carousel";

import { AngularFontAwesomeModule } from "angular-font-awesome";

import { ZXingScannerModule } from "@zxing/ngx-scanner";

import { environment } from "../environments/environment";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ProfileComponent } from "./profile/profile.component";
import { SharedModule } from "../app/shared/shared.module";
import { GameModule } from "../app/game/game.module";
import { RulesComponent } from "./rules/rules.component";
import { QrComponent } from "./qr/qr.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { ShopComponent } from "./shop/shop.component";
import { MessageService } from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ProfileComponent,
    RulesComponent,
    QrComponent,
    ScoreboardComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    SharedModule,
    GameModule,
    FormsModule,
    CardModule,
    ButtonModule,
    SlickCarouselModule,
    TabViewModule,
    TableModule,
    DialogModule,
    ZXingScannerModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}

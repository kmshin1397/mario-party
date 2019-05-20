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
import { AccordionModule } from "primeng/accordion";

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ProfileComponent,
    RulesComponent,
    QrComponent,
    ScoreboardComponent
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
    AccordionModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

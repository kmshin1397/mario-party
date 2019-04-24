import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Character } from "./character";

@Injectable({
  providedIn: "root"
})
export class UserService {
  userName: string;
  character: Character;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}

  async getCharacterDetails() {
    if (this.authService.isLoggedIn) {
      this.userName = this.authService.getUser().displayName;
      var queryCollection = this.afs.collection("characters", ref =>
        ref.where("name", "==", this.userName)
      );

      await queryCollection
        .get()
        .toPromise()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }

          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            var data = doc.data();
            data.id = doc.id;
            this.character = new Character(data);
            console.log(this.character);
          });
        });

      return this.character;
    }
  }
}

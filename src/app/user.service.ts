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

  docIdMap: Map<string, number>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.docIdMap = new Map<string, number>();
    this.docIdMap.set("Kamek", 1);
    this.docIdMap.set("Whomp", 2);
    this.docIdMap.set("Piranha Plant", 3);
    this.docIdMap.set("Shy Guy", 4);
    this.docIdMap.set("Bob-omb", 5);
  }

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

  updateLocIndex(newIndex: number) {
    if (this.authService.isLoggedIn) {
      this.afs
        .collection("characters")
        .doc(this.docIdMap.get(this.userName).toString())
        .update({
          currentLocIndex: newIndex
        });
    }
  }
}

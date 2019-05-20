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
  shopMap: Map<string, string>;

  admin: any;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.docIdMap = new Map<string, number>();
    this.docIdMap.set("Kamek", 1);
    this.docIdMap.set("Dry Bones", 2);
    this.docIdMap.set("Piranha Plant", 3);
    this.docIdMap.set("Shy Guy", 4);
    this.docIdMap.set("Bob-omb", 5);

    this.shopMap = new Map<string, string>();
    this.shopMap.set("Puzzle Hint", "hint");
    this.shopMap.set("Random Bonus Dice", "random");
    this.shopMap.set("Star", "star");
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
            this.character = new Character(doc.data());
            console.log(doc.data().coinsAcquired);
            console.log(new Character(doc.data()));
          });
        });
    }

    return this.character;
  }

  updateLocIndex(newIndex: number) {
    if (this.authService.isLoggedIn) {
      if (this.userName == undefined) {
        this.userName = this.authService.getUser().displayName;
      }
      this.afs
        .collection("characters")
        .doc(this.docIdMap.get(this.userName).toString())
        .update({
          currentLocIndex: newIndex
        });
    }
  }

  updateCanMove(newBool: boolean) {
    console.log("Updating can move");
    if (this.authService.isLoggedIn) {
      if (this.userName == undefined) {
        this.userName = this.authService.getUser().displayName;
      }
      this.afs
        .collection("characters")
        .doc(this.docIdMap.get(this.userName).toString())
        .update({
          canMove: newBool
        });
    }
  }

  updateTurnIndex(newTurnIndex: number) {
    console.log("Updating can move");
    if (this.authService.isLoggedIn) {
      if (this.userName == undefined) {
        this.userName = this.authService.getUser().displayName;
      }
      this.afs
        .collection("characters")
        .doc(this.docIdMap.get(this.userName).toString())
        .update({
          turnIndex: newTurnIndex
        });
    }
  }

  async addCoins(numCoins: number, coinId: number) {
    console.log("Adding coins");
    if (this.authService.isLoggedIn) {
      if (this.userName == undefined) {
        this.userName = this.authService.getUser().displayName;
      }

      this.getCharacterDetails().then(character => {
        var coins = this.character.numCoins + numCoins;
        var oldAcquired = this.character.coinsAcquired;

        if (!this.character.coinsAcquired.includes(coinId)) {
          oldAcquired.push(coinId);
          var doc = this.afs
            .collection("characters")
            .doc(this.docIdMap.get(this.userName).toString());
          doc.set(
            {
              numCoins: coins
            },
            { merge: true }
          );
          doc.set({ coinsAcquired: oldAcquired }, { merge: true });
        } else {
          alert("You can't scan the same coin more than once!");
        }
      });
    }
  }

  async subtractCoins(numCoins: number) {
    console.log("Subtracting coins");
    if (this.authService.isLoggedIn) {
      if (this.userName == undefined) {
        this.userName = this.authService.getUser().displayName;
      }
      await this.getCharacterDetails();
      var oldCoins = this.character.numCoins;
      var oldSpent = this.character.coinsSpent;

      this.afs
        .collection("characters")
        .doc(this.docIdMap.get(this.userName).toString())
        .update({
          numCoins: oldCoins - numCoins,
          coinsSpent: oldSpent + numCoins
        });
    }
  }

  async buyItem(itemName: string) {
    console.log("Buying " + itemName);
    if (this.authService.isLoggedIn) {
      if (this.userName == undefined) {
        this.userName = this.authService.getUser().displayName;
      }

      var doc = this.afs
        .collection("characters")
        .doc(this.docIdMap.get(this.userName).toString())
        .collection("shop")
        .doc(this.shopMap.get(itemName));

      var curDoc = await doc.get().toPromise();

      doc.update({
        cap: curDoc.data().cap - 1
      });

      if (itemName == "Puzzle Hint") {
        doc.update({
          priceScale: curDoc.data().priceScale + 1
        });
      } else if (itemName == "Star") {
        this.addStar(-1 * curDoc.data().cap);
      }
    }
  }

  resetPriceScale(itemName: string) {
    console.log("Resetting hint price");
    if (itemName == "Puzzle Hint") {
      if (this.authService.isLoggedIn) {
        if (this.userName == undefined) {
          this.userName = this.authService.getUser().displayName;
        }

        this.afs
          .collection("characters")
          .doc(this.docIdMap.get(this.userName).toString())
          .collection("shop")
          .doc(this.shopMap.get(itemName))
          .update({
            priceScale: 0
          });
      }
    }
  }

  async addStar(starId: number) {
    console.log("Adding a star");
    if (this.authService.isLoggedIn) {
      if (this.userName == undefined) {
        this.userName = this.authService.getUser().displayName;
      }

      this.getCharacterDetails().then(character => {
        var stars = this.character.numStars + 1;
        var oldAcquired = this.character.starsAcquired;

        if (!this.character.starsAcquired.includes(starId)) {
          oldAcquired.push(starId);
          var doc = this.afs
            .collection("characters")
            .doc(this.docIdMap.get(this.userName).toString());
          doc.set(
            {
              numStars: stars
            },
            { merge: true }
          );
          doc.set({ starsAcquired: oldAcquired }, { merge: true });
        } else {
          alert("You can't scan the same star more than once!");
        }
      });
    }
  }

  async getScoreboardData() {
    if (this.authService.isLoggedIn) {
      this.userName = this.authService.getUser().displayName;
      var queryCollection = this.afs.collection("characters", ref =>
        ref
          .orderBy("numStars", "desc")
          .orderBy("numCoins", "desc")
          .orderBy("name", "asc")
      );

      var returnList = [];
      await queryCollection
        .get()
        .toPromise()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach(doc => {
            var data = doc.data();
            if (data.name != "Bob-omb") {
              returnList.push({
                name: data.name,
                numStars: data.numStars,
                numCoins: data.numCoins,
                defaultPicture: data.defaultPicture
              });
            }
          });
        });

      return returnList;
    }
  }

  async getShopData() {
    if (this.authService.isLoggedIn) {
      this.userName = this.authService.getUser().displayName;
      var queryCollection = this.afs
        .collection("characters")
        .doc(this.docIdMap.get(this.userName).toString())
        .collection("shop");

      console.log(
        this.afs
          .collection("characters")
          .doc(this.docIdMap.get(this.userName).toString())
          .collection("shop")
      );

      var returnList = [];
      await queryCollection
        .get()
        .toPromise()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach(doc => {
            var data = doc.data();
            returnList.push({
              name: data.name,
              price: data.price + data.priceScale,
              cap: data.cap,
              description: data.description,
              iconSrc: data.iconSrc
            });
          });
        });

      return returnList;
    }
  }
}

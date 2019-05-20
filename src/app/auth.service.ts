import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      // this.router.navigate(["admin/list"]);
      console.log("Logged in!", JSON.parse(localStorage.getItem("user")));
    } catch (e) {
      // Handle Errors here.
      var errorCode = e.code;
      var errorMessage = e.message;

      console.log(errorCode, errorMessage);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    this.router.navigate([""]);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  updateUser() {
    this.afAuth.auth.currentUser
      .updateProfile({
        displayName: "Dry Bones",
        photoURL: "./../../assets/dry_bones.png"
      })
      .then(function() {
        // Update successful.
        console.log("update success");
      })
      .catch(function(error) {
        // An error happened.
      });
  }
}

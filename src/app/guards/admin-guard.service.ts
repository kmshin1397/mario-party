import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this._authService.getUser();

    if (user.displayName === "Bob-omb") {
      return true;
    }

    alert("You must be an admin to access this page!");

    // navigate to not found page
    this._router.navigate([""]);
    return false;
  }
}

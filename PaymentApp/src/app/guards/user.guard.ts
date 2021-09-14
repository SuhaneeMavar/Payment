import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  isUser: Subject<boolean> = new BehaviorSubject(null)

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLogined())
      return this.authService.authenticateUser().pipe(take(1), map((data) => {
        if (data.role == 2)
          return true
        else {
          this.router.navigate(['error'])
          return false
        }
      }))
    else {
      this.router.navigate(['error'])
      return false
    }
  }

}

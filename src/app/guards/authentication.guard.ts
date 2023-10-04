import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthentificationService} from "../services/authentification.service";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService :AuthentificationService, private router : Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let authenticated =this.authService.isAuthenticated();
    if(!authenticated) {
      this.router.navigateByUrl("/login");
      return false
    }else {
      return true ;


    }

  }

}

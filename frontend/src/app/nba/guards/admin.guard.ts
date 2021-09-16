import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from '../../auth/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  get userData():Usuario{
    return this.aS.user;
  }

  constructor(private aS: AuthService,
              private router: Router){}


  canActivate(): boolean | Observable<boolean>{
      if(this.userData.role === 'admin'){
        return true
      }
      this.router.navigateByUrl('/nba');
      return false      
  }  

}

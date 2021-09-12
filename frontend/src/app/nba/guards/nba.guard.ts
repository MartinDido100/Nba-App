import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NbaGuard implements CanActivate, CanLoad {

  constructor(private aS: AuthService, private router : Router){}

  canActivate(): Observable<boolean> | boolean{
    return this.aS.verificarToken().pipe(
      tap( (valid: boolean) => {
        if(!valid){
          this.router.navigateByUrl('/');
        }
      })
    )
  }
  canLoad(): Observable<boolean> | boolean{
    return this.aS.verificarToken().pipe(
      tap( (valid: boolean) => {
        if(!valid){
          this.router.navigateByUrl('/');
        }
      })
    )
  }
}

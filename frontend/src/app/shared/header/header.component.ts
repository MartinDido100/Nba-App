import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from 'src/app/auth/interfaces/auth.interfaces';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  get dataUser(): Usuario{
    return this.aS.user
  }

  constructor(private router: Router,
              private cS: CookieService,
              private aS: AuthService){}

  @Input() logged : boolean = false;

  logout(){
    this.cS.delete('token');
    this.cS.deleteAll('/');
    this.router.navigateByUrl('/');
  }

}

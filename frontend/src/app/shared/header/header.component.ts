import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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

  @ViewChild('navUl') navUl!: ElementRef;
  @ViewChild('unloggedNavUl') unloggedNavUl!: ElementRef;
  @Output() onHeaderClick: EventEmitter<string> = new EventEmitter();


  get dataUser(): Usuario{
    return this.aS.user
  }

  constructor(private router: Router,
              private cS: CookieService,
              private aS: AuthService,
              private renderer: Renderer2){}

  @Input() logged : boolean = false;

  logout(){
    this.cS.delete('token');
    this.cS.deleteAll('/');
    this.router.navigateByUrl('/');
  }

  emitForm( form: string ){
    this.onHeaderClick.emit(form);
  }

  openMenu(){
    setTimeout(() => {
      this.renderer.setStyle(this.navUl.nativeElement,'transition','transform .2s ease-in');
    }, 200);
    this.renderer.addClass(this.navUl.nativeElement,'active');

  }

  closeMenu(){
    this.renderer.removeClass(this.navUl.nativeElement,'active');
  }

}


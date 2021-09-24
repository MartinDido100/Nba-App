import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  clicked: string = ''
  constructor(private cS: CookieService) { }

  ngAfterViewInit(): void {
    this.cS.delete('token');
    this.cS.deleteAll('/');
  }

  ngOnInit(): void {
    this.cS.delete('token');
    this.cS.deleteAll('/');
  }

  clickedHeader( event: string ){
    this.clicked = event
  }

}

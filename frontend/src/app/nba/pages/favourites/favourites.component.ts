import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Player } from '../../interfaces/nba.interfaces';
import { Usuario } from '../../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  get dataUser(): Usuario {
    return this.aS.user;
  }

  get favoritos():Player[]{
    return this.aS.favs;
  }

  constructor(private aS: AuthService) { }


  ngOnInit(): void {
  }

}

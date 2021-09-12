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

  favoritos: Player[] = [];


  get dataUser(): Usuario {
    return this.aS.user;
  }

  log(){
    
  }

  getFavs(){
    this.aS.getPlayersFavs().subscribe(
      resp => {
        this.favoritos = resp || [];
      }
    )
  }

  constructor(private aS: AuthService) { }

  ngOnInit(): void {
    this.getFavs();
  }

}

import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/nba.interfaces';
import { NbaService } from '../../services/nba.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  players :Player[] = [];

  get dataUser(): Usuario{
    return this.aS.user
  }

  constructor(private nS: NbaService,
              private aS: AuthService) { }

  getPlayers(){
    this.nS.getAllPlayers().subscribe(
      (resp) => {
        if(resp){
          this.players = resp
        }
      }
    )
  }
  
  ngOnInit(): void {
    this.getPlayers();
  }
  

}

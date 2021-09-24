import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Player } from '../../interfaces/nba.interfaces';
import { NbaService } from '../../services/nba.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  @Input() usuario!: Usuario;

  @Input() player!: Player;
  
  @Input() favoritos: Player[] = [];

  get favsId(){
    return this.aS.favsId;
  }

  constructor(private aS: AuthService,
              private nS: NbaService,
              private router: Router) { }

  checkFav(): boolean{
    return this.favsId.includes(this.player._id);
  } 

  deletePlayer(){
    this.nS.deletePlayer(this.player._id,this.usuario.userId).subscribe()
  }

  addFav(){
    this.aS.addFav(this.player._id).subscribe()
  }

  param(){
    return this.player.name.split(' ').join('-');
  }

  removeFav(){
    this.aS.removeFav(this.player._id).subscribe()
  }

  ngOnInit(): void {
  }

}

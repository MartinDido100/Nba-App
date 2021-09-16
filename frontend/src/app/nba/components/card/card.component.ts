import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
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
              private nS: NbaService) { }



  checkFav(): boolean{
    return this.favsId.includes(this.player._id);
  } 

  deletePlayer(){
    this.nS.deletePlayer(this.player._id,this.usuario.userId).subscribe()
  }

  editPlayer(){
    //TODO:EDITAR JUGADOR BACKEND y HACER FUNCION EN FRONT
  }

  addFav(){
    this.aS.addFav(this.player._id).subscribe()
  }

  removeFav(){
    this.aS.removeFav(this.player._id).subscribe()
  }

  ngOnInit(): void {
  }

}

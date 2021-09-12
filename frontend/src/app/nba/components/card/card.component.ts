import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Player } from '../../interfaces/nba.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{

  favoritos: string[] = [];

  @Input() usuario!: Usuario;

  @Input() player!: Player;
  
  constructor(private aS: AuthService) { }

  checkFav(): boolean{
    return !this.favoritos.includes(this.player._id)
  } 

  deletePlayer(){
    //TODO:BORRAR JUGADOR BACKEND y HACER FUNCION EN FRONT
  }

  editPlayer(){
    //TODO:EDITAR JUGADOR BACKEND y HACER FUNCION EN FRONT
  }


  getFavsId(){
    this.aS.getFavsById().subscribe(resp => this.favoritos = resp || [])
  }

  addFav(){
    this.aS.addFav(this.player._id).subscribe(resp =>{
      if (resp.ok) {
        this.favoritos.push(this.player._id)
      }
    },error =>console.log)
  }

  removeFav(){
    this.aS.removeFav(this.player._id).subscribe(resp =>{
      if (resp.ok) {
        const i = this.favoritos.indexOf(this.player._id);
        this.favoritos.splice(i,1);
      }
    })
  }

  ngOnInit(): void {
    this.getFavsId();
  }

}

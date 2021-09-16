import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Player, PlayerResponse } from '../interfaces/nba.interfaces';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  private players: Player[] = [];
  private baseUrl: string = environment.baseUrl;

  get playersArray(){
    return [...this.players]
  }

  constructor(private http: HttpClient) { }

  addPlayer(name:string , team:string , age:string , titles:string , img:string){
    const url: string = `${this.baseUrl}/nba/add`;
    const body = {
      name,
      team,
      age,
      titles,
      img
    }
    return this.http.post<PlayerResponse>(url,body).pipe(
      tap(resp => this.players = resp.players || []),
      catchError((err: HttpErrorResponse) => of(err.error))
    )
  }

  getAllPlayers(){
    const url: string = `${this.baseUrl}/nba/players`
    return this.http.get<PlayerResponse>(url).pipe(
      tap( resp => this.players = resp.players || [] )
    )
  }

  deletePlayer(playerId: string, userId: string){
    const url: string = `${this.baseUrl}/nba/delete`;
    const body = {
      playerId,
      userId
    }
    return this.http.delete<PlayerResponse>(url,{body}).pipe(
      tap(resp => this.players = resp.players!)
    )
  }
  
}

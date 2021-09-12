import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, PlayerResponse } from '../interfaces/nba.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPlayers(){
    const url: string = `${this.baseUrl}/nba/players`
    return this.http.get<PlayerResponse>(url).pipe(
      map( resp => resp.players )
    )
  }

}

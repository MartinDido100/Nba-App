import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Player } from 'src/app/nba/interfaces/nba.interfaces';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario!: Usuario;
  private baseUrl: string = environment.baseUrl;
  private favoritos: Player[] = [];

  get favs(){
    return [...this.favoritos]
  }

  get favsId(){
    const favsId: string[] = this.favoritos.map( fav => {
      return fav._id
    })
    return favsId
  }

  get user(): Usuario {
    return {...this.usuario};
  }

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private socialAuthService: SocialAuthService) { }

  registerUser(username: string, email: string, password: string):Observable<any>{
    const body = {
      username,
      email,
      password
    }
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<AuthResponse>(url,body).pipe(
      tap(resp => {                      
        if(resp.ok){
          this.cookieService.set('token', resp.token!);
        }
      }),
      map( resp =>  resp.ok )
    )

  }
  
  googleLOgout(){
    this.socialAuthService.signOut();
  }

   async googleLogin(): Promise<Observable<boolean>>{
    const url = `${this.baseUrl}/auth/google`;
    const signIn: SocialUser = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    const { email,name,id } = signIn
    const body = {
      username: name,
      email,
      password: id
    }
    return this.http.post<AuthResponse>(url,body).pipe(
      tap( resp => this.cookieService.set('token',resp.token!)),
      map(resp => resp.ok)
    )
  }

  loginUser(username: string, password: string){

      const url: string = `${this.baseUrl}/auth/login`;
      const body = {
        username,
        password
      }

      return this.http.post<AuthResponse>(url,body).pipe(
        tap(resp => {
          if(resp.ok){
            this.cookieService.set('token',resp.token!);
          }
        }),
        map(resp => resp.ok)
      )
  }

  cargarUsuario(resp: AuthResponse){
    this.usuario = {
      username: resp.username!,
      email: resp.email!,
      role: resp.role!,
      userId: resp.id!
    }
  }

  verificarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/verify`;

    return this.http.get<AuthResponse>(url).pipe(
      map( resp => {
        this.cargarUsuario(resp);
        return resp.ok;
      } ),
      catchError(() => of(false))
    )
  }


  getPlayersFavs(){
    const url = `${this.baseUrl}/fav/get`;
    const headers = new HttpHeaders().set('userId',this.usuario.userId);
    return this.http.get<AuthResponse>(url,{headers}).pipe(
      tap( resp => {
        this.favoritos = resp.favs || []
      })
    )
  }

  addFav(playerId: string){
    const url: string = `${this.baseUrl}/fav/add`;
    const body = {
      playerId,
      userId: this.usuario.userId
    }
    return this.http.put<AuthResponse>(url,body).pipe(
      tap(resp => {
        this.favoritos = resp.favs || []
      })
    )
  }

  removeFav(playerId:string){
    const url: string = `${this.baseUrl}/fav/delete`;
    const body = {
      playerId,
      userId: this.usuario.userId
    }
    return this.http.put<AuthResponse>(url,body).pipe(
      tap(resp => {
        this.favoritos = resp.favs || []
      })
    )
  }

  changeRole(email: string, username: string, role: string){
    const url = `${this.baseUrl}/roles/change`;
    const body = {email,username,role};
    return this.http.put<AuthResponse>(url,body).pipe(
      catchError((err: HttpErrorResponse) => of(err.error))
    )
  }
}

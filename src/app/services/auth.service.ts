import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

import { switchMap, tap } from 'rxjs/operators';

import { TokenService } from './token.service';

import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  loginAndGet(email: string, password: string) {
    return this.login( email, password)
                .pipe(
                  switchMap( () => this.getProfile())
                );
  }
  login( email: string, password: string ) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password } )
              .pipe(
                tap( response => this.tokenService.saveToken(response.access_token))
              );
  }

  getProfile() {
    // OJO
    // Autorization <type> <credentials>
    // en nuestro caso el tipo es Bearer,
    // luego TIENE que ir un espacio

    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}` );

    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   'Authorization': `Bearer ${token}`,
      //   // 'Conten-type': 'application/json'
      // }
    })
    .pipe(
      tap( user => this.user.next(user) )
    );
  }

  logout() {
    this.tokenService.removeToken();
  }
}

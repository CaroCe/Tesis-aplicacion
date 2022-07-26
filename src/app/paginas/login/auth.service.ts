import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Login } from '../login/login.interface';
import { AuthUtils } from './auth.utils';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment'

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private _authenticated: boolean = false;
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {
  }
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  
  signIn(credentials: any): Observable<any> {

    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.get(environment.apiUrl+'login/'+credentials.email + '/' + credentials.password).pipe(
      switchMap((response: any) => {

        localStorage.setItem('userId', response.usuarioId);
        localStorage.setItem('userName', response.usuarioNombre);
        localStorage.setItem('userEmail', response.usuarioCorreo);
        localStorage.setItem('userPass', credentials.password);
        this._authenticated = true;

        return of(response);
      })
    );
  }


  /**
   * Sign out
   */
  signOut(): Observable<any> {
    localStorage.removeItem('accessToken');

    this._authenticated = false;

    return of(true);
  }
  signInUsingToken(): Observable<any>
  {

      return this._httpClient.post(environment.apiUrl+'oauth/token', {
          accessToken: this.accessToken
      }).pipe(
          catchError(() =>

              of(false)
          ),
          switchMap((response: any) => {

              this.accessToken = response.accessToken;

              this._authenticated = true;

              this._userService.user = response.user;

              return of(true);
          })
      );
  }

  check(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (this.accessToken === '') {
      return of(false);
    }

    return of(true);
    //return this.signInUsingToken();
  }
 /* getToken() :string{
    if (!this.accessToken) {
      return '';
    }
    const tokenDeserializado = JSON.parse(this.accessToken)
    return tokenDeserializado.access_token;
  }*/
}
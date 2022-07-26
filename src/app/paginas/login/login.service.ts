import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Login } from './login.interface';
import { environment } from 'src/environments/environment';
const headersOauth = {
  headers: new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  getLogin(user: Login) {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', user.email)
      .set('password', user.password);
    return this.http.post<any>(environment.apiUrl + 'oauth/token', body, headersOauth);
  }
}

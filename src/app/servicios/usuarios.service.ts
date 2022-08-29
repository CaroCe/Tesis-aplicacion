import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../paginas/users/user';

const headerOauth = {
  headers: new  HttpHeaders()
    .append('Content-Type','application/json'),
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlService: string = environment.apiUrl+'api/Usuarios';

  constructor(private http: HttpClient) { }

  getUsuarios():Observable<any>{

    return this.http.get<any>(this.urlService,headerOauth)
  }

  postCrearUsuario(datos: Usuario):Observable<any>{

    return this.http.post<any>(this.urlService,datos,headerOauth)
  }
}
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HorarioDia } from '../paginas/horario-especialista/horario-especialista';

const headerOauth = {
  headers: new  HttpHeaders()
    .append('Content-Type','application/json'),
}

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private urlServiceHorarioDia: string = environment.apiUrl+'api/HorariosDias';
  private urlServiceHorarioEspecialista: string = environment.apiUrl+'api/HorariosEspecialistas';
  private urlServiceHorariTrabajos: string = environment.apiUrl+'api/HorariosTrabajos';

  constructor(private http: HttpClient) { }

  getHorariosDias():Observable<HorarioDia[]>{
    return this.http.get<HorarioDia[]>(this.urlServiceHorarioDia,headerOauth);
  }

  getHorarioDiaId(id: number):Observable<HorarioDia>{
    return this.http.get<HorarioDia>(this.urlServiceHorarioDia+"/"+id,headerOauth);
  }
  postCrearHorarioDia(datos: HorarioDia):Observable<any>{
    return this.http.post<any>(this.urlServiceHorarioDia,datos,headerOauth)
  }
  putHorarioDia(datos: HorarioDia,id: number):Observable<any>{
    return this.http.put(this.urlServiceHorarioDia+'/'+id,datos,headerOauth); 
  };
}

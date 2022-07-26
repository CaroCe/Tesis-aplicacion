import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGeneral } from '../dialog-general/dialog-general';
import { Ejercicio } from './ejercicio';

@Component({
  selector: 'app-admin-ejercicios',
  templateUrl: './admin-ejercicios.component.html',
  styleUrls: ['./admin-ejercicios.component.css']
})
export class AdminEjerciciosComponent implements OnInit {
  listaEjercicios:Ejercicio[] = [
    {
      id:1,
      nombre:'Puente',
      descripcion:'Principalmente, este ejercicio trabaja el bíceps femoral y los glúteos',
      urlArchivo:'',
      estado:true
    },
    {
      id:2,
      nombre:'Gemelos',
      descripcion:'Sitúate de puntillas y permanece estático durante 20 segundos. Descansa durante un minuto y repite el ejercicio 3 veces',
      urlArchivo:'',
      estado:false
    }
  ];
  displayedColumns:string[]=['nombre','descripcion','estado']
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  guardarEjercicio(){
    const dialogRef = this.dialog.open(DialogGeneral, {
      width: '400px',
      data: {
        mensaje:'Ejercicio creado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
  guardarEditarEjercicio(){
    const dialogRef = this.dialog.open(DialogGeneral, {
      width: '400px',
      data: {
        mensaje:'Ejercicio editado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
  editarEjercicio(item:any){

  }
}

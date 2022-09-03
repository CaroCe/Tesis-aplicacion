import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HorarioEspecialista, HorarioDia } from './horario-especialista';
import { HorarioService } from '../../servicios/horario.service';

@Component({
  selector: 'app-horario-especialista',
  templateUrl: './horario-especialista.component.html',
  styleUrls: ['./horario-especialista.component.css']
})
export class HorarioEspecialistaComponent implements OnInit {
  horarioDias: HorarioDia[]=[];
  horarioLunes:HorarioDia[]=[
   /* {
      id:1,
      diaId:1,
      valor:'8:00am-3:00pm'
    }*/
  ];
  horarioMartes:HorarioDia[]=[
   /* {
      id:1,
      diaId:1,
      valor:'7:30am-11:00am'
    },
    {
      id:1,
      diaId:1,
      valor:'12:00pm-2:30pm'
    },
    {
      id:1,
      diaId:1,
      valor:'2:30am-5:00pm'
    },*/
  ];

  constructor(public dialog: MatDialog, private _htppHorarioService:HorarioService) { }

  cargarDatos(){
    this._htppHorarioService.getHorariosDias().subscribe(resp=>{
      this.horarioDias=resp
    })
  }
  agregarHorario(diaId:number){
    const dialogRef = this.dialog.open(DialogHorario, {
      width: '400px',
      data: {id:diaId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
  agregarUsuario(){
    const dialogRef = this.dialog.open(DialogHorario, {
      width: '400px',
      data: {
        mensaje:'Usuario creado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-horario',
  templateUrl:'./dialog-horario.html',
  styleUrls:['./dialog-horario.css']
})
export class DialogHorario{
  id:any;
  tipo:any;
  hora:any;
  horarioForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogHorario>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, public dialog: MatDialog,private _htppHorarioService:HorarioService){
      this.horarioForm = fb.group({
        horarioDesde:   new FormControl('00:00'),
        horarioHasta:  new FormControl('00:00'),
      })
  }

  guardarNuevo(){

  }

  guardarEdicion(){}
}

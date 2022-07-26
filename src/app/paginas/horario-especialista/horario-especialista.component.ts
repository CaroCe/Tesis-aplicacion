import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HorarioEspecialista } from './horario-especialista';

@Component({
  selector: 'app-horario-especialista',
  templateUrl: './horario-especialista.component.html',
  styleUrls: ['./horario-especialista.component.css']
})
export class HorarioEspecialistaComponent implements OnInit {
  horarioLunes:HorarioEspecialista[]=[
    {
      id:1,
      diaId:1,
      valor:'8:00am-3:00pm'
    }
  ];
  horarioMartes:HorarioEspecialista[]=[
    {
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
    },
  ];
  horarioMiercoles:HorarioEspecialista[]=[
    {
      id:1,
      diaId:1,
      valor:'7:00am-12:30pm'
    },
    {
      id:1,
      diaId:1,
      valor:'1:30pm-4:30pm'
    },
  ];
  horarioJueves:HorarioEspecialista[]=[
    {
      id:1,
      diaId:1,
      valor:'7:00am-12:30pm'
    },
    {
      id:1,
      diaId:1,
      valor:'1:30pm-4:30pm'
    },
  ];
  horarioViernes:HorarioEspecialista[]=[
    {
      id:1,
      diaId:1,
      valor:'7:00am-12:30pm'
    },
    {
      id:1,
      diaId:1,
      valor:'1:30pm-4:30pm'
    },
  ];
  horarioSabado:HorarioEspecialista[]=[
    {
      id:1,
      diaId:1,
      valor:'9:00am-12:30pm'
    }
  ];
  horarioDomingo:HorarioEspecialista[]=[
    {
      id:1,
      diaId:1,
      valor:'9:00am-12:30pm'
    }
  ];
  constructor(public dialog: MatDialog) { }

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
  constructor(public dialogRef: MatDialogRef<DialogHorario>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, public dialog: MatDialog){

    }
}

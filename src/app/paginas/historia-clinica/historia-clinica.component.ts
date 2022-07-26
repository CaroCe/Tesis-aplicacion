
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaClinicaConsulta } from './historia-clinica';


@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  displayedColumns: string[] = ['fechaRegistro', 'paciente', 'cedula', 'id'];
  dataSource: HistoriaClinicaConsulta[] = [
    {
      id: 1,
      fechaRegistro: "2022-01-05",
      paciente: "Nancy Simbaña",
      cedula: "1721835087"
    }, {
      id: 2,
      fechaRegistro: "2022-02-10",
      paciente: "Roberto Lizano",
      cedula: "1724171548"
    }, {
      id: 3,
      fechaRegistro: "2022-02-25",
      paciente: "Tania Villacres",
      cedula: "1706015349"
    },
  ];
  constructor(private dialog:MatDialog) { }

  verHistoria(id: number) {
    const dialogRef = this.dialog.open(DialogHistoriaClinica, {
      width: '700px',
      height: '650px',
      data: {
        mensaje:'Ejercicio editado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
  descargarHistoria(id: number) {

  }
  nuevaHistoria(){
    const dialogRef = this.dialog.open(DialogHistoriaClinica, {
      width: '700px',
      height: '650px',
      data: {
        mensaje:'Ejercicio editado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
}


@Component({
  selector: 'dialog-historia-clinica',
  templateUrl: 'dialog-historia-clinica.html',
  styleUrls: ['dialog-historia-clinica.css']
})
export class DialogHistoriaClinica {
  mensaje:string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogHistoriaClinica>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
      this.mensaje = data.mensaje;
  }
  onSubmit(data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

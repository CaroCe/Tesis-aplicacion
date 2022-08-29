import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSede } from './dialog-sede/dialog-sede';
import { Sede } from './sede';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SedesService } from '../../servicios/sedes.service';

@Component({
  selector: 'app-admin-sedes',
  templateUrl: './admin-sedes.component.html',
  styleUrls: ['./admin-sedes.component.css']
})
export class AdminSedesComponent implements OnInit {
  listaSedes:Sede[] =[/*{
    id:1,
    nombre:'Sede norte',
    ubicacion:'César Baquero Oe16-104 Lote 20 entre Escalinata 1 y calle Pedernales. Referencias: Diagonal a la Lubricadora Mundi Auto',
    telefono:'022670280',
    horarioInicio:'08:00AM',
    horarioFin:'05:00PM',
    estado:true
  }*/];
  sedeForm: FormGroup;

  displayedColumns:string[] =['nombre','ubicacion','telefono','horarioInicio','horarioFin','estado']
  constructor(private dialog:MatDialog, private fb: FormBuilder,private _httpSedeService:SedesService) { 
    this.sedeForm=this.fb.group({
      sedeNombre: new FormControl(''),
      sedeTelefono: new FormControl(''),
      sedeDireccion: new FormControl(''),
      horaInicio: new FormControl(''),
      horaFin: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.cargarTabla()
  }

  nuevaSede(){
    const dialogRef = this.dialog.open(DialogSede, {
      width: '500px',
      data: {
        
      }
    });

    dialogRef.componentInstance.respuesta.subscribe((result)=>{
      dialogRef.close();
      this.cargarTabla();
    });
  }

  cargarTabla(){
    this._httpSedeService.getSedes().subscribe(resp => {
      console.log(resp)
      this.listaSedes=resp
    })
  }
}

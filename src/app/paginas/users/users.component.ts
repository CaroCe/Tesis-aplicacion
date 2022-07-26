import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGeneral } from '../dialog-general/dialog-general';
import { Usuario } from './user';

const ELEMENT_DATA: Usuario[] = [
  {
    id: 1,
    nombre: 'Carolina Cevallos',
    cedula: '1718010653',
    domicilio: 'Llano grande',
    fechaNacimiento: new Date(1995, 3, 5),
    ocupacion: 'Desarrollador',
    profecion: 'Ingeniero software',
    rolId: 1,
    sedeId: 1,
    sede: 'Norte',
    telefono: '0983496205',
    estado: true
  },
  {
    id: 2,
    nombre: 'Kevin Alomoto',
    cedula: '1234567890',
    domicilio: 'El Arenal',
    fechaNacimiento: new Date(1994, 7, 12),
    ocupacion: 'Futbolista',
    profecion: 'Cultura fisica',
    rolId: 2,
    sedeId: 2,
    sede: 'Sur',
    telefono: '0995660670',
    estado: false
  },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  displayedColumns: string[] = ['name', 'date', 'phone', 'sede', 'state'];
  listaUsuarios = ELEMENT_DATA;
  constructor(public dialog: MatDialog) {

  }
  editarUsuario(element: any) {
    console.log(element);
  }

  guardarNuevo() {
    const dialogRef = this.dialog.open(DialogGeneral, {
      width: '400px',
      data: {
        mensaje: 'Usuario creado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  guardarEditado() {
    const dialogRef = this.dialog.open(DialogGeneral, {
      width: '400px',
      data: {
        mensaje: 'Usuario editado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

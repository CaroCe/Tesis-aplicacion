import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGeneral } from '../dialog-general/dialog-general';
import { Usuario } from './user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { RolesService } from '../../servicios/roles.service';
import { Rol } from './rol';
import { Sede } from '../admin-sedes/sede';
import { MatTableDataSource } from '@angular/material/table';
import { SedesService } from '../../servicios/sedes.service';

/*const ELEMENT_DATA: Usuario[] = [
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
];*/

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  usuarioId: number = 0;
  usuarioForm: FormGroup;
  filtroForm: FormGroup;
  displayedColumns: string[] = ['name', 'date', 'phone', 'sede', 'state'];
  listaUsuarios = new MatTableDataSource<Usuario>;
  listaRoles: Rol[] = [];
  listaSedes: Sede[] = [];
  sedeFiltro = new FormControl(0)
  estadoUsuario = new FormControl(false)
  sedeUsuario = new FormControl(0)
  rolUsuario = new FormControl(0)

  constructor(public dialog: MatDialog, private fb: FormBuilder, private _httpUsuarioService: UsuariosService, private _httpRolService: RolesService, private _httpSedeService: SedesService) {
    this.filtroForm = fb.group({
      nombre: new FormControl(''),
      cedula: new FormControl(''),
      sede: this.sedeFiltro,
      estado: this.estadoUsuario
    })
    this.usuarioForm= this.fb.group({
      nombre : new FormControl(''),
      cedula : new FormControl(''),
      fechaNacimiento : new FormControl(new Date()),
      telefono : new FormControl(''),
      ocupacion : new FormControl(''),
      domicilio : new FormControl(''),
      profesion : new FormControl(''),
      rolId : this.rolUsuario,
      sedeId : this.sedeUsuario,
    })
    _httpRolService.getRoles().subscribe(resp=>{
      this.listaRoles=resp;
    });
    _httpSedeService.getSedes().subscribe(resp => {
      this.listaSedes=resp;
    })
  }

  ngOnInit(): void {
    this.cargarTabla();
  }
  cargarTabla(){
    this._httpUsuarioService.getUsuarios().subscribe(resp => {
      console.log(resp)
      this.listaUsuarios=resp;
    })
  }
  nuevoUsuario(){
    this.usuarioForm.reset();
  }
  crearUsuario(){
    console.log(this.usuarioForm)
  }

  editarUsuario(element: any) {
    console.log(element);
  }

  guardar(){
    if(this.usuarioId===0){
      this.guardarNuevo
    }else{
      this.guardarEditado()
    }
  }

  guardarNuevo() {
    console.log(this.usuarioForm)
    let usuario: Usuario={
      usuarioNombre: this.usuarioForm.value.nombre,
      usuarioIdentificacion: this.usuarioForm.value.cedula,
      usuarioFechaNacimiento: this.usuarioForm.value.fechaNacimiento,
      usuarioTelefono: this.usuarioForm.value.telefono,
      usuarioOcupacion: this.usuarioForm.value.ocupacion,
      usuarioDireccion: this.usuarioForm.value.domicilio,
      usuarioProfesion: this.usuarioForm.value.profesion,
      rolId: this.usuarioForm.value.rolId,
      sedeId: this.usuarioForm.value.sedeId,
    }
    this._httpUsuarioService.postCrearUsuario(usuario).subscribe(resp=> {
      console.log(resp);
    })
    /*const dialogRef = this.dialog.open(DialogGeneral, {
      width: '400px',
      data: {
        mensaje: 'Usuario creado exitosamente'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });*/
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

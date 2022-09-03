
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaClinicaConsulta, Lateralidad } from './historia-clinica';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../users/user';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoriaClinicaService } from './historia-clinica.service';
import { DialogGeneral } from '../dialog-general/dialog-general';
import { RolesService } from '../../servicios/roles.service';
import { SedesService } from '../../servicios/sedes.service';
import { Rol } from '../users/rol';
import { Sede } from '../admin-sedes/sede';


@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {
  myControl = new FormControl<string | Usuario>('');;
  usuarios: Usuario[]=[];
  filteredOptions: Observable<Usuario[]>;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  displayedColumns: string[] = ['fechaRegistro', 'paciente', 'cedula', 'id'];
  dataSource= new MatTableDataSource<HistoriaClinicaConsulta>();
  constructor(private dialog:MatDialog, private _httpUsuarioService: UsuariosService) {
    this._httpUsuarioService.getUsuarios().subscribe(resp=>{this.usuarios=resp});
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.usuarioNombre;
        return name ? this._filter(name as string) : this.usuarios.slice();
      }),
    ); 
  }



  displayFn(user: Usuario): string {
    return user && user.usuarioNombre ? user.usuarioNombre : '';
  }

  private _filter(name: string): Usuario[] {
    const filterValue = name.toLowerCase();

    return this.usuarios.filter(option => option.usuarioNombre.toLowerCase().includes(filterValue));
  }

  verHistoria(id: number) {
    const dialogRef = this.dialog.open(DialogHistoriaClinica, {
      width: '700px',
      height: '650px',
      data: {id:id}
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
      data: {id:0}
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
  myControl = new FormControl<string | Usuario>('');;
  usuarios: Usuario[]=[];
  listaRoles: Rol[] = [];
  listaSedes: Sede[] = [];
  listaLateralidad: Lateralidad[] = [];
  filteredOptions: Observable<Usuario[]>
  usuarioForm: FormGroup;
  historiaForm: FormGroup;
  sedeUsuario = new FormControl(0);
  rolUsuario = new FormControl(0);
  lateralidadUsuario = new FormControl(0);

  constructor(
    private dialog:MatDialog,
    public dialogRef: MatDialogRef<DialogHistoriaClinica>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _httpHistoriaService:HistoriaClinicaService,
    private _httpUsuarioService: UsuariosService,
    private _httpRolService: RolesService, private _httpSedeService: SedesService
    ) {
      
    _httpRolService.getRoles().subscribe(resp=>{
      this.listaRoles=resp;
    });
    _httpSedeService.getSedes().subscribe(resp => {
      this.listaSedes=resp;
    });
    _httpHistoriaService.getLateralidades().subscribe(resp=> {
      this.listaLateralidad=resp;
    })
      this.usuarioForm=formBuilder.group({
        nombre : new FormControl(''),
        cedula : new FormControl(''),
        fechaNacimiento : new FormControl(new Date()),
        telefono : new FormControl(''),
        ocupacion : new FormControl(''),
        domicilio : new FormControl(''),
        profesion : new FormControl(''),
        email: new FormControl(''),
        rolId : this.rolUsuario,
        sedeId : this.sedeUsuario,
      })
      this.historiaForm=this.formBuilder.group({
        historiaFuente: new FormControl(''),
        historiaAntecedentes: new FormControl(''),
        historiaPatologicos: new FormControl(''),
        historiaHabitos: new FormControl(''),
        historiaVivienda: new FormControl(''),
        historiaAlergias: new FormControl(''),
        historiaActFisica: new FormControl(''),
        historiaFecha: new FormControl(new Date)
      });
      this._httpUsuarioService.getUsuarios().subscribe(resp=>{this.usuarios=resp});
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.usuarioNombre;
          return name ? this._filter(name as string) : this.usuarios.slice();
        }),
      ); 
  }

  
  displayFn(user: Usuario): string {
    return user && user.usuarioNombre ? user.usuarioNombre : '';
  }

  private _filter(name: string): Usuario[] {
    const filterValue = name.toLowerCase();

    return this.usuarios.filter(option => option.usuarioNombre.toLowerCase().includes(filterValue));
  }

  onSubmit(data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  completarDatosUsuario(datos:Usuario){
    console.log(datos)
    this.usuarioForm.patchValue({
      nombre:datos.usuarioNombre,
      cedula:datos.usuarioIdentificacion,
      fechaNacimiento:datos.usuarioFechaNacimiento,
      telefono:datos.usuarioTelefono,
      ocupacion:datos.usuarioOcupacion,
      domicilio:datos.usuarioDireccion,
      profesion:datos.usuarioProfesion,
      email:datos.usuarioCorreo,
      rolId:datos.rolId,
      sedeId:datos.sedeId
    })
  }
  guardarHistoria(){
    let datos: HistoriaClinicaConsulta={
      historiaFuente: this.historiaForm.value.historiaFuente,
      historiaAntecedentes: this.historiaForm.value.historiaAntecedentes,
      historiaPatologicos: this.historiaForm.value.historiaPatologicos,
      historiaHabitos: this.historiaForm.value.historiaHabitos,
      historiaVivienda: this.historiaForm.value.historiaVivienda,
      historiaAlergias: this.historiaForm.value.historiaAlergias,
      historiaActFisica: this.historiaForm.value.historiaActFisica,
    }
    this._httpHistoriaService.postCrearHistoria(datos).subscribe(resp=>{
      const dialogRef = this.dialog.open(DialogGeneral, {
        width: '400px',
        data: {
          mensaje:'Historia Clínica creada exitosamente'
        }
      });
    })
  }

}

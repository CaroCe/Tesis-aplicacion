import { Component, OnInit, VERSION } from '@angular/core';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegistro } from './dialogs/dialog-registro/dialog-registro';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:boolean = true;
  username: string = "";
  password: string = "";
  mensaje = false;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number = 0;
  alturaFila: string = '100%';
  numeroFilas: number = 1;
  alineacionLogo: string = "";
  alineacionFormulario: string = "";
  imagen: string = environment.logoName;
  nombreEmpresa: string = environment.tituloApp;
  isLoadingResults = false;
  formLogin = new FormGroup(
    {
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    }
  );
  formReg = new FormGroup(
    {
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      confirmPassword:new FormControl('',Validators.required)
    }
  );
  constructor(
    private _activatedRoute: ActivatedRoute,
    private http: LoginService,
    private _authService: AuthService,
    private _router: Router,
    private formBuilder:FormBuilder,
    public dialog: MatDialog
  ) {
    
  }

  private buildForm(){
    this.formLogin = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }
  reg(){
    this.loginForm = false;
  }
  log(){
    this.loginForm = true;
  }
  ngOnInit() {
    this.buildForm();
    if (window.innerWidth <= 500) {
      this.breakpoint = 1;
      this.alturaFila = "33.33%";
      this.numeroFilas = 2;
      this.alineacionLogo = "center";
      this.alineacionFormulario = "center";
    }
    else {
      this.breakpoint = 2;
      this.alturaFila = "100%";
      this.numeroFilas = 1;
      this.alineacionLogo = "right";
      this.alineacionFormulario = "left";
    }

  }
  onResize(event: any) {
    if (event.target.innerWidth <= 500) {
      this.breakpoint = 1;
      this.alturaFila = "33.33%";
      this.numeroFilas = 2;
      this.alineacionLogo = "center";
      this.alineacionFormulario = "center";
    }
    else {
      this.breakpoint = 2;
      this.alturaFila = "100%";
      this.numeroFilas = 1;
      this.alineacionLogo = "right";
      this.alineacionFormulario = "left";
    }
  }

  abrirConfirmacionRegistro(){
    const dialogRef = this.dialog.open(DialogRegistro, {
      width: '400px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  registrar(){
    this.abrirConfirmacionRegistro();
  }
  login() {

    this.isLoadingResults =true;

    // Return if the form is invalid
    if ( this.formLogin?.invalid )
    {
      this.isLoadingResults =false;
        return;
    }

    // Disable the form
    this.formLogin?.disable();


    // Sign in
    this._authService.signIn(this.formLogin?.value)
        .subscribe(
            (a) => {

                const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                this.isLoadingResults =false;
                this._router.navigateByUrl(redirectURL);

            },
            (response) => {
              this.isLoadingResults =false;
                this.formLogin?.enable();
            }
        );
  }

}

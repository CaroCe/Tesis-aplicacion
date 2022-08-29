export interface Usuario {
    usuarioId?:                  number;
    usuarioNombre:              string;
    usuarioIdentificacion:      string;
    usuarioFechaNacimiento:     Date;
    usuarioTelefono:            string;
    usuarioCorreo?:             string;
    usuarioPassword?:           string;
    usuarioOcupacion:           string;
    usuarioDireccion:           string;
    usuarioProfesion:           string;
    lateralidadId?:             number;
    rolId:                      number;
    sedeId:                     number;
    sede?:                       string;
    estado?:                    boolean;
}

export interface Consulta {
    consultaId?:             number;
    especialistaId:         number;
    historiaId:             number;
    consultaFecha:          Date;
    consultaMotivo:         string;
    consultaDescripcion:    string;
    consultaImagen:         string;
    consultaDescripImagen:  string;
    consultaProblema:       string;
    examinacionObservacion: string;
    examinacionInspeccion:  string;
    diagnostico:            string;
}
export interface FotoConsulta {
    fotoExaminacionId:          number;
    consultaId:                 number;
    fotoExaminacionImagen:      string;
    fotoExaminacionDescripcion: string;
}

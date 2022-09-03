export interface HistoriaClinicaConsulta {
    historiaId?:                 number,
    historiaFuente?:             string;
    historiaAntecedentes?:       string;
    historiaPatologicos?:        string;
    historiaHabitos?:            string;
    historiaVivienda?:           string;
    historiaAlergias?:           string;
    historiaActFisica?:          string;
}

export interface Lateralidad{
    lateralidadId: number;
    lateralidadNombre: string;
}
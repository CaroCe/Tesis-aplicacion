export interface HorarioEspecialista {
    horarioEspecialistaId:     number;
    horarioId:                 number;
    horarioTrabajoId:          number;
    usuarioId:                 number;
    horarioEspecialistaEstado: boolean;
    horario:                   HorarioDia;
    horarioTrabajo:            HorarioTrabajo;
}

export interface HorarioDia {
    horarioId:           number;
    horarioNombre:       string;
    horarioEspecialista: HorarioEspecialista[];
}

export interface HorarioTrabajo {
    horarioTrabajoId:    number;
    horarioTrabajoDesde: string;
    horarioTrabajoHasta: string;
    horarioEspecialista: string[];
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsultaBuscador } from './buscar-consulta';

@Component({
  selector: 'app-buscar-consulta',
  templateUrl: './buscar-consulta.component.html',
  styleUrls: ['./buscar-consulta.component.css']
})
export class BuscarConsultaComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  displayedColumns: string[] = ['fecha', 'paciente', 'problema', 'diagnostico','acciones'];
  dataSource:ConsultaBuscador[] = [
    {
      id:1,
      fecha:"2022-05-01",
      paciente:"Maria Nancy Simbaña Muzo",
      problema: "Dolor rodilla",
      diagnostico:"Fractura"
    },
    {
      id:2,
      fecha:"2022-04-15",
      paciente:"Roberto Guillermo Villacres Lizano",
      problema: "Dolor hombro izquierdo",
      diagnostico:"Ligamento desgarrado"
    },
    {
      id:3,
      fecha:"2022-04-10",
      paciente:"Enma Ines Lizano Poveda",
      problema: "Dolor rodilla",
      diagnostico:"Fractura"
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

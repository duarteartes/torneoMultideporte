import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallesDisciplina } from '../detalles-disciplina/detalles-disciplina';
import { Torneo } from '../services/torneo';  // o DisciplinasService si prefieres

@Component({
  selector: 'app-disciplinas',
  standalone: true,                 // Si usas standalone (como en DetallesDisciplina)
  imports: [CommonModule, DetallesDisciplina],
  templateUrl: './disciplinas.html',
  styleUrls: ['./disciplinas.css']  // corregido styleUrls en plural
})
export class Disciplinas implements OnInit {
  disciplinas: any[] = [];
  disciplinaSeleccionada: any;

  constructor(private torneoService: Torneo) {}

  ngOnInit() {
    this.cargarDisciplinas();
  }

  cargarDisciplinas() {
    // Aquí puedes usar getDisciplinas o getDisciplinasPorAnio, según tu API y lo que necesites
    this.torneoService.getDisciplinas().subscribe({
      next: (data) => this.disciplinas = data,
      error: (err) => console.error('Error cargando disciplinas:', err)
    });
  }

  seleccionarDisciplina(disciplina: any) {
    this.disciplinaSeleccionada = disciplina;
  }
}

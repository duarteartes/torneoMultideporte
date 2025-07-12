import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallesDisciplina } from '../detalles-disciplina/detalles-disciplina';
import { Torneo } from '../services/torneo';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule, DetallesDisciplina],
  templateUrl: './disciplinas.html',
  styleUrls: ['./disciplinas.css']
})

export class Disciplinas implements OnInit {

  disciplinas: any[] = [];
  disciplinaSeleccionada: any;

  constructor(private torneoService: Torneo) {}

  ngOnInit() {
    this.cargarDisciplinas();
  }

  cargarDisciplinas() {
    this.torneoService.getDisciplinas().subscribe({
      next: (data) => this.disciplinas = data,
      error: (err) => console.error('Error cargando disciplinas:', err)
    });
  }

  seleccionarDisciplina(disciplina: any) {
    this.disciplinaSeleccionada = disciplina;
  }
}
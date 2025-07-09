import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinasService } from '../services/disciplinas';

@Component({
  selector: 'app-detalles-disciplina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-disciplina.html',
  styleUrl: './detalles-disciplina.css'
})
export class DetallesDisciplina implements OnInit, OnChanges {
  @Input() disciplinaId!: number;

  disciplina: any = null;
  equipos: any[] = [];
  partidos: any[] = [];

  mostrarEquipos = false;
  mostrarEliminatoria = false;
  faseEliminatoriaUrl: string | null = null;

  constructor(private disciplinaService: DisciplinasService) {}

  ngOnInit(): void {
    if (this.disciplinaId) {
      this.loadDisciplina(this.disciplinaId);
      this.loadEquipos(this.disciplinaId);
      this.loadPartidos(this.disciplinaId);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disciplinaId'] && changes['disciplinaId'].currentValue) {
      const id = changes['disciplinaId'].currentValue;
      this.loadDisciplina(id);
      this.loadEquipos(id);
      this.loadPartidos(id);
    }
  }

  loadDisciplina(id: number) {
    this.disciplinaService.getDisciplinaById(id).subscribe(data => {
      this.disciplina = data;
    });
  }

  loadEquipos(id: number) {
    this.disciplinaService.getEquiposPorDisciplina(id).subscribe(data => {
      this.equipos = data;
    });
  }

  loadPartidos(id: number) {
    this.disciplinaService.getPartidosPorDisciplina(id).subscribe(data => {
      this.partidos = data;
    });
  }

  toggleEquipos() {
    this.mostrarEquipos = !this.mostrarEquipos;
    this.mostrarEliminatoria = false;
  }

  toggleEliminatoria() {
    this.mostrarEliminatoria = !this.mostrarEliminatoria;
    this.mostrarEquipos = false;

    if (this.mostrarEliminatoria) {
      this.faseEliminatoriaUrl = `assets/fases-eliminatorias/fase-disciplina-${this.disciplinaId}.png`;
    } else {
      this.faseEliminatoriaUrl = null;
    }
  }
}
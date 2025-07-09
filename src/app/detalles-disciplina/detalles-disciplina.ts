import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinasService } from '../services/disciplinas';
import { PartidosService } from '../services/partidos';

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

  ultimaImagenUrl: string | null = null;
  torneoId = 1; // o el ID del torneo activo que tengas, definirlo según contexto

  constructor(private disciplinaService: DisciplinasService, private partidosService: PartidosService) {}

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
      this.loadUltimaImagen(this.torneoId, id);
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

  loadUltimaImagen(torneoId: number, disciplinaId: number) {
    this.partidosService.getUltimaImagenCuadro(torneoId, disciplinaId).subscribe({
      next: (data) => {
        this.ultimaImagenUrl = data?.ruta ? `http://localhost:3000${data.ruta}` : null;
      },
      error: (err) => {
        console.warn('No se encontró última imagen', err);
        this.ultimaImagenUrl = null;
      }
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
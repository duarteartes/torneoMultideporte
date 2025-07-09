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
  equiposConPartidosAbiertos: boolean[] = [];

  ultimaImagenUrl: string | null = null;
  torneoId = 1; // o el ID del torneo activo que tengas, definirlo según contexto
  ganador: any = null;

  constructor(private disciplinaService: DisciplinasService, private partidosService: PartidosService) {}

  ngOnInit(): void {
    if (this.disciplinaId) {
      this.loadDisciplina(this.disciplinaId);
      this.loadEquipos(this.disciplinaId);
      this.loadPartidos(this.disciplinaId);
      this.loadUltimaImagen(this.torneoId, this.disciplinaId);
      this.loadGanador(this.disciplinaId);

    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disciplinaId'] && changes['disciplinaId'].currentValue) {
      const id = changes['disciplinaId'].currentValue;
      this.loadDisciplina(id);
      this.loadEquipos(id);
      this.loadPartidos(id);
      this.loadUltimaImagen(this.torneoId, id);
      this.loadGanador(id);
    }
  }

  loadDisciplina(id: number) {
    this.disciplinaService.getDisciplinaById(id).subscribe(data => {
      this.disciplina = data;
    });
  }

  loadEquipos(id: number) {
    this.disciplinaService.getEquiposPorDisciplina(id).subscribe(data => {
      // Filtramos equipos para que solo estén los que tienen partidos en el año actual
      const anioActual = new Date().getFullYear();

      // Cargamos los partidos para la disciplina y año actual (ya haces loadPartidos)
      this.partidosService.getByDisciplinaYAnio(id, anioActual).subscribe(partidos => {
        this.partidos = partidos;

        // Crear un Set con ids de equipos que aparecen en partidos del año actual
        const equiposConPartidos = new Set<number>();
        partidos.forEach(p => {
          equiposConPartidos.add(p.equipo_local_id);
          equiposConPartidos.add(p.equipo_visitante_id);
        });

        // Filtrar equipos para mostrar solo los que están en ese Set
        this.equipos = data.filter(equipo => equiposConPartidos.has(equipo.id));
        this.equiposConPartidosAbiertos = new Array(this.equipos.length).fill(false);
      });
    });
  }

  loadPartidos(id: number) {
    this.partidosService.getByDisciplinaYAnio(id, new Date().getFullYear()).subscribe({
      next: partidos => this.partidos = partidos,
      error: err => console.error('Error cargando partidos:', err)
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

  loadGanador(id: number) {
    const anioActual = new Date().getFullYear();
    this.partidosService.getGanadorPorDisciplinaYAnio(id, anioActual).subscribe({
      next: (data) => this.ganador = data,
      error: (err) => {
        console.warn('No se encontró ganador para esta disciplina y año', err);
        this.ganador = null;
      }
    });
  }

  getPartidosPorEquipo(equipoId: number) {
    return this.partidos
      .filter(p => p.equipo_local_id === equipoId || p.equipo_visitante_id === equipoId)
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }

  toggleEquipos() {
    this.mostrarEquipos = !this.mostrarEquipos;
    this.mostrarEliminatoria = false;
  }

  togglePartidos(index: number) {
    this.equiposConPartidosAbiertos[index] = !this.equiposConPartidosAbiertos[index];
  }

  toggleEliminatoria() {
    this.mostrarEliminatoria = !this.mostrarEliminatoria;
    this.mostrarEquipos = false;

    if (this.mostrarEliminatoria) {
      this.loadUltimaImagen(this.torneoId, this.disciplinaId);
    } else {
      this.ultimaImagenUrl = null;
    }
  }
}
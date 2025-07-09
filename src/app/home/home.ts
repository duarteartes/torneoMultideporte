import { Component, OnInit } from '@angular/core';
import { Torneo } from '../services/torneo';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  disciplinas: any[] = [];
  partidosPorFase: any[] = [];
  anios: number[] = [];
  anioSeleccionado: number = new Date().getFullYear();
  disciplinaSeleccionada: number | null = null;

  constructor(private torneo: Torneo) {}

  ngOnInit(): void {
    this.loadAnios();
  }

  loadAnios() {
    this.torneo.getAnios().subscribe(data => {
      this.anios = data;
      this.anioSeleccionado = new Date().getFullYear();

      this.loadDisciplinasPorAnio(this.anioSeleccionado);
    });
  }

  loadDisciplinasPorAnio(anio: number) {
    this.torneo.getDisciplinasPorAnio(anio).subscribe(data => {
      this.disciplinas = data;
      if (data.length > 0) {
        this.seleccionarDisciplina(data[0].id);
      } else {
        this.disciplinaSeleccionada = null;
        this.partidosPorFase = [];
      }
    });
  }

  seleccionarDisciplina(disciplinaId: number) {
    this.disciplinaSeleccionada = disciplinaId;
    this.loadPartidos();
  }

  loadPartidos() {
    if (this.disciplinaSeleccionada && this.anioSeleccionado) {
      this.torneo.getPartidosPorDisciplinaYAnio(this.disciplinaSeleccionada, this.anioSeleccionado).subscribe(data => {

        const ordenFases = [
          'Dieciseisavos',
          'Octavos',
          'Cuartos',
          'Semifinales',
          'Final'
        ];

        // Ordenar primero por fase y fecha
        const partidosOrdenados = data.sort((a: any, b: any) => {
          const faseA = ordenFases.indexOf(a.fase);
          const faseB = ordenFases.indexOf(b.fase);
          if (faseA < faseB) return -1;
          if (faseA > faseB) return 1;
          return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
        });

        // Agrupar por fase
        this.partidosPorFase = ordenFases.map(fase => ({
          fase: fase,
          partidos: partidosOrdenados.filter((p: any) => p.fase === fase)
        })).filter(grupo => grupo.partidos.length > 0);

      });
    }
  }

  seleccionarAnio(anio: number) {
    this.anioSeleccionado = anio;
    this.loadDisciplinasPorAnio(anio);
  }
}
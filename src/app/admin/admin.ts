import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PartidosService } from '../services/partidos';
import { DisciplinasService } from '../services/disciplinas';
import { EquiposService } from '../services/equipos';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})

export class Admin implements OnInit {
  disciplinas: any[] = [];
  equipos: any[] = [];
  equiposFiltrados: any[] = []; // ✅ NUEVO
  partidos: any[] = [];
  anioActual: number = new Date().getFullYear();

  disciplinaSeleccionada: number | null = null;
  mensaje: string = '';

  crearPartidoForm!: FormGroup;

  token: string = '';

  constructor(
    private disciplinasService: DisciplinasService,
    private equiposService: EquiposService,
    private partidosService: PartidosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadDisciplinas();
    this.loadEquipos();

    this.crearPartidoForm = this.fb.group({
      equipoLocalId: [null, Validators.required],
      equipoVisitanteId: [null, Validators.required],
      fase: ['', Validators.required],
      fecha: ['', Validators.required]
    });

    this.token = localStorage.getItem('token') || '';
  }

  loadDisciplinas() {
    this.disciplinasService.getAll().subscribe(data => this.disciplinas = data);
  }

  loadEquipos() {
    this.equiposService.getAll().subscribe(data => this.equipos = data);
  }

  onDisciplinaChange() {
    if (this.disciplinaSeleccionada) {
      // ✅ Filtra los equipos para la disciplina seleccionada
      this.equiposFiltrados = this.equipos.filter(e => e.disciplina_id === this.disciplinaSeleccionada);

      this.partidosService.getByDisciplinaYAnio(this.disciplinaSeleccionada, this.anioActual)
        .subscribe(data => this.partidos = data);
    } else {
      this.equiposFiltrados = [];
      this.partidos = [];
    }
  }

  crearPartido() {
    if (this.crearPartidoForm.invalid || !this.disciplinaSeleccionada) return;

    const datos = {
      torneo_id: 1, // o dinámico
      disciplina_id: this.disciplinaSeleccionada,
      equipo_local_id: this.crearPartidoForm.value.equipoLocalId,
      equipo_visitante_id: this.crearPartidoForm.value.equipoVisitanteId,
      fase: this.crearPartidoForm.value.fase,
      resultado_local: null,
      resultado_visitante: null,
      ganador_id: null,
      fecha: this.crearPartidoForm.value.fecha
    };

    this.partidosService.create(datos, this.token).subscribe({
      next: () => {
        this.mensaje = 'Partido creado.';
        this.onDisciplinaChange();
        this.crearPartidoForm.reset();
      },
      error: err => this.mensaje = err.error.message
    });
  }

  guardarResultado(partido: any) {
    const datos = {
      resultado_local: partido.resultado_local,
      resultado_visitante: partido.resultado_visitante,
      ganador_id: partido.ganador_id,
      fecha: partido.fecha
    };

    this.partidosService.update(partido.id, datos, this.token).subscribe({
      next: () => this.mensaje = 'Resultado actualizado.',
      error: err => this.mensaje = err.error.message
    });
  }

  borrarPartido(id: number) {
    this.partidosService.delete(id, this.token).subscribe({
      next: () => {
        this.mensaje = 'Partido eliminado.';
        this.onDisciplinaChange();
      },
      error: err => this.mensaje = err.error.message
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../services/disciplinas';
import { EquiposService } from '../services/equipos';
import { PartidosService } from '../services/partidos';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  disciplinas: any[] = [];
  equipos: any[] = [];
  equiposFiltrados: any[] = [];
  partidos: any[] = [];
  anioActual = new Date().getFullYear();

  disciplinaSeleccionada: number | null = null;
  mensaje = '';
  selectedFile: File | null = null;

  crearEquipoForm!: FormGroup;
  editarEquipoForm!: FormGroup;
  crearPartidoForm!: FormGroup;

  equipoEditando: any | null = null;

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  constructor(
    private fb: FormBuilder,
    private disciplinasService: DisciplinasService,
    private equiposService: EquiposService,
    private partidosService: PartidosService
  ) {}

  ngOnInit(): void {
    this.loadDisciplinas();
    this.loadEquipos();

    this.crearEquipoForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.editarEquipoForm = this.fb.group({
      nombre: ['', Validators.required],
      disciplinaId: ['', Validators.required]
    });

    this.crearPartidoForm = this.fb.group({
      equipoLocalId: [null, Validators.required],
      equipoVisitanteId: [null, Validators.required],
      fase: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  private showMessage(text: string, duration = 3000) {
    this.mensaje = text;
  }

  loadDisciplinas() {
    this.disciplinasService.getAll().subscribe({
      next: d => this.disciplinas = d,
      error: () => this.showMessage('Error cargando disciplinas')
    });
  }

  loadEquipos() {
    this.equiposService.getAll().subscribe({
      next: e => {
        this.equipos = e;
        this.filterEquipos();
      },
      error: () => this.showMessage('Error cargando equipos')
    });
  }

  seleccionarDisciplina(id: number) {
    this.disciplinaSeleccionada = id;
    this.filterEquipos();
    this.loadPartidos();
  }

  private filterEquipos() {
    if (this.disciplinaSeleccionada != null) {
      this.equiposFiltrados = this.equipos.filter(e => e.disciplina_id === this.disciplinaSeleccionada);
    } else {
      this.equiposFiltrados = [];
    }
  }

  private loadPartidos() {
    if (this.disciplinaSeleccionada != null) {
      this.partidosService.getByDisciplinaYAnio(this.disciplinaSeleccionada, this.anioActual).subscribe({
        next: p => this.partidos = p,
        error: () => this.showMessage('Error cargando partidos')
      });
    } else {
      this.partidos = [];
    }
  }

  crearEquipo() {
    if (this.crearEquipoForm.invalid || this.disciplinaSeleccionada == null) return;

    const datos = {
      nombre: this.crearEquipoForm.value.nombre.trim(),
      disciplina_id: this.disciplinaSeleccionada,
      torneo_id: 1
    };

    this.equiposService.createEquipo(datos).subscribe({
      next: () => {
        this.showMessage('Equipo creado.');
        this.crearEquipoForm.reset();
        this.loadEquipos();
      },
      error: err => this.showMessage(err.error?.message || 'Error creando equipo')
    });
  }

  editarEquipo(e: any) {
    this.equipoEditando = e;
    this.editarEquipoForm.patchValue({
      nombre: e.nombre,
      disciplinaId: e.disciplina_id
    });
  }

  guardarEdicionEquipo() {
    if (!this.equipoEditando || this.editarEquipoForm.invalid) return;

    const datos = {
      nombre: this.editarEquipoForm.value.nombre.trim(),
      disciplina_id: this.editarEquipoForm.value.disciplinaId,
      torneo_id: this.equipoEditando.torneo_id
    };

    this.equiposService.updateEquipo(this.equipoEditando.id, datos, this.token).subscribe({
      next: () => {
        this.showMessage('Equipo actualizado.');
        this.equipoEditando = null;
        this.editarEquipoForm.reset();
        this.loadEquipos();
        this.loadPartidos(); // ✅ Refresca los partidos también
      },

      error: err => this.showMessage(err.error?.message || 'Error actualizando equipo')
    });
  }

  cancelarEdicionEquipo() {
    this.equipoEditando = null;
    this.editarEquipoForm.reset();
  }

  eliminarEquipo(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este equipo?')) return;

    this.equiposService.deleteEquipo(id, this.token).subscribe({
      next: () => {
        this.showMessage('Equipo eliminado.');
        this.loadEquipos();
      },
      error: err => this.showMessage(err.error?.message || 'Error eliminando equipo')
    });
  }

  crearPartido() {
    if (this.crearPartidoForm.invalid || this.disciplinaSeleccionada == null) return;

    const f = this.crearPartidoForm.value;

    if (f.equipoLocalId === f.equipoVisitanteId) {
      this.showMessage('El equipo local y visitante deben ser diferentes.');
      return;
    }

    const datos = {
      torneo_id: 1,
      disciplina_id: this.disciplinaSeleccionada,
      equipo_local_id: f.equipoLocalId,
      equipo_visitante_id: f.equipoVisitanteId,
      fase: f.fase.trim(),
      resultado_local: null,
      resultado_visitante: null,
      ganador_id: null,
      fecha: f.fecha
    };

    this.partidosService.create(datos, this.token).subscribe({
      next: () => {
        this.showMessage('Partido creado.');
        this.crearPartidoForm.reset();
        this.loadPartidos();
      },
      error: err => this.showMessage(err.error?.message || 'Error creando partido')
    });
  }

  guardarResultado(p: any) {
    if (p.equipo_local_id === p.equipo_visitante_id) {
      this.showMessage('El equipo local y visitante no pueden ser iguales.');
      return;
    }

    const datos = {
      resultado_local: p.resultado_local,
      resultado_visitante: p.resultado_visitante,
      ganador_id: p.ganador_id,
      fecha: p.fecha
    };

    this.partidosService.update(p.id, datos, this.token).subscribe({
      next: () => this.showMessage('Resultado actualizado.'),
      error: err => this.showMessage(err.error?.message || 'Error guardando resultado')
    });
  }

  borrarPartido(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este partido?')) return;

    this.partidosService.delete(id, this.token).subscribe({
      next: () => {
        this.showMessage('Partido eliminado.');
        this.loadPartidos();
      },
      error: err => this.showMessage(err.error?.message || 'Error eliminando partido')
    });
  }

  get nombreDisciplinaSeleccionada(): string {
    if (this.disciplinaSeleccionada == null) return '';
    const d = this.disciplinas.find(x => x.id === this.disciplinaSeleccionada);
    return d ? d.nombre : '';
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  cargarFaseEliminatoria() {
    if (!this.selectedFile || !this.disciplinaSeleccionada) {
      this.showMessage('Debe seleccionar disciplina e imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', this.selectedFile);
    formData.append('torneo_id', '1');

    this.partidosService
      .subirFaseEliminatoria(
        this.disciplinaSeleccionada,
        formData,
        this.token
      )
      .subscribe({
        next: (res) => {
          this.showMessage(`Imagen subida: ${res.filename}`);
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          this.showMessage(err.error?.error || 'Error subiendo imagen');
        },
      });
  }

}
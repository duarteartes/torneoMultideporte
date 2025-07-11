import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisciplinasService } from '../services/disciplinas';
import { EquiposService } from '../services/equipos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})

export class Inscripciones {
  inscripcionForm!: FormGroup;
  disciplinas: any[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';
  equiposExistentes: any[] = [];
  botonDeshabilitado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private disciplinasService: DisciplinasService,
    private equiposService: EquiposService
  ) {}

  ngOnInit(): void {
    this.inscripcionForm = this.fb.group({
      nombreEquipo: ['', Validators.required],
      disciplinaId: [null, Validators.required]
    });

    this.loadDisciplinas();
    this.loadEquipos(); // 👈 carga todos los equipos al iniciar
  }

  loadEquipos(): void {
    this.equiposService.getAll().subscribe(data => {
      this.equiposExistentes = data;
    });
  }

  loadDisciplinas(): void {
    this.disciplinasService.getAll().subscribe(data => {
      this.disciplinas = data;
    });
  }

  onSubmit() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
      return;
    }

    const nombre = this.inscripcionForm.value.nombreEquipo.trim();
    const disciplinaId = this.inscripcionForm.value.disciplinaId;

    const datos = {
      nombre,
      disciplina_id: disciplinaId,
      torneo_id: 1
    };

    this.botonDeshabilitado = true;

    this.equiposService.createEquipo(datos).subscribe({
      next: res => {
        this.mensajeExito = '¡Equipo creado correctamente!';
        this.inscripcionForm.reset();
        this.botonDeshabilitado = false;
        this.loadEquipos(); // Actualiza la lista
        setTimeout(() => this.mensajeExito = '', 5000);
      },
      error: err => {
        if (err.status === 400 && err.error?.message) {
          this.mensajeError = err.error.message;
        } else {
          this.mensajeError = 'Error al crear el equipo.';
        }
        this.botonDeshabilitado = false;
      }
    });
  }


}

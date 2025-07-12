import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Torneo {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDisciplinas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/disciplinas`);
  }

  getDisciplinasPorAnio(anio: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/disciplinas/anio/${anio}`);
  }

  getPartidosPorDisciplinaYAnio(disciplinaId: number, anio: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/partidos/disciplina/${disciplinaId}/anio/${anio}`);
  }

  getAnios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/torneos/anios`);
  }
}
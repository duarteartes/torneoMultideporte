import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta tu URL base

  constructor(private http: HttpClient) {}

  getDisciplinaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/disciplinas/${id}`);
  }

  getEquiposPorDisciplina(disciplinaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplinas/${disciplinaId}/equipos`);
  }

  getPartidosPorDisciplina(disciplinaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplinas/${disciplinaId}/partidos`);
  }
}

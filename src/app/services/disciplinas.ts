import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DisciplinasService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplinas`);
  }

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
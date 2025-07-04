import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PartidosService {
  private apiUrl = 'http://localhost:3000/api/partidos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getByDisciplinaYAnio(disciplinaId: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplina/${disciplinaId}/anio/${anio}`);
  }

  create(data: any, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  update(id: number, data: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  delete(id: number, token: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
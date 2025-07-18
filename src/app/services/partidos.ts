import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PartidosService {

  private apiUrl = 'http://localhost:3000/api/partidos';
  private uploadUrl = 'http://localhost:3000/api/uploads';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getByDisciplinaYAnio(disciplinaId: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplina/${disciplinaId}/anio/${anio}`);
  }

  getGanadorPorDisciplinaYAnio(disciplinaId: number, anio: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/disciplina/${disciplinaId}/anio/${anio}/ganador`);
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

  subirFaseEliminatoria(
    disciplinaId: number,
    formData: FormData,
    token: string
  ): Observable<{ filename: string }> {
    return this.http.post<{ filename: string }>(
      `${this.uploadUrl}/upload/${disciplinaId}`,
      formData,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }
    );
  }

  getImagenesCuadro(torneoId: number, disciplinaId: number) {
    return this.http.get<any[]>(`http://localhost:3000/api/uploads/${torneoId}/${disciplinaId}`);
  }

  getUltimaImagenCuadro(torneoId: number, disciplinaId: number) {
    return this.http.get<any>(`http://localhost:3000/api/uploads/ultima/${torneoId}/${disciplinaId}`);
  }

  uploadImagenGanador(disciplinaId: number, formData: FormData) {
    return this.http.post(`http://localhost:3000/api/uploads/uploadGanador/${disciplinaId}`, formData);
  }

  getImagenesGanadores(torneoId: number, disciplinaId: number) {
    return this.http.get<any[]>(`http://localhost:3000/api/uploads/ganadores/${torneoId}/${disciplinaId}`);
  }

  getUltimaImagenGanador(torneoId: number, disciplinaId: number) {
    return this.http.get<any>(`http://localhost:3000/api/uploads/ganadores/ultima/${torneoId}/${disciplinaId}`);
  }
}
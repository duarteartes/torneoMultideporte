import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EquiposService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createEquipo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/equipos`, data);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/equipos`);
  }

  updateEquipo(id: number, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/equipos/${id}`, data, { headers });
  }

  deleteEquipo(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/equipos/${id}`, { headers });
  }
}
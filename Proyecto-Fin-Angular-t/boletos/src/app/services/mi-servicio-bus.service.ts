import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MiServicioBusService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  
    private url = "http://localhost:3000/api/autobuses";
  constructor(
      private http: HttpClient  
    ) { 
  
    }
  
    guardar_bus(datos: any): Observable<any> {
      return this.http.post(this.url, datos, { headers: this.headers });
    }
  
    obtener_bus(): Observable<any> {
      return this.http.get(this.url);
    }
  
    eliminar_bus(autobus_id: number): Observable<any> {
      return this.http.delete(`${this.url}`, {
        headers: this.headers,
        body: { autobus_id }  
      });
    }
    
    actualizar_bus(datos: any): Observable<any> {
      return this.http.put(`${this.url}`, datos, { headers: this.headers });
    }
  }
  
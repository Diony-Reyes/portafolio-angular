import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  equipo: any[] = [];
  cargada = false;

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
      this.info = resp;
      this.cargada = true;

      console.log(resp)
    })
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-test-default-rtdb.firebaseio.com/equipo.json').subscribe((resp: any) => {
      this.equipo = resp;

      console.log(resp);
    })
  }
}

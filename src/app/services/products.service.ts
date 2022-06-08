import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos()
  }

  private cargarProductos() {
    // @ts-ignore
    this.http.get('https://angular-html-test-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp: Producto[]) => {
      this.productos = resp;
      this.cargando = false
    })
  }
}

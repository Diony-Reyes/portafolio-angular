import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          'https://angular-html-test-default-rtdb.firebaseio.com/productos_idx.json'
        )
        // @ts-ignore
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve(resp);
        });
    });
  }

  private buscarProducto(termino: string) {
    termino = termino.toLocaleLowerCase();

    this.productosFiltrados = this.productos.filter((producto) => {
      return (
        producto.categoria.toLocaleLowerCase().indexOf(termino) >= 0 ||
        producto.titulo.toLocaleLowerCase().indexOf(termino) >= 0
      );
    });
  }

  getProducto(id: string) {
    return this.http.get(
      `https://angular-html-test-default-rtdb.firebaseio.com/productos/${id}.json`
    );
  }

  filtrarProductos(termino: string) {
    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.buscarProducto(termino);
      });
    } else {
      this.buscarProducto(termino);
    }
  }
}

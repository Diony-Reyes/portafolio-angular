import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  producto: Partial<ProductoDescripcion> = {};
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      this.id = parametros['id'];

      this.productoService
        .getProducto(parametros['id'])
        .subscribe((producto: Partial<ProductoDescripcion>) => {
          console.log(producto);
          this.producto = producto;
        });
    });
  }
}

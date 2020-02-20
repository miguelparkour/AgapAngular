import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Libro } from 'src/app/modelos/libro';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { ControlpedidoService } from 'src/app/servicios/controlpedido.service';


@Component({
  selector: 'app-minilibro',
  templateUrl: '../../vistas/Tienda/minilibro.component.html',
  styleUrls: ['../../vistas/css/minilibro.component.css']
})
export class MinilibroComponent implements OnInit {

  @Input()libroApintar:Libro;

  constructor(private _router:Router, 
             private _storage:LocalstorageService,
             private _gestorPedido: ControlpedidoService) {}

  ngOnInit() {
  }

  ComprarLibro(libroComprar:Libro){
    this._gestorPedido.actualizarPedido(libroComprar);
    // redirijo a la vista pedido para mostrar el nuevo libro a comprar
    this._router.navigate(['Cliente/MiPanel/MisPedidos'])
  }

  cargarEnStorage(libro:Libro):void{

    //almaceno en el storage el libro para q despues lo recupere la vista de detalles
    // esto está feisimo porque no se podría entrar en agapea sin pasar por la vista libros
    this._storage.AlmacenarStorage("libro",libro);
  }

}

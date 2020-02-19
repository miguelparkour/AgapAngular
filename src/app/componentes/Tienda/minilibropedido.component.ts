import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Libro } from 'src/app/modelos/libro';
import { ItemCarro } from 'src/app/modelos/itemsCarro';

@Component({
  selector: 'app-minilibropedido',
  templateUrl: '../../vistas/Tienda/minilibropedido.component.html',
  styleUrls: ['../../vistas/css/minilibropedido.component.css']
})
export class MinilibropedidoComponent implements OnInit {
  @Input() itemPintar:ItemCarro;  // <----- recibida del pedido.component

  // esta variable se usa para mandar una señal al componente padre: pedido.component
  // para que se actualice el SUBTOTAL y el TOTAL PEDIDO cada vez que se pulsa el boton +
  // en el metodo SumaCantidad, o el boton - en el metodo RestaCantidad
  @Output() actualizaPedido:EventEmitter<ItemCarro>=new EventEmitter<ItemCarro>()

  
  constructor() { }

  ngOnInit() {
  }


  QuitarDePedido(libro:Libro){

  }

  RestaCantidad(item:ItemCarro){
    this.itemPintar.cantidad--;
    this.actualizaPedido.emit(this.itemPintar);
  }

  SumaCantidad(item:ItemCarro){
    this.itemPintar.cantidad++;
    this.actualizaPedido.emit(this.itemPintar);
  }
}

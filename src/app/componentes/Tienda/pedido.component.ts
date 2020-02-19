import { Component, OnInit } from '@angular/core';
import { ItemCarro } from 'src/app/modelos/itemsCarro';
import { ControlpedidoService } from 'src/app/servicios/controlpedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: '../../vistas/Tienda/pedido.component.html',
  styleUrls: ['../../vistas/css/pedido.component.css']
})
export class PedidoComponent implements OnInit {
  public SubTotalPedido:number=0;
  public GastosEnvio:number=2.5;
  public TotalPedido:number=0;


  // los items del pedido en el momento de mostrar
  // la vista
  private _itemsPedido:ItemCarro[]; 
  constructor(private _gestorpedido:ControlpedidoService) { 
    this._gestorpedido.GetItemsCarro().subscribe(
      (items)=>this._itemsPedido=items
    )
  }

  ngOnInit() {
  }

  ActualizaPedido(event:ItemCarro){
    // actualizar la lista de items del pedido porque se ha modificado la cantidad
    // de alguno de los libros del carro desde las minivistas
    let _posicionItem=this._itemsPedido.findIndex(item=>item.libroItem.ISBN===event.libroItem.ISBN);
    this._itemsPedido[_posicionItem].cantidad=event.cantidad;
    // 1º) actualizar subtotal y total pedido desde el array actualizado
    this._itemsPedido.forEach(
      (item)=>{
        this.SubTotalPedido+=item.libroItem.Precio*item.cantidad;
      }
    )
    this.TotalPedido=this.SubTotalPedido+this.GastosEnvio;
    // 2º) actualizarlo en el subject del servicio
    this._gestorpedido.AddItemCarro(event);
  }
}
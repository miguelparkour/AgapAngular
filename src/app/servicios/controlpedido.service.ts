import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from "rxjs";
import { Libro } from '../modelos/libro';
import { ItemCarro } from '../modelos/itemsCarro';

@Injectable({
  providedIn: 'root'
})
export class ControlpedidoService {
  //  subject para enviar-recibir itemscarro desde componentes
  private _itemsPedido$:BehaviorSubject<Array<ItemCarro>>=new BehaviorSubject<Array<ItemCarro>>([]);
  //  array interno para recoger ultimos valores del Subject que haya podido mandar componentes
  private _itemsCarroActuales:Array<ItemCarro>=[];
  constructor() {
    // nada mas inyectar el servicio, actualizo array interno de items del servicio  
    this._itemsPedido$.subscribe(
      (itemsCarro)=>{
        this._itemsCarroActuales=itemsCarro
        ;
      }
    )
  }

  public AddItemCarro(newitem:ItemCarro) {
    // comprobar si existe antes el nuevo item en el array, si existe es que el libro ya está en el pedido
    // y habria que incrementar la cantidad
    this._itemsCarroActuales.push(newitem); // añado nuevo item al array interno
    this._itemsPedido$.next(this._itemsCarroActuales); // <--- mando array actualizado de newitems al observable
    
  }

  public GetItemsCarro():Observable<ItemCarro[]>{
    return this._itemsPedido$.asObservable();
  }
}

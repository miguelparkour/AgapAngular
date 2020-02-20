import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from "rxjs";
import { Libro } from '../modelos/libro';
import { ItemCarro } from '../modelos/itemsCarro';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ControlpedidoService {
  //  subject para enviar-recibir itemscarro desde componentes
  private _itemsPedido:BehaviorSubject<ItemCarro[]>=new BehaviorSubject<ItemCarro[]>([]);
  public _itemsPedido$=this._itemsPedido.asObservable();
  
  constructor(private _storage:LocalstorageService) {}

  // guardamos el libro nuevo, o lo restamos si hubiera resta y devolvemos el valor del pedido
  public actualizarPedido(libroComprar:Libro,operacion?:string):number {
    // recuperamos del subject el pedido
    let arrayItems:ItemCarro[]=[]
    this._itemsPedido$.subscribe(
      (data:ItemCarro[])=>{
        arrayItems=data
      }
    );
    // averiguamos si el libro ya está en el pedido
    let indice:number=-1;
    arrayItems.forEach((element,index) =>{
      if(element.libroItem.ISBN==libroComprar.ISBN) indice=index
    });
    // si si que está lo modificamos, ya sea para restar anular o sumar
    if (indice>=0) {
      if (operacion=='resta'&&arrayItems[indice].cantidad!=1) {
        arrayItems[indice].cantidad--;
      }else if((arrayItems[indice].cantidad===1&&operacion=='resta') || // que tambien anule si es la resta del ultimo libro
                operacion=='anula'){ 
        arrayItems.splice( indice, 1 );
      } else { // sumar
        arrayItems[indice].cantidad++;
      }
    }
    // si no está lo añadimos 
    else if(indice==-1&&!operacion) {
      arrayItems.push(new ItemCarro(libroComprar,1));
    }
    // devolvemos el pedido al subject
    this._itemsPedido.next(arrayItems);
    // guardamos el pedido en el storage para comprobaciones
    this._storage.AlmacenarStorage('items',arrayItems);

    //devolvemos el precio actual del pedido
    let precio:number=0;
    arrayItems.forEach(
      (element)=>{
        precio+=Math.round((element.cantidad*element.libroItem.Precio) * 100) / 100;
      }
    )
    return precio;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Libro } from 'src/app/modelos/libro';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { ControlpedidoService } from 'src/app/servicios/controlpedido.service';
import { IfStmt } from '@angular/compiler';
import { ItemCarro } from 'src/app/modelos/itemsCarro';


@Component({
  selector: 'app-minilibro',
  templateUrl: '../../vistas/Tienda/minilibro.component.html',
  styleUrls: ['../../vistas/css/minilibro.component.css']
})
export class MinilibroComponent implements OnInit {

  @Input()libroApintar:Libro;
  private _itemsPedidoActual:Array<[Libro,number]>;

  constructor(private _router:Router, 
             private _storage:LocalstorageService,
             private _gestorPedido: ControlpedidoService) { 

    try {
        this._itemsPedidoActual=this._storage.RecuperarStorage("items");
    } catch (error) {
        this._itemsPedidoActual=[];
    }              
             }

  ngOnInit() {
  }
  ComprarLibro(libroComprar:Libro){
    //  añadir el libro al pedido actual usando el servicio
    let _item=new ItemCarro();
    _item.cantidad=1;
    _item.libroItem=libroComprar;
    this._gestorPedido.AddItemCarro(_item);
    //  podria almacenarlo en el storage para ver si va ok
    this._gestorPedido.GetItemsCarro().subscribe(
      (items:ItemCarro[])=>{
        this._storage.AlmacenarStorage('items',items);
      }
    )
    // redirijo a la vista pedido para mostrar el nuevo libro a comprar
    this._router.navigate(['Tienda/Pedido'])
  }

  /* cargarEnStorage(libro:Libro):void{
    //almaceno en el storage el libro para q despues lo recupere
    //la vista de detalles
    console.log("libro q se almacena en el localstorage",libro);
    this._storage.AlmacenarStorage("libro",libro);
    
    //localStorage.setItem("libro",JSON.stringify(libro));
    //this._router.navigate(['/DetalleLibro',libro.ISBN["NumberLong"]]);
  }

  ComprarLibro(libroComprar:Libro){
    //añadimos libro al observable del servicio del control de pedido...
    console.log("comprando libro...",libroComprar);

    this._gestorPedido.AddItemCarro([libroComprar,1]);
    
    //lo refrescamos en el storage..
    this._gestorPedido.GetItemsCart().subscribe(
      (tuplas: Array<[Libro,number]>) => {
          console.log("libros en service", tuplas);
          this._storage.AlmacenarStorage("items",tuplas);
      }
    );
    
    this._router.navigate(['/Tienda/Pedido'])

  } */

}

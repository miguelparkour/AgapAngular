import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { Pedido } from 'src/app/modelos/pedido';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detallepedido',
  templateUrl: '../../vistas/ZonaCliente/detallepedido.component.html',
  styleUrls: ['../../vistas/css/detallepedido.component.css']
})
export class DetallepedidoComponent implements OnInit {

  public id:string='';
  public pedido:Pedido=new Pedido();

  constructor(private _rutaActual: ActivatedRoute,
              private _storage: LocalstorageService,
              private location: Location) { }

  ngOnInit() {
    // leemos el id del pedido en la ruta
    this._rutaActual.params.subscribe(
      (params)=>{
        this.id=params['idPedido']
      }
    );
    // recuperamos el pedido con el id que tenemos
    this._storage.RecuperarStorage('cliente').misPedidos.forEach(element => {
      if (element.Id===this.id) {
        this.pedido=element as Pedido;
      }
    });
    console.log(this.pedido);
  }

  back(){
    // volver a la página anterior
    this.location.back();
  }

}

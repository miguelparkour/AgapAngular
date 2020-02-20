import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/modelos/pedido';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { Cliente } from 'src/app/modelos/cliente';

@Component({
  selector: 'app-mis-compras',
  templateUrl: '../../vistas/ZonaCliente/mis-compras.component.html',
  styleUrls: ['../../vistas/css/mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  public pedidos:Pedido[]=[];
  constructor(public _storage:LocalstorageService) { }

  ngOnInit() {
    this.pedidos=this._storage.RecuperarStorage('cliente').misPedidos;
  }

}

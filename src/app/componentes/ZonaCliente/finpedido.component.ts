import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { Pedido } from 'src/app/modelos/pedido';
import { Direccion } from 'src/app/modelos/direccion';
import { Cliente } from 'src/app/modelos/cliente';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';

@Component({
  selector: 'app-finpedido',
  templateUrl: '../../vistas/ZonaCliente/finpedido.component.html',
  styleUrls: ['../../vistas/css/finpedido.component.css']
})
export class FinpedidoComponent implements OnInit {

  public id:string='';
  public pedido:Pedido=new Pedido();
  public direcciones:Direccion[]=[];
  public cliente:Cliente=new Cliente();

  constructor(private _rutaActual: ActivatedRoute,
              private _storage:LocalstorageService,
              private _auth:AuthFirebaseService) { }

  ngOnInit() {
    // leemos el id del pedido en la ruta
    this._rutaActual.params.subscribe(
      (params)=>{
        this.id=params['idPedido']
      }
    );
    // recuperamos el cliente del storage
    this.cliente=this._storage.RecuperarStorage('cliente') as Cliente;

    // almacenamos en variable publica sus direcciones
    this.direcciones=this.cliente.direcciones;

    // buscamos el id del pedido entre el array de pedidos del cliente
    this.cliente.misPedidos.forEach(element => {
      if (element.Id==this.id) {
        this.pedido=element as Pedido;
      }
    });
  }
  confirmarCompra(){
    this._auth.ActualizarCliente(this.cliente)
  }

}

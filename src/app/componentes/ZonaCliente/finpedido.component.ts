import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { Pedido } from 'src/app/modelos/pedido';
import { Direccion } from 'src/app/modelos/direccion';
import { Cliente } from 'src/app/modelos/cliente';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlpedidoService } from 'src/app/servicios/controlpedido.service';

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
  public formDireccion:FormGroup;

  constructor(private _rutaActual: ActivatedRoute,
              private _router:Router,
              private _storage:LocalstorageService,
              private _auth:AuthFirebaseService,
              private _gestorpedido:ControlpedidoService) { 
                this.formDireccion=new FormGroup({
                  // este input recoje el indice de la direccion del array de 
                  // de direcciones del cliente
                  direccionEnvio:new FormControl('',[Validators.required]),
                })
              }

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
    // recojo la direccion del input radio y la meto en la direccion del pedido
    let direccionInput:Direccion=this.cliente.direcciones[this.formDireccion.controls['direccionEnvio'].value]
    this.pedido.DireccionEnvio=direccionInput;
    //simulo el accedo a bd mediante el storage
    // this._storage.AlmacenarStorage('cliente',this.cliente);
    this._auth.ActualizarCliente(this.cliente);

    // despues de subir el cliente con el pedido a la bd vaciamos el subject
    this._gestorpedido.finalizarPedido();

    // redirigimos a MisCompras para ver el pedido
    this._router.navigate(['/Cliente/MiPanel/MisCompras'])
  }

}

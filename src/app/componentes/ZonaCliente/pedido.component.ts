import { Component, OnInit } from '@angular/core';
import { ItemCarro } from 'src/app/modelos/itemsCarro';
import { ControlpedidoService } from 'src/app/servicios/controlpedido.service';
import { Libro } from 'src/app/modelos/libro';
import { Pedido } from 'src/app/modelos/pedido';
import { Cliente } from 'src/app/modelos/cliente';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: '../../vistas/ZonaCliente/pedido.component.html',
  styleUrls: ['../../vistas/css/pedido.component.css']
})
export class PedidoComponent implements OnInit {
  public SubTotalPedido:number=0;
  public GastosEnvio:number=0;
  public TipoGastosEnvio:string=''
  public TotalPedido:number=0;
  public itemsCarro:ItemCarro[]=[];
  public pedido:Pedido=new Pedido();
  public math=Math;// hago esto para poder usar Math en la vista

  constructor(private _gestorpedido:ControlpedidoService,
              private _storage:LocalstorageService,
              private _router: Router) { 
  }

  ngOnInit() {
    this._gestorpedido._itemsPedido$.subscribe(
      (value)=>{
        this.itemsCarro=value;
      }
    )
    if (this.TotalPedido===0) {
      this.itemsCarro.forEach(element => {
        this.TotalPedido+=Math.round((element.cantidad*element.libroItem.Precio) * 100) / 100;
      });
    }
    this.TotalPedido+=this.GastosEnvio;
  }

  public sumarLibro(libro:Libro){
    this.TotalPedido=this._gestorpedido.actualizarPedido(libro);
  }

  public restarLibro(libro:Libro){
    this.TotalPedido=this._gestorpedido.actualizarPedido(libro,"resta");
  }
  
  public anularLibro(libro:Libro) {
    this.TotalPedido=this._gestorpedido.actualizarPedido(libro,"anula");
  }

  finalizarPedido(itemsCarro:ItemCarro[]){

    // recuperamos el cliente del storage
    let cliente:Cliente=new Cliente();
    cliente=this._storage.RecuperarStorage('cliente') as Cliente;

    // creamos y rellenamos un objeto pedido
    let pedido:Pedido=new Pedido();
    pedido.Estado='Pendiente';
    pedido.Fecha=new Date(Date.now());
    pedido.GastosEnvio=this.GastosEnvio;
    pedido.Id=Math.random().toString(36).substring(2);
    pedido.ListaElementos=itemsCarro;
    pedido.NifCliente=cliente.nif;
    pedido.TipoGastosEnvio=this.TipoGastosEnvio;
    pedido.PrecioTotal=this.TotalPedido+this.GastosEnvio;
    this.pedido=pedido;

    // guardamos el pedido en el cliente y lo subimos al storage
    if (!cliente.misPedidos){
      cliente.misPedidos=[];
    }
    cliente.misPedidos.push(pedido);
    this._storage.AlmacenarStorage('cliente',cliente);

    //enviamos al cliente a finalizar pedido
    this._router.navigate(['/Cliente/MiPanel/FinalizarPedido/'+pedido.Id])
  }

  public gastosEnvio(sitio:string) {
    this.TipoGastosEnvio=sitio;
    // no consigo hacerlo, ni con switch ni nada se me pasa una vez el
    // valor a la vista y nada más, se deja de pasar
    if (sitio=='Peninsula') {
      this.GastosEnvio=1.5;
    } else if(sitio=='Canarias'){
      this.GastosEnvio=2;
    } else{
      this.GastosEnvio=2.5; 
    }
    
    // this.TotalPedido+=this.GastosEnvio;
  }
}
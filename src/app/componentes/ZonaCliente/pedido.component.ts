import { Component, OnInit } from '@angular/core';
import { ItemCarro } from 'src/app/modelos/itemsCarro';
import { ControlpedidoService } from 'src/app/servicios/controlpedido.service';
import { Libro } from 'src/app/modelos/libro';

@Component({
  selector: 'app-pedido',
  templateUrl: '../../vistas/ZonaCliente/pedido.component.html',
  styleUrls: ['../../vistas/css/pedido.component.css']
})
export class PedidoComponent implements OnInit {
  public SubTotalPedido:number=0;
  public GastosEnvio:number=0;
  public TotalPedido:number=0;
  public itemsCarro:ItemCarro[]=[];
  public math=Math;// hago esto para poder usar Math en la vista

  constructor(private _gestorpedido:ControlpedidoService) { 
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

  public gastosEnvio(sitio:string) {
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

  ActualizaPedido(event:ItemCarro){
  }
}
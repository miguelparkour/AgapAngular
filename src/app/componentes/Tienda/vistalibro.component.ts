import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/modelos/libro';

import { RestfullfirebaseService } from "../../servicios/restfullfirebase.service";
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { ControlpedidoService } from 'src/app/servicios/controlpedido.service';

@Component({
  selector: 'app-vistalibro',
  templateUrl: '../../vistas/Tienda/vistalibro.component.html',
  styleUrls: ['../../vistas/css/vistalibro.component.css']
})
export class VistalibroComponent implements OnInit {

  public libroAMostrar:Libro=new Libro();
  constructor(private _rutaActual: ActivatedRoute,
              private _router: Router,
              private _gestorPedido:ControlpedidoService,
              private _bd:RestfullfirebaseService) { }

  ngOnInit() {
    //la variable libroAMostrar q se pasa a la vista se puede cargar:
    //  - de la BD a partir del ISBN q esta en la URL
    //  - a partir del Storage del navegador
    let id:string;
    this._rutaActual.params.subscribe(
      (params)=>{
        id=params['param'];
        this._bd.DevolverLibro(id).then(
          (libro:Libro)=>{
            this.libroAMostrar=libro;
          }
        ).catch(
          (reason)=>{
            console.log('Error: ',reason);
            this._router.navigate(['error'])
          }
        )
      }
    )
  }

  
  ComprarLibro(libroComprar:Libro){
    this._gestorPedido.actualizarPedido(libroComprar);
    // redirijo a la vista pedido para mostrar el nuevo libro a comprar
    this._router.navigate(['Cliente/MiPanel/MisPedidos'])
  }

}

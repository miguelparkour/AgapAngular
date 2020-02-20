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

    //this.libroAMostrar=JSON.parse(localStorage.getItem("libro")) as Libro;
    /* this.libroAMostrar=this._storage.RecuperarStorage("libro") as Libro;
    console.log("estamos en VistaLibro, el libro del storage vale:",this.libroAMostrar);

    if(this.libroAMostrar===null || this.libroAMostrar===undefined){
      //no existe el libro en el storage, lo recupero de la BD de firebase a partir del ISBN
      console.log("arrrrrrrrrrrg no existe en el storage");
      let _isbn:string;
      this._rutaActual.paramMap.subscribe(
            (parametros)=> {
                  _isbn=parametros.get("param");
                  console.log("el ISBN a buscar",_isbn);
                  this._rest.DevolverLibro(_isbn).subscribe(
                        (datos:Libro)=> {
                              console.log("libro desde la BD",datos);
                              this.libroAMostrar=datos
                        }
                  );
                  //hacer en el servicio REST contra firebase un metodo q pasandole el
                  // ISBN me devuelva el libro en cuestion
            }
      );
    } */
  }

  
  ComprarLibro(libroComprar:Libro){
    this._gestorPedido.actualizarPedido(libroComprar);
    // redirijo a la vista pedido para mostrar el nuevo libro a comprar
    this._router.navigate(['Cliente/MiPanel/MisPedidos'])
  }

}

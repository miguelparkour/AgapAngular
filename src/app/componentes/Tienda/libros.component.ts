import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

//...modelos...
import { Libro } from '../../modelos/libro';

//...servicios inyectados....
import { RestfullfirebaseService } from 'src/app/servicios/restfullfirebase.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-libros',
  templateUrl: '../../vistas/Tienda/libros.component.html',
  styleUrls: ['../../vistas/css/libros.component.css']
})
export class LibrosComponent implements OnInit {
  // ...tengo q recuperar de nuestra bd de firebase los libros de idMateria=0
  //y pasarselos a la vista:  libros.component.html para q los pinte

  public listaLibros:Libro[]; //<---voy a meter los libros devueltos desde la BD
  private _subscript:Subscription;

  constructor(private _miservicio: RestfullfirebaseService,
              private _rutaActiva: ActivatedRoute) { }

  ngOnInit() {
        let _idMateria:number;
        this._rutaActiva.paramMap.subscribe(
            (parametros:ParamMap)=>{
                 console.log(`los parametros de la url:  ${parametros.keys}`);
                _idMateria=+parametros.get('idMateria');

                console.log(`valor del parametro :idMateria .... ${_idMateria}`);

                this._subscript=this._miservicio.DevolverLibros(_idMateria).subscribe(
                  (libros:Libro[])=>{
                          console.log( libros);
                          this.listaLibros=libros;
      
                   },
                   (err) => console.log(`Errores al recuperar los libros: ${err}`)
                 );


            }

        );
        




  }

  ngOnDestroy(){
      this._subscript.unsubscribe();
  }

}

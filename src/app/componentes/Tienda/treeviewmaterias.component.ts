import { Component, OnInit } from '@angular/core';
import { RestfullfirebaseService } from 'src/app/servicios/restfullfirebase.service';
import { Subscription } from 'rxjs';

import { Materia } from '../../modelos/interfaces/materia';


@Component({
  selector: 'app-treeviewmaterias',
  templateUrl: '../../vistas/Tienda/treeviewmaterias.component.html',
  styleUrls: ['../../vistas/css/treeviewmaterias.component.css']
})
export class TreeviewmateriasComponent implements OnInit {
  
  public listaMaterias:Materia[]; //<--- a pintarlo en la vista
  private _subscripcion:Subscription;

  constructor(private _miservicio:RestfullfirebaseService) { }

  ngOnInit() {
      //utilizando el servicio relleno variable listaMaterias
      this._subscripcion = this._miservicio
                               .DevolverMaterias(0)
                               .subscribe(
                                (datos:Materia[])=>{
                                  this.listaMaterias=datos;
                                },
                                (err)=>{
                                  console.log(err);
                                }

      );
      
  }

  ngOnDestroy(){
      this._subscripcion.unsubscribe();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Libro } from 'src/app/modelos/libro';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';

@Component({
  selector: 'app-minilibro',
  templateUrl: '../../vistas/Tienda/minilibro.component.html',
  styleUrls: ['../../vistas/css/minilibro.component.css']
})
export class MinilibroComponent implements OnInit {

  @Input()libroApintar:Libro;

  constructor(private _router:Router, 
             private _storage:LocalstorageService) { }

  ngOnInit() {
  }

  cargarEnStorage(libro:Libro):void{
    //almaceno en el storage el libro para q despues lo recupere
    //la vista de detalles
    console.log("libro q se almacena en el localstorage",libro);
    this._storage.AlmacenarStorage("libro",libro);
    
    //localStorage.setItem("libro",JSON.stringify(libro));
    //this._router.navigate(['/DetalleLibro',libro.ISBN["NumberLong"]]);
  }

}

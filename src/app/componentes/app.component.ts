import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../servicios/localstorage.service';
import { Cliente } from '../modelos/cliente';

@Component({
  selector: 'app-root',
  templateUrl: '../vistas/app.component.html',
  styleUrls: ['../vistas/css/app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AgapeaAngular';
  public cliente:Cliente=new Cliente();
  public log:boolean=false;
  constructor(private _storage:LocalstorageService){
    
  }
  ngOnInit(): void {
    this.cliente=this._storage.RecuperarStorage('cliente');
    if (this._storage.RecuperarStorage('cliente')) {
      this.log=true
    }
  }
}

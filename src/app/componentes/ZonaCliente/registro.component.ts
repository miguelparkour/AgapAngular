import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Provincia } from 'src/app/modelos/provincia';
import { RestfullfirebaseService } from 'src/app/servicios/restfullfirebase.service';
import { Subscription } from 'rxjs';
import { Municipio } from 'src/app/modelos/municipio';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { Cliente } from 'src/app/modelos/cliente';
import { CuentaCliente } from 'src/app/modelos/cuentaCliente';
import { Direccion } from 'src/app/modelos/direccion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: '../../vistas/ZonaCliente/registro.component.html',
  styleUrls: ['../../vistas/css/registro.component.css']
})
export class RegistroComponent implements OnInit,OnDestroy {

  public formRegistro:FormGroup;
  public listaProvincias:Provincia[]=[];
  public listaMunicipios:Municipio[]=[];
  
  private _subscriptores:Subscription[]=[];

  constructor(private _rest:RestfullfirebaseService,
              private _servAuth: AuthFirebaseService,
              private _router: Router) {

    this.formRegistro=new FormGroup(
        {
            usernick: new FormControl('',[Validators.required]),
            password: new FormControl('',[
                                          Validators.required
                                          //,Validators.pattern(_patronPassw)
                                         ]),
            repassword: new FormControl('',[
                                          /* Validators.required */
                                          //,Validators.pattern(_patronPassw)
                                        ]),
            nombre: new FormControl('',[/* Validators.required */]),
            apellidos: new FormControl('',[/* Validators.required */]),
            email: new FormControl('',[
                                      Validators.required,
                                      Validators.email
                                    ]),
            nif: new FormControl('',[
                                    /* Validators.required */,
                                    Validators.pattern("^[0-9]{8}[A-Za-z]$")
                                    ]),
            telefono: new FormControl('',[/* Validators.required */]),
            direccion: new FormControl('',[Validators.required]),
            provincia: new FormControl('',[Validators.required]),
            municipio: new FormControl('',[Validators.required]),
            cp: new FormControl('',[
                                    Validators.required,
                                    Validators.pattern("^[0-9]{5}$")])
        }
    );
   }

  ngOnInit() {
    //recupero del servicio contra FIREBASE la coleccion de
    // provincias
    if (this.listaMunicipios.length==0) {
      this.formRegistro.controls['municipio'].disable();
    }
    let _subsProv:Subscription=this._rest
                                   .DevolverProvincias()
                                   .subscribe(
                                     (datos:Provincia[])=>{
                                      this.listaProvincias=datos;
                                     }
                                   );
    this._subscriptores.push(_subsProv);
  }

  ngOnDestroy(){
    this._subscriptores.forEach( (subs)=> subs.unsubscribe());
  }

  //se disapara cada vez q hay un "change" en el select de provs
  cargarMunicipios(){
    let _codpro:number=parseInt(this.formRegistro.controls['provincia'].value);
    if(_codpro!=0){//opcion distinta de "Elige una opcion..." de select provs  
      this.formRegistro.controls['municipio'].enable();
      let _subsMun:Subscription=this._rest
                                    .DevolverMunicipios(_codpro)
                                    .subscribe(
                                      (datos:Municipio[])=> {
                                        this.listaMunicipios=datos;
                                        this.formRegistro.controls['municipio'].enable();
                                      },
                                      (error)=>{
                                        console.log(error);
                                      }
                                    );
      this._subscriptores.push(_subsMun);
    }
    else{
      this.formRegistro.controls['municipio'].disable()
      this.formRegistro.controls['municipio'].reset();
      this.listaMunicipios=[]; 
    }

  }

  registrarUsuario(){
        // console.log(this.formRegistro);

        let _nuevoCliente:Cliente=new Cliente();
        _nuevoCliente.nombre=this.formRegistro.controls['nombre'].value;
        _nuevoCliente.apellidos=this.formRegistro.controls['apellidos'].value;
        _nuevoCliente.nif=this.formRegistro.controls['nif'].value;
        _nuevoCliente.telefono=this.formRegistro.controls['telefono'].value;
        _nuevoCliente.foto='../../../assets/images/ImgCliente.png'; // foto por defecto

        let _cuenta:CuentaCliente=new CuentaCliente();
        _cuenta.email=this.formRegistro.controls['email'].value;
        _cuenta.password=this.formRegistro.controls['password'].value;
        _cuenta.usernick=this.formRegistro.controls['usernick'].value;
        _nuevoCliente.miCuenta=_cuenta;

        let _direc:Direccion=new Direccion();
        _direc.direccion=this.formRegistro.controls['direccion'].value;
        _direc.cp=this.formRegistro.controls['cp'].value;
        _direc.provincia=this.formRegistro.controls['provincia'].value;
        _direc.municipio=this.formRegistro.controls['municipio'].value;
        _nuevoCliente.direcciones=[];
        _nuevoCliente.direcciones.push(_direc);

        this._servAuth.RegistrarCliente(_nuevoCliente).then(
          (res)=>{
            if (res) {
              this._router.navigate(['/Cliente/Login']);              
            } else {
              //sacar mensaje de error por la vista
            }
          }
        );
        
        
  }

  registroGoogle(){
    this._servAuth.RegistroGoogle();
  }
}

import { Component, OnInit} from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { CuentaCliente } from 'src/app/modelos/cuentaCliente';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miperfil',
  templateUrl: '../../vistas/ZonaCliente/miperfil.component.html',
  styleUrls: ['../../vistas/css/miperfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public formularioModificar:FormGroup;
  public cliente:Cliente;
  public campoVacio:string="";

  constructor(private _storage: LocalstorageService,
              private _auth: AuthFirebaseService,
              private afStorage: AngularFireStorage,
              private _router:Router) {
    this.cliente=this._storage.RecuperarStorage('cliente');
    this.formularioModificar=new FormGroup(
      {
        archivo: new FormControl('',[]),
        usernick: new FormControl('',[]),
        password: new FormControl('',[]),
        nombre: new FormControl('',[]),
        apellidos: new FormControl('',[]),
        nif: new FormControl('',[]),
        telefono: new FormControl('',[])
      }
    )
  }
  
  async handleFileInput(event){
    const id=Math.random().toString(36).substring(2);
    const file=event.target.files[0];
    const filePath='avatares/'+id+'.jpg';
    const ref=this.afStorage.ref(filePath);
    await this.afStorage.upload(filePath,file)
    .then(
      async a=>{
        await ref.getDownloadURL().subscribe(
          data=>{
            console.log(data);// aquí está la url de la imagen subida en task
            this.cliente.foto=data;
          }
        )
      }
    )
  }


  modificarDatos(){

    // inicializamos el cliente desde el storage
    let clienteStorage=this._storage.RecuperarStorage('cliente');

    // recogemos la los datos relativos al cliente
    let cliente:Cliente=new Cliente();
    cliente.nombre=this.formularioModificar.value.nombre;
    cliente.apellidos=this.formularioModificar.value.apellidos;
    cliente.nif=this.formularioModificar.value.nif;
    cliente.telefono=this.formularioModificar.value.telefono;
    cliente.foto=this.cliente.foto;

    // lo mismo con los parametros de la cuenta
    let cuenta:CuentaCliente=new CuentaCliente();
    cuenta.usernick=this.formularioModificar.value.usernick;
    cuenta.password=this.formularioModificar.value.password;

    // actualizamos clienteStorage con los campos con valores del formulario
    for (var prop in cliente) {
      if (cliente[prop]) {
        clienteStorage[prop]=cliente[prop];
      }
    }
    for (var prop in cuenta) { 
      if (cuenta[prop]) {
        clienteStorage.miCuenta[prop]=cuenta[prop];
      }
    }

    // simulamos la subida a firebase guardando en el storage
    console.log('lo que voy a guardar en firebase: ',clienteStorage);
    this._storage.AlmacenarStorage('cliente',clienteStorage)


    // llamamos al servicio para que actualice los datos en Firebase
    this._auth.ActualizarCliente(clienteStorage);
    
  }

  cerrarSesion(){
    this._storage.LimpiarStorage();
    this._router.navigate(['/Cliente/Login'])
  }

  ngOnInit() {
  }

}

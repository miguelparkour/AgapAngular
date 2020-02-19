import { Component, OnInit} from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { CuentaCliente } from 'src/app/modelos/cuentaCliente';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-miperfil',
  templateUrl: '../../vistas/ZonaCliente/miperfil.component.html',
  styleUrls: ['../../vistas/css/miperfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public formularioModificar:FormGroup;
  public cliente:Cliente;
  public campoVacio:string="";
  public foto;

  constructor(private _storage: LocalstorageService,
              private _auth: AuthFirebaseService,
              private afStorage: AngularFireStorage) {
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
  
  handleFileInput(event){
    const id=Math.random().toString(36).substring(2);
    const file=event.target.files[0];
    const filePath='avatares/'+id+'.jpg';
    const ref=this.afStorage.ref(filePath);
    const task= this.afStorage.upload(filePath,file)
    .then(
      async a=>{
        await ref.getDownloadURL().subscribe(
          data=>{
            console.log(data);// aquí está la url de la imagen subida en task
          }
        )
      }
    )
  }


  modificarDatos(){

    console.log(typeof(this.formularioModificar.value.foto));
    // inicializamos el cliente desde el storage
    let clienteStorage=this._storage.RecuperarStorage('cliente');

    // recogemos la los datos relativos al cliente
    let cliente:Cliente=new Cliente();
    cliente.nombre=this.formularioModificar.value.nombre;
    cliente.apellidos=this.formularioModificar.value.apellidos;
    cliente.nif=this.formularioModificar.value.nif;
    cliente.telefono=this.formularioModificar.value.telefono;

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
    console.log(clienteStorage);
    // llamamos al servicio para que actualice los datos en Firebase
    //this._auth.ActualizarCliente(clienteStorage);
    
  }


  //-----metodo para actualizar datos del cliente en FireStore ----------
  grabarDatosCliente(formMiPerfil){
    
    /* let elformulario=formMiPerfil;
    console.log("la variable ngform de la vista vale...", elformulario);
    //para recuperar el valor de un campo: elformulario.controls['nombre_campo'].value
    // el valor del campo PASSWORD no esta mapeado contra ninguna propiedad del modelo
    //tengo q acceder directamente al elemento del DOM con @ViewChild
    
    let _password:string=this.password.nativeElement.value;

    this._auth.ModificarDatosPefil(
      elformulario.controls['nombre'].value,
      elformulario.controls['apellidos'].value,
      _password,
      elformulario.controls['nif'].value,
      elformulario.controls['usernick'].value,
      elformulario.controls['telefono'].value      
    ); */
  }
  ngOnInit() {
  }

}

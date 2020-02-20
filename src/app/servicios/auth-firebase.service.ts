import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Cliente } from '../modelos/cliente';
import { TokenSesion } from '../modelos/tokensesion';

import {Observable,from,Subscription} from 'rxjs';
import {map,tap,concatMap,delay} from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { CuentaCliente } from '../modelos/cuentaCliente';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
 
  constructor( private _auth:AngularFireAuth,
               private _storage: LocalstorageService,
               private _db: AngularFirestore,
               private _router: Router,
               private _afStorage:AngularFireStorage){}


  RegistrarCliente(cliente:Cliente):Promise<boolean>{

    return new Promise<boolean>(
      (resolve,reject)=>{
        this._auth
        .auth
        .createUserWithEmailAndPassword(cliente.miCuenta.email,cliente.miCuenta.password)
        .then(   // si se ha creado el usuario lo intentamos meter en la base de datos
          async (value:auth.UserCredential)=>{
            //1º creamos y rellenamos el token de sesión, para guardarlo en el storage
            let _token = new TokenSesion();
            _token.email=cliente.miCuenta.email;
            _token.expiracion=(await value.user.getIdTokenResult()).claims.exp;
            _token.jwt=await value.user.getIdToken();
            this._storage.AlmacenarStorage('sesionId',_token);
            //2º Borramos la password del cliente, le añadimos el uid que le puso firebase
            delete cliente.miCuenta.password;
            cliente.userIdFirebase=value.user.uid;
            //3º Ahora sí metemos el cliente ya modificado en la base de datos
            this._db
                .collection("clientes")
                .add(JSON.parse(JSON.stringify(cliente)))
                .then(
                  (res)=>{
                    console.log("se ha insertado al cliente en la base de datos");
                    resolve(true);
                  },
                  (err)=>{
                    console.log(err);
                    resolve(false);
                  }
                )
            //4º Guardamos el cliente en el storage
            this._storage.AlmacenarStorage('cliente',cliente);
          } 
        )
        .catch( // si createUserWithEmailAndPassword falla
          (reason)=>{
            console.log("Ha ocurrido un error al crear el usuario: ",reason);
            resolve(false)
          }
        )
      }
    )
  }
  
  Login(correo:string, passw:string):Promise<boolean>{
    return new Promise<boolean>(
      (resolve)=>{ //El resolve es como el return de la promesa
        this._auth.auth.signInWithEmailAndPassword(correo,passw)
        .then(
          async (value)=>{
            // creamos el token de sesion y lo guardamos en el storage
            let _token:TokenSesion= new TokenSesion();
            _token.email=correo;
            _token.jwt=await value.user.getIdToken();
            _token.expiracion=(await value.user.getIdTokenResult()).claims.exp;
            // console.log("tokenResult: ",await value.user.getIdTokenResult());
            this._storage.AlmacenarStorage('sesionId',_token);

            // recuperamos de la base de datos el cliente que tenga la uid que nos pasa el signitwith..
            let clienteRecuperado:Cliente = null;
            await this._db
                .collection('clientes',ref => ref.where('userIdFirebase','==',value.user.uid))
                .valueChanges()
                .subscribe(
                  (datos)=>{
                    clienteRecuperado = datos[0] as Cliente;
                    // devolvemos el boolean en función de si clienteRecuperado tiene algo
                    if (clienteRecuperado){
                      this._storage.AlmacenarStorage('cliente',clienteRecuperado);
                      resolve(true);
                    } 
                    else {
                      console.log("error en recup.cliente");       
                      resolve(false);
                    }
                  }
                );
          }
        )
        .catch(
          reason=>{
            console.log("error al logear: ",reason.message);
            resolve(false);
          }
        )
      }
    )
   
  }
  private RegistroExterno(proveedor:auth.AuthProvider){
    this._auth.auth.signInWithPopup(proveedor)
    .then(
      async (value:auth.UserCredential)=>{

        // cramos el token y lo guardamos en la LocalStorage
        let _token= new TokenSesion();
        _token.email=value.user.email;
        _token.expiracion=(await value.user.getIdTokenResult()).claims.exp;
        _token.jwt=await value.user.getIdToken();
        this._storage.AlmacenarStorage('sesionId',_token);

        // creamos el cliente y le guardamos los datos que nos da Google
        let cliente:Cliente=new Cliente();
        let cuenta:CuentaCliente=new CuentaCliente()
        cuenta.usernick=value.user.displayName;
        cuenta.email=value.user.email;
        cliente.miCuenta=cuenta;
        cliente.userIdFirebase=value.user.uid;

        // lo almaceno en el storage
        this._storage.AlmacenarStorage('cliente',cliente);

        // lo guardamos en la base de datos de firebase
        this._db
            .collection("clientes")
            .add(JSON.parse(JSON.stringify(cliente)))
            .then(
              (res)=>{
                console.log("se ha insertado al cliente en la base de datos");
              },
              (err)=>{
                console.log("Error al insertar el cliente en la base de datos: ",err);
              }
            ).catch(reason=>console.log("excepcion: ",reason))
        
      }
    )
  }
  private LoginExterno(proveedor:auth.AuthProvider){
    this._auth.auth.signInWithPopup(proveedor)
    .then(
      async (value:auth.UserCredential)=>{

        // cramos el token y lo guardamos en la LocalStorage
        let _token= new TokenSesion();
        _token.email=value.user.email;
        _token.expiracion=(await value.user.getIdTokenResult()).claims.exp;
        _token.jwt=await value.user.getIdToken();
        this._storage.AlmacenarStorage('sesionId',_token);

        // recuperamos el cliente de la base de datos
        let cliente:Cliente;
        await this._db
        .collection('clientes',ref=>ref.where('userIdFirebase','==',value.user.uid))
        .valueChanges()
        .subscribe(
          (datos)=>{
            cliente = datos[0] as Cliente;
            if (cliente){
              // Almaceno el cliente en el storage
              this._storage.AlmacenarStorage('cliente',cliente);
            } 
            else {
              console.log("error en recup.cliente");       
            }
          }
        )
      }
    )

  }

  RegistroGoogle(){
    this.RegistroExterno(new auth.GoogleAuthProvider);
  }

  LoginGoogle(){
    this.LoginExterno(new auth.GoogleAuthProvider);
  }

  RegistroFacebook(){
    this.RegistroExterno(new auth.FacebookAuthProvider);
  }

  LoginFacebook(){
    this.RegistroExterno(new auth.FacebookAuthProvider);
  }

  RegistroTwitter(){
    // no he habilitado Twitter en firebase como Proveedor de inicio de sesión
    // this.RegistroExterno(new auth.TwitterAuthProvider);
  }

  LoginTwitter(){
    // no he habilitado Twitter en firebase como Proveedor de inicio de sesión
    // this.RegistroExterno(new auth.TwitterAuthProvider);
  }


  async ActualizarCliente(cliente){

    if (cliente.miCuenta.password) { // hay password para actualizar 
      await this._auth
          .auth
          .currentUser
          .updatePassword(cliente.miCuenta.password)
          .then(
            resolve=>delete cliente.miCuenta.password
          )
    }
      //actualizamos otros datos del cliente
      
      // promesa que va a contener el id del cliente a modificar
      new Promise<string>(
        (resolve,reject)=>{
          this._db.collection('clientes',ref=>ref.where('miCuenta.email','==',cliente.miCuenta.email).limit(1))
          .snapshotChanges()// aquí recibimos los datos del usuario y los metadatos (para obtener el id)
          .subscribe(
            (value)=>{
              resolve(value[0].payload.doc.id);
            },
            (error)=>{
              console.log("error: ",error);
            }
          )
        }
      )
      .then( // ahora que ya tenemos el id actualizamos el cliente
        (value)=>{
          this._db
              .collection('clientes')
              .doc(value)
              .set(cliente)
              .then( // si todo ha salido bien lo guardamos en el storage
                ()=>{
                  this._storage.AlmacenarStorage('cliente',cliente);
                }
              )
              .catch(reason=>console.log("Excepcion: ",reason))
        }
      );
  }
}
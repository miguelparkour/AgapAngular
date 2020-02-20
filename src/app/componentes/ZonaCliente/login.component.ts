import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/servicios/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: '../../vistas/ZonaCliente/login.component.html',
  styleUrls: ['../../vistas/css/login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  public formlogin: FormGroup;

  constructor(private _auth:AuthFirebaseService,
              private _router:Router,
              private _storage:LocalstorageService ) {
      //construimos el formulario de la vista....
      this.formlogin=new FormGroup({
          email: new FormControl('',[Validators.email,Validators.required]), //se mapea contra input name="email"
          password: new FormControl('',[Validators.required,Validators.minLength(6)]) //se mapea contra input name="password"
      });
   }
   
  async Login(){
    //ya recibimos datos validados del formulario...
    let _email:string=this.formlogin.controls['email'].value;
    let _passw:string=this.formlogin.controls['password'].value;
    let log:boolean = await this._auth.Login(_email,_passw);
    if (log) {
      this._router.navigate(['/Cliente/MiPanel/MiPerfil']);
    }
  }     
    

  LoginGoogle(){
    this._auth.LoginGoogle();
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}

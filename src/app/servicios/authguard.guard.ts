import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  
  constructor(private _storage:LocalstorageService,
              private _router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let _token=this._storage.RecuperarStorage('sesionId');
    if(_token){
      let horaToken=new Date(_token.expiracion);
      let horaAhora=new Date(Date.now());
      // comparamos la hora actual con la de expiracion del token
       if(horaToken<horaAhora){
         console.log("Vaya! parece que tu sesión a caducado, por favor vuelve a registrarte");
         this._storage.LimpiarStorage();
         this._router.navigate(['/Cliente/Login']);
       }
        return true;
    }else{
      console.log("Debes registrarte para poder entrar en la aplicacion");
      this._router.navigate(['/Cliente/Login']);
    }      
  }
  
}

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
      let horaActual = Date.now();
      // comparamos la hora actual con la de expiracion del token
       if(_token.expiracion>horaActual){
         this._storage.LimpiarStorage();
         this._router.navigate(['/Cliente/Login']);
       }
        return true;
    }else{
        this._router.navigate(['/Cliente/Login']);
    }      
  }
  
}

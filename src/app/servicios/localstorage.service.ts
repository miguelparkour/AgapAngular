import { Injectable } from '@angular/core';
import { IStorage } from '../modelos/interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService implements IStorage {
  constructor() { }

  AlmacenarStorage(clave: string, valor: any): void {
    localStorage.setItem(clave,JSON.stringify(valor));
  }
  RecuperarStorage(clave: string):any {
    return JSON.parse(localStorage.getItem(clave));
  }
  BorrarStorage(clave: string): void {
    localStorage.removeItem(clave);
  }
  LimpiarStorage(): void {
    localStorage.clear();
  }

}

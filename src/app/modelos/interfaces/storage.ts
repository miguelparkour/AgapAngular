export interface IStorage{
    AlmacenarStorage(clave:string,valor:any):void;
    RecuperarStorage(clave:string):any;
    BorrarStorage(clave:string):void;
    LimpiarStorage():void;
}
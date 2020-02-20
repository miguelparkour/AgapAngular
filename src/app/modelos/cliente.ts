import {Direccion} from './direccion';
import {CuentaCliente} from './cuentaCliente';
import {Pedido} from './pedido';

export class Cliente {
    public nombre:string;
    public apellidos:string;
    public nif:string;
    public telefono:string;
    public direcciones:Array<Direccion>;
    public miCuenta:CuentaCliente;
    public misPedidos:Array<Pedido>;
    public userIdFirebase:string;
    public foto:string;
}
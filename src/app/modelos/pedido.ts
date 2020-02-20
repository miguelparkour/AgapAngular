import { ItemCarro } from './itemsCarro';
import { Direccion } from './direccion';

export class Pedido {
    public Id:string;
    public NifCliente:string;
    public Fecha:Date;
    public Estado:string;
    public TipoGastosEnvio:string;
    public GastosEnvio:number;
    public ListaElementos:ItemCarro[];
    public PrecioSubTotal:number;
    public PrecioTotal:number;
    public DireccionEnvio:Direccion;

    /* public CalcularTotalPedido():number {
        let _subtotal:number=0;
        let _gastosEnv:number=0;
        this.ListaElementosPedido.forEach(
            (tupla:[Libro,number]) => {
                    _subtotal+=(tupla[0].Precio*tupla[1]);
            }
        );
        this.SubTotalPedido=_subtotal;
        switch (this.TipoGastosEnvio) {
            case "PeninsulaBaleares":
                _gastosEnv=1,5;
                break;
            case "IslasCanarias":
                _gastosEnv=2;
            default:
                _gastosEnv=2,5;
                break;
        }
        this.GastosEnvio=_gastosEnv;
        this.TotalPedido = this.SubTotalPedido + this.GastosEnvio;
        
        return this.TotalPedido;
    } */
}
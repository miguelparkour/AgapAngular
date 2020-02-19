import {Libro} from './libro';

export class Pedido {
    public IdPedido:string;
    public NifCliente:string;
    public FechaPedido:Date;
    public EstadoPedido:string;
    public TipoGastosEnvio:string;
    public GastosEnvio:number;
    public ListaElementosPedido:Array<[Libro,number]>;
    public SubTotalPedido:number;
    public TotalPedido:number;

    public CalcularTotalPedido():number {
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
    }
}
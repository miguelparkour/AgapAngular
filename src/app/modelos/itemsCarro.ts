import { Libro } from './libro';

export class ItemCarro{
    public libroItem:Libro;
    public cantidad:number;
    constructor(libro:Libro,cantidad:number){
        this.cantidad=cantidad;
        this.libroItem=libro;
    }
}
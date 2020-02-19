export class Libro {
    public Titulo: string;
    public Editorial: string;
    public Autor: string;
    public ISBN: string;
    public ISBN13: string;
    public NumeroPaginas: number;
    public Precio: number;
    public IdMateria: number;
    public Descripcion?: string;
    public FicheroImagen?: string;

    constructor(tit:string,
                edi:string,
                aut:string,
                isb:string,
                isb13:string,
                numpag:number,
                pre:number,
                idm:number,
                desc?:string,
                fich?:string) {
        
                    this.Titulo=tit;
                    this.Autor=aut;
                    this.Editorial=edi;
                    this.ISBN=isb;
                    this.ISBN13=isb13;
                    this.NumeroPaginas=numpag;
                    this.Precio=pre;
                    this.IdMateria=idm;
                    if(desc !== "" || desc !== null){
                        this.Descripcion=desc;
                    }
                    if(fich !== "" || fich !== null){
                        this.FicheroImagen=fich;                        
                    }

                    
    }
    /*
    private _titulo:string;

    
    public get Titulo() : string {
        return this._titulo;
    }
    
    public set Titulo(value : string) {
        this._titulo = value;
    }
    */

    
    


}
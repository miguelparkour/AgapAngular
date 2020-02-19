export class Materia {

    public IdMateria:number;
    public IdMateriaPadre:number;
    public NombreMateria:string;
    public _id:Object;

    constructor(IdMateria:number,
                IdMateriaPadre:number,
                NombreMateria:string,
                _id:Object) {

        this.IdMateria=IdMateria;
        this.IdMateriaPadre=IdMateriaPadre;
        this.NombreMateria=NombreMateria;
        this._id=_id;
    }
}
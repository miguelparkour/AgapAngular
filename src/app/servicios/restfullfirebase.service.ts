import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map,filter,take	} from 'rxjs/operators';

//import { AngularFirestore } from '@angular/fire/firestore';


import { Materia } from '../modelos/interfaces/materia';
import { Libro } from '../modelos/libro';
import { AngularFirestore } from '@angular/fire/firestore';
import { Provincia } from '../modelos/provincia';
import { Municipio } from '../modelos/municipio';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class RestfullfirebaseService {
  
  constructor(private _db:AngularFirestore) {}

  DevolverProvincias():Observable<Provincia[]> {
    return this._db
               .collection<Provincia>('provincias')
               .valueChanges();
  }

  DevolverMunicipios(codpro:number):Observable<Municipio[]>{
    return this._db
              .collection<Municipio>(
                              'municipios',
                              (ref)=> ref.where('CodPro','==',codpro)
                            )
              .valueChanges();
  }

  DevolverMaterias(idMateria:number):Observable<Materia[]>{
    return this._db
              .collection<Materia>(
                        'materias',
                        (ref)=>ref.where('IdMateriaPadre','==',idMateria)
                        )
              .valueChanges();
  }

  DevolverLibros(idMateria:number):Observable<Libro[]>{
   return this._db
              .collection<Libro>(
                      'libros',
                      (ref)=>ref.where('IdMateria','==',idMateria)
                    )
              .valueChanges();
  }

  DevolverLibro(isbn:string):Promise<Libro>{
    // cambio el isbn de string a number
    let id:number=+isbn
    return new Promise<Libro>(
      (resolve,reject)=>{
        this._db.collection('libros',ref=>ref.where('ISBN','==',id))
        .valueChanges()
        .subscribe(
          (data)=>{
            let libro:Libro=data[0] as Libro;
            resolve(libro);
          }
        )
      }
    )
  }
}
  /*
  //codigo para hacer llamadas al servicio firebase
  //como van a ser llamadas REST, necesito el modulo HttpClient de Angular
  private _urlFireBase:string='https://agapea-8508a.firebaseio.com/';
  
  //como lanzar querys select contra firebase pasando parametros a la URL:
  //https://firebase.google.com/docs/database/rest/retrieve-data#section-rest-filtering


  constructor(private _http:HttpClient) { }

  //public DevolverMaterias(idMateria:number):Observable<Materia[]>{
      //usando la variable _http (de tipo HttpClient) tengo q hacer llamada a firebase
      //a esta url: _urlFireBase + 'materias.json' y hacer filtro por idMateria
      
      // return this._http
      //           .get<Materia[]>( this._urlFireBase + 'materias.json')
      //           .pipe(
      //                 map( 
      //                   (datos:Materia[]) => datos
      //                                       .filter( 
      //                                               (el:Materia) => el.IdMateriaPadre===idMateria 
      //                                          ) //cierre filter
                        
      //               ) //cierre map
      //           );
      
     //return this._firebase.collection<Materia>('materias', tablamaterias=>tablamaterias.where('IdMateriaPadre','==',idMateria)).valueChanges();
  // }

  public DevolverLibros(idMateria:number):Observable<Libro[]>{
    
      return this._http
                 .get<Libro[]>( this._urlFireBase + 'libros.json')
                 .pipe(
                        map( 
                              (libros:Libro[]) => libros.filter( 
                                                                  (libro:Libro) => libro.IdMateria===idMateria
                                                                 ) 
                           )

                 );
      
     //return this._firebase.collection<Libro>('libros', tablalibros=>tablalibros.where('IdMateria','==',idMateria)).valueChanges();

  }

  public DevolverLibro(isbn:string):Observable<Libro>{
    //parametros a pasar a la URL para filtrar libros por ISBN:
    //  libros.json?orderBy="ISBN"&startAt=72229179&limitToFirst=1
    //  ----------- --------------- ---------------- --------------  
    //   coleccion   ordenar por        comenzar a mostrar  de todos los mostrados 
    //              campo a filtrar     resultados por ese  coges el primero
    //                                  valor
    return this._http
                .get<Libro>(this._urlFireBase + 'libros.json?orderBy="ISBN"&startAt=' + isbn +'&limitToFirst=1')
                .pipe(
                  map( (datoRecuperado)=> datoRecuperado[Object.keys(datoRecuperado)[0]] )
                );
    //return this._firebase.collection<Libro>('libros',tablalibros=>tablalibros.where('ISBN','==',isbn)).valueChanges();

  }
}
*/
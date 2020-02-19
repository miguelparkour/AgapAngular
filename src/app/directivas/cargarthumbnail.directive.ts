import { Directive, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appCargarthumbnail]'
})
export class CargarthumbnailDirective {
  //el fin de la directiva al estar incrustada sobre un input type="file"
  //es interceptar eventos "change" del mismo, seleccionar la imagen del input y
  //pintarla en el tag <img src...> q tiene en su interior

  constructor(private _domAccess:Renderer2) { }

  @HostListener('change',['$event']) change(evt:any){
      //cada vez q se produzca el evento change sobre el input, se ejecuta este metodo por
      //la directiva....en el parametro evt <--- se recoge el "evento: $event" del input file
      let _ficheroEscogido=evt.target.files[0];
      console.log("fichero escogido....",_ficheroEscogido);

  }

}

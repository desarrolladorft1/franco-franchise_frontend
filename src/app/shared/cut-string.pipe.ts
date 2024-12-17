import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cutString'
})
export class CutStringPipe implements PipeTransform {

  transform(cadena: string, limit: number = 30, cortar: boolean = true): string {
    let cadenaCortada: string = cadena;
    
    if(cortar){
        if(cadenaCortada.length > limit){
            cadenaCortada = cadena.slice( 0 , limit ).concat('...');
        }
    }

    return cadenaCortada;
  }

}

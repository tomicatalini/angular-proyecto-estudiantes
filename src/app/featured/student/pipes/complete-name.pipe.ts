import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../model/student';

@Pipe({
  name: 'completeName'
})
export class CompleteNamePipe implements PipeTransform {

  transform(value: Student, ...args: string[]): unknown {
    let separador: string = '';

    if(args.length > 0){
      separador = args[0];
    }

    return `${value.name}${separador} ${value.surname}`;
  }

}

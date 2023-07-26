import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formControlError'
})
export class FormControlErrorPipe implements PipeTransform {

  transform(err: KeyValue<string, any>, ...args: string[]): string {
    const genericError: string = 'Campo Invalido...';
    let error: Record<string, string> = {
      required: `El campo ${args[0]} es obligatorio.`,
      minlength: `El campo requiere un mínimo de ${err.value.requiredLength} caractéres. Se ingreron ${err.value.actualLength}`,
      maxlength: `El campo requiere un máximo de ${err.value.requiredLength} caractéres. Se ingreron ${err.value.actualLength}`,
      email: `El Correo Electrónico ingresado es incorrecto.`
    };
    return error[err.key] ? error[err.key] : genericError;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
export type Gender = 'Masculino' | 'Femenino'
@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(gender: string): Gender {

    const m: Gender = 'Masculino';
    const f: Gender = 'Femenino';


    return gender.toLowerCase()  == 'm' ? m : f;
  }

}

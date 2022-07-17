import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cerat'
})
export class CeratPipe implements PipeTransform {

  transform(value: string,): string {
    let Year = value.substring(0, 9);
    let time = value.substring(11, 16)

    let FullDate =   Year + ' at '  + time ;
    return FullDate;
  }

}

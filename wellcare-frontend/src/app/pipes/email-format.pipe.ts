import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailFormat'
})
export class EmailFormatPipe implements PipeTransform {
  transform(value: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return '';
    }
    return value.toLowerCase();
  }
}
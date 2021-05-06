import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeUriString',
})
export class EncodeUriStringPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const modeStr = value.split(' ').join('-');
    const encode = encodeURIComponent(modeStr);

    return encode;
  }
}

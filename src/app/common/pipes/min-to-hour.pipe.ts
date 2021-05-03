import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minToHour',
})
export class MinToHourPipe implements PipeTransform {
  transform(mins: number | undefined): string {
    if (!mins) {
      return '';
    }

    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;

    return `${hours}h ${minutes}min`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preview'
})
export class PreviewPipe implements PipeTransform {

  transform(value: string, ...args): string {

    if (value.length >= 100) {
      const short = value.substring(0, 70) + "...";
      return short;
    } else {
      return value;
    }
  }
}

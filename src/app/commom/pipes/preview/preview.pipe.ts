import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preview'
})
export class PreviewPipe implements PipeTransform {

  transform(value: string, ...args): string {
    const short = value.substring(0, 100) + "...";
    return short;
  }

}

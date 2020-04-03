import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'humanReadable',
})
export class HumanReadablePipe extends DecimalPipe implements PipeTransform {

  public transform(value: number): string {
    if(value < 1024) {
      return `${ value }B`;
    } else if(value/1024 < 1024) {
      return `${ super.transform(value/1024, '1.0-2') }KB`;
    } else if(value/1024/1024 < 1024) {
      return `${ super.transform(value/1024/1024, '1.0-2') }MB`;
    } else if(value/1024/1024/1024 < 1024) {
      return `${ super.transform(value/1024/1024/1024, '1.0-2') }GB`;
    } else {
      return `${ super.transform(value/1024/1024/1024/1024, '1.0-2') }TB`;
    }
  }

}

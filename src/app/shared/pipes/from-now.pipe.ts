import moment from 'moment';
import 'moment/locale/zh-cn';
import { Pipe, PipeTransform } from '@angular/core';

moment.locale('zh-cn');

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  public transform(value: Date): string {
    // TODO: 使用更人性化的显示方案
    return moment(value).fromNow();
  }

}

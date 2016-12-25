import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'moment'})
export class Moment implements PipeTransform {
  transform(value,param?): string {
      moment.locale('zh-cn');
      // let m = ;
      let ans:any;
      switch (param)
      {
        //计算时间差，1小时之前，1天之前等等
        case "fromnow":  
          ans = moment(value).fromNow();
          break;
        //自动显示，<25天，显示时间差,主要用在了主界面上
        case "auto":
          let days = moment(new Date()).diff(moment(value),"days");
          ans = days<25 ? moment(value).fromNow() : moment(value).format("YYYY/MM/DD");
          break;
        case "date":
          ans = moment(value).format("YYYY/MM/DD");
          break;
        case "long":
        ans = moment(value).format("YYYY/MM/DD HH:mm:ss");
        break;
        case "short":
        ans = moment(value).format("YY/M/D H:m:s");
        break;
        default:
          console.error('moment pipe input illegal.',value);
          ans = value;
      }
      return ans;
      
      
  }
}
import { Pipe, PipeTransform } from '@angular/core';
// use   <h2>{{p.author.loginname | testpipe : 2}}</h2>
@Pipe({name: 'topictab'})
export class TopicTab implements PipeTransform {
  transform(value): string {
      let ans='';
      let ch = ['分享','招聘','求助','精华','全部'];
      let en = ['share','job','ask','good','all'];
      if(en.indexOf(value)>=0){
          ans = ch[en.indexOf(value)];
      }else{
          ans =ch[0];
      }
      return ans;
  }
}

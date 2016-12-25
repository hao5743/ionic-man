import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
// use   <h2>{{p.author.loginname | testpipe : 2}}</h2>
@Pipe({name: 'topictab'})
export class TopicTab implements PipeTransform {
  transform(value): string {
      let ch = ['分享','招聘','求助','精华','全部'];
      let en = ['share','job','ask','good','all'];
      return ch[en.indexOf(value)];
  }
}
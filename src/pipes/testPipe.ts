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
@Pipe({name: 'testpipe'})
export class TestPipe implements PipeTransform {
  transform(value, age): string {
    return 'hello pipe'+age;
  }
}
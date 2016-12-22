import {Injectable} from '@angular/core';
@Injectable()
export class Config {
  public mode = 'dev'; //dev or release
  public hostURL = 'https://cnodejs.org/api/v1';
  public pageLimit = 15;
  constructor() { }
}

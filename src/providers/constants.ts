import {Injectable} from '@angular/core';
/**
 * 这里存放全局用到的常量
 * 全是静态成员，请使用 Constants.DRAFTS 直接调用
 */
@Injectable()
export class Constants {
  
  static DRAFTS = "DRAFTS";
  static ACCESSTOKEN = "ACCESSTOKEN";
  static LOGINUSER = "LOGINUSER";
  static LOGINUSERWITHID = 'LOGINUSERWITHID';


  constructor() { }
}

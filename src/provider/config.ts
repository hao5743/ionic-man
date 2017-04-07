import {Injectable} from '@angular/core';
import {UserInterface} from "../interface/index";


@Injectable()
export class Config {

      // static readonly  hostURL = 'https://cnodejs.org/api/v1';     //http请求前缀
    static readonly  hostURL = 'http://ionichina.com/api/v1';
    // static readonly  hostURL = 'http://localhost:8100/api';
    static readonly  isIonic = true;

    static  pageLimit = 15;                       //每页多少
    static  DRAFTS_URL = '/data/drafts.json';     //草稿本地地址
    static  token: string = '';                   //如果已经登录，存放token，请和localstorage.get('token')同步
    static  loginUser: UserInterface;             //如果已经登录，存放登录用户信息，请和本地存储保持同步
    static  loginUserWithId: any;                 //存放携带id的user信息

}

import {Injectable} from '@angular/core';
import {UserInterface} from "../interfaces/index";

/**
 * 这是一个单例模式的config，用于共享全局变量
 */
@Injectable()
export class Config {
    public mode = 'dev';                         //运行模式 dev or release
    //   public hostURL = 'https://cnodejs.org/api/v1';     //http请求前缀
    public hostURL = 'http://ionichina.com/api/v1';         //http请求前缀
    // public hostURL = 'http://localhost:8100/api';         //http请求前缀
    public isIonic = true;

    public pageLimit = 15;                       //每页多少
    public DRAFTS_URL = '/data/drafts.json';     //草稿本地地址
    public token: string = '';                   //如果已经登录，存放token，请和localstorage.get('token')同步
    public loginUser: UserInterface;             //如果已经登录，存放登录用户信息，请和本地存储保持同步
    public loginUserWithId: any;                 //存放携带id的user信息
    static instance: Config;
    static isCreating: Boolean = false;

    constructor() {
        if (!Config.isCreating) {
            throw new Error("You can't call new in Config Singleton instance!");
        }
    }

    static getInstance() {
        if (Config.instance == null) {
            Config.isCreating = true;
            Config.instance = new Config();
            Config.isCreating = false;
        }
        return Config.instance;
    }
}

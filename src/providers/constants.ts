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

    static CACHE_TOPICS_IN_HOME_PAGE = 'TOPICS_CACHE_IN_HOME_PAGE'; //
    static CACHE_TOPIC_IN_TOPIC_PAGE = 'CACHE_TOPIC_IN_TOPIC_PAGE'; //实际使用CACHE_TOPIC_IN_TOPIC_PAGE+topicId 作为key
    static CACHE_USER_IN_USER_PAGE = 'CACHE_USER_IN_USER_PAGE'; //实际使用CACHE_USER_IN_USER_PAGE+loginname 作为key
    static CACHE_USER_COLLECTS_IN_USER_PAGE = 'CACHE_USER_COLLECTS_IN_USER_PAGE' //CACHE_USER_COLLECTS_IN_USER_PAGE+loginname 作为key

    static CACHE_LOGIN_HISTORIES = 'CACHE_LOGIN_HISTORIES';

    constructor() {
    }
}

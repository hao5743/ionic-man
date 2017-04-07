import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from "./api";
import { Config } from "./config";
import { Local } from "./local";
import { Constants } from "./constants";
import { UserInterface, NewReplyInterface } from "../interface/index";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/**
 * 这里用来封装一些与数据请求相关的业务逻辑
 * 当程序规模增大时，需要分离此文件
 * 1.业务上的对外http数据请求接口，统一在此处
 * 2.某些从localstorage获取数据的接口
 */
@Injectable()
export class DataApi {
    constructor(private http: Http,
        private api: Api,
        private local: Local) {
    }
    getTopics(page = 0, limit = Config.pageLimit, tab = 'all', mdrender = true): any {
        return this.api.get('/topics', { page, limit, tab, mdrender })
    }
    getTopic(id): any {
        if (!Config.token) {
            return this.api.get('/topic/' + id)
        } else {
            return this.api.get('/topic/' + id, { accesstoken: Config.token })
        }
    }
    newTopic(obj): Promise < any > {
        return new Promise((resolve, reject) => {
            if (!Config.token) {
                resolve({ type: false, data: { message: '未登录' } });
            } else {
                obj.accesstoken = Config.token;
                console.log(obj);
                this.api.post('/topics', obj).then((res) => {
                    resolve({ type: true, data: res });
                }).catch((err) => {
                    resolve({ type: false, data: err });
                })
            }
        })
    }
    updateTopic(obj): any {
        return this.api.post('/topics/update', obj);
    }
    newReply(topicId: string, obj: NewReplyInterface): Promise < any > {
        return new Promise((resolve, reject) => {
            if (!Config.token) {
                resolve({ type: false, data: { message: '未登录' } });
            } else {
                obj.accesstoken = Config.token;
                this.api.post('/topic/' + topicId + '/replies', obj).then((res) => {
                    resolve({ type: true, data: res });
                }).catch((err) => {
                    resolve({ type: false, data: err });
                })
            }
        })
    }
    makeUp(replyId: string): Promise < any > {
        return new Promise((resolve, reject) => {
            let obj: any = {};
            obj.accesstoken = Config.token;
            this.api.post('/reply/' + replyId + '/ups', obj).then((res) => {
                resolve({ type: true, data: res });
            }).catch((err) => {
                resolve({ type: false, data: err });
            })
        })
    }
    collect(topicId):Promise<any> {
        let obj: any = {};
        obj.accesstoken = Config.token;
        obj.topic_id = topicId;
        if(Config.isIonic){
            return this.api.post('/topic/collect', obj);              //ionicChina use this
        }else{
            return this.api.post('/topic_collect/collect', obj);      //cnode use this
        }
    }
    deCollect(topicId):Promise<any> {
        let obj: any = {};
        obj.accesstoken = Config.token;
        obj.topic_id = topicId;
        if(Config.isIonic){
            return this.api.post('/topic/de_collect', obj);              //ionicChina use this
        }else{
            return this.api.post('/topic_collect/de_collect', obj);      //cnode use this
        }
    }
    getMessages(): Promise < any > {
        let accesstoken = Config.token;
        let mdrender = true;
        return this.api.get('/messages', { accesstoken, mdrender });
    }
    getMessageUnreadCount(): Promise < any > {
        let accesstoken = Config.token;
        return this.api.get('/message/count', { accesstoken });
    }
    messageReadAll(): Promise < any > {
        let accesstoken = Config.token;
        return this.api.post('/message/mark_all', { accesstoken });
    }
    getUser(loginname: string): any {
        return this.api.get('/user/' + loginname);
    }
    getUserCollects(loginname): any {
        return this.api.get('/topic_collect/' + loginname);
    }
    getDrafts(): any {
        return this.local.get(Constants.DRAFTS);
    }
    setDrafts(body): any {
        return this.local.set(Constants.DRAFTS, body);
    }
    verifyToken(accesstoken: string): Promise < any > {
        return new Promise((resolve, reject) => {
            this.http.post(Config.hostURL + '/accesstoken', { accesstoken })
                .toPromise()
                .then(res => res.json())
                .then((res) => {
                    resolve({ type: true, data: res });
                })
                .catch((err) => {
                    resolve({ type: false, data: err.json() })
                });
        })
    }
    setToken(token: string) {
        this.local.set(Constants.ACCESSTOKEN, { data: token });
        Config.token = token;
    }
    getToken() {
        return Config.token;
    }
    setLoginUserWithId(user: any) {
        this.local.set(Constants.LOGINUSERWITHID, { data: user });
        Config.loginUserWithId = user;
    }
    getLoginUserWithId() {
        return Config.loginUserWithId;
    }
    setLoginUser(user) {
        this.local.set(Constants.LOGINUSER, { data: user });
        Config.loginUser = user;
    }
    getLoginUser(): UserInterface {
        return Config.loginUser;
    }
    logout() {
        this.local.remove(Constants.ACCESSTOKEN);
        this.local.remove(Constants.LOGINUSER);
        this.local.remove(Constants.LOGINUSERWITHID);
        Config.token = '';
        Config.loginUser = null;
        Config.loginUserWithId = null;
        console.log('token、loginuser已经清除，退出成功');
    }
    clearCache(){
        this.local.forEach((value,key,index)=>{
            if(key.startsWith('CACHE_')){
                this.local.remove(key);
            }
        })
    }
    isIonic(){
        return Config.isIonic;
    }
}

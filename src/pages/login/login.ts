import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DataApi, Tip, Local, Constants } from '../../providers/index';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    private token: string;
    public loginuser: any = {};
    public isLogin = false;
    private loginHistories: any = [];

    constructor(
        private navCtrl: NavController,
        navParams: NavParams,
        private api: DataApi,
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private tip: Tip,
        private local: Local
    ) {
        this.token = '';
    }

    ionViewWillEnter() {
        this.getLoginUser();
    }

    getLoginUser() {
        if (this.api.getLoginUser()) {
            this.loginuser = this.api.getLoginUser();
            this.token = this.api.getToken();
            this.isLogin = true;
        } else {
            this.isLogin = false;
            this.getHistoryTokens();
        }
    }

    goBack() {
        this.navCtrl.pop();
    }

    doLogin() {
        if (!this.token) {
            this.tip.presentToast('accesstoken不能为空');
            return;
        }
        let loader = this.tip.presentLoading('正在验证');
        this.updateHistoryTokens(this.token);
        this.api.verifyToken(this.token).then((res) => {
            loader.dismiss();
            if (!res.type) {
                this.tip.presentToast('错误的accesstoken');
            } else {
                this.api.setLoginUserWithId(res.data);
                this.api.getUser(res.data.loginname).then((obj) => {
                    this.tip.presentToast('登录成功');
                    this.api.setLoginUser(obj.data);
                    this.api.setToken(this.token);
                    this.goBack();
                })
            }
        })
    }

    getHistoryTokens() {
        this.local.get(Constants.CACHE_LOGIN_HISTORIES).then((data) => {
            if (data && data.length > 0) {
                this.loginHistories = data.reverse();
            }
        })
    }

    updateHistoryTokens(token: string) {
        let histories = this.loginHistories.slice(0);
        if (histories.indexOf(token) < 0) {
            histories.reverse();
            let len = histories.length;
            if (len >= 5) {
                histories.splice(0, len - 4);
            }
            histories.push(token);
            this.local.set(Constants.CACHE_LOGIN_HISTORIES, histories).then(res => {
                console.log('保存成功');
                this.getHistoryTokens();
            })
        }

    }


    setToken(token: string) {
        this.token = token;
    }

    verifyToken() {

    }

    openCamera() {

    }


}

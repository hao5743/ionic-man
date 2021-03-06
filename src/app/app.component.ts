import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../page/tabs/tabs';
import { Config, Local, Constants } from '../provider/index'

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav> `
})

export class MyApp {
    rootPage = TabsPage;
    constructor(platform: Platform,
        private local: Local) {
        platform.ready().then(() => {
            console.log('device ready');
            this.initApp();
        });
    }

    initApp() {
        StatusBar.styleDefault();
        this.checkIsLogin();
        this.hideSplashScreen();
    }

    hideSplashScreen() {
        setTimeout(() => {
            Splashscreen.hide();
        }, 200);
    }

    checkIsLogin() {
        //初始化全局信息
        //检测是否已经登录
        this.local.get(Constants.ACCESSTOKEN).then((res) => {
            if (res && res.data) {
                console.log('已登录');
                Config.token = res.data;
            } else {
                console.log('未登录');
            }
        });
        this.local.get(Constants.LOGINUSER).then((res) => {
            if (res && res.data) {
                Config.loginUser = res.data;
            }
        });
        this.local.get(Constants.LOGINUSERWITHID).then((res) => {
            if (res && res.data) {
                Config.loginUserWithId = res.data;
            }
        });
    }
}

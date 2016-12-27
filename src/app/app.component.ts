import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from '../pages/tabs/tabs';
import {Config, Local, Constants} from '../providers/index'
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = TabsPage;

    constructor(platform: Platform,
                local: Local) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            //get config instance
            let config = Config.getInstance();
            //初始化全局信息
            //检测是否已经登录
            local.get(Constants.ACCESSTOKEN).then((res)=> {
                if (res && res.data) {
                    console.log('已登录');
                    config.token = res.data;
                } else {
                    console.log('未登录');
                }
            });
            local.get(Constants.LOGINUSER).then((res)=> {
                if (res && res.data) {
                    config.loginUser = res.data;
                }
            });
            local.get(Constants.LOGINUSERWITHID).then((res)=> {
                if (res && res.data) {
                    config.loginUserWithId = res.data;
                }
            });
            //其他全局配置
            //do sth
        });
    }
}

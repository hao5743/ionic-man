import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataApi,Tip } from '../../provider/index';
/*
  Generated class for the Setting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
})
export class SettingPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private dataApi: DataApi,
        private tip:Tip
        ) {}
    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }
    goBack() {
        this.navCtrl.pop();
    }
    clearCache() {
        this.tip.presentConfirm('仅占用极小存储空间，建议别删',{
            cancelText:'以后再说',
            okText:'就要删'
        }).then((res)=>{
            if(res){
                 this.dataApi.clearCache();
            }
        })

    }
}

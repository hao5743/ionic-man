import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DataApi,Tip } from '../../providers/index';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private token:string;
  public loginuser : any = {};
  public isLogin = false;
  
  constructor(
    private navCtrl: NavController, 
    navParams: NavParams,
    private api: DataApi,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private tip:Tip
   ) {
     this.token = '8b2251d4-bc58-44d5-8dff-3196cf140f20';
   }

  ionViewWillEnter() {
    this.getLoginUser();
  }

  getLoginUser(){
    if(this.api.getLoginUser()){
      this.loginuser = this.api.getLoginUser();
      this.token = this.api.getToken();
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

  doLogin(){
      if(!this.token){
        this.tip.presentToast('accesstoken不能为空');
        return;
      }
      let loader = this.tip.presentLoading('正在验证');
      this.api.verifyToken(this.token).then((res)=>{
        loader.dismiss();
        if(!res.type){
          this.tip.presentToast('错误的accesstoken');
        }else{
          this.api.setLoginUserWithId(res.data);
          console.log(res);
          this.api.getUser(res.data.loginname).then((obj)=>{
              this.tip.presentToast('登录成功');
              this.api.setLoginUser(obj.data);
              this.api.setToken(this.token);
              this.goBack();
          })
        }
      })
  }


  verifyToken(){

  }

  openCamera(){

  }


}

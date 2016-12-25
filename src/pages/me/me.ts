import { Component } from '@angular/core';
import { NavController,NavParams,ModalController,ToastController,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserInterface } from '../../interfaces/index';
import { DataApi,Tip } from '../../providers/index';
import { TopicPage,LoginPage } from '../index';

interface User{
    fetching:boolean,
    data:UserInterface
}

@Component({
  selector: 'page-topic',
  providers: [],
  templateUrl: 'me.html'
})

export class MePage{
  public user:User ;

  public collects:any = [];
  public state:string = "recent";  
  public islogin = false;
  
  constructor(private dataApi:DataApi,
              private nav:NavController,
              private modalCtrl: ModalController,
              private tip: Tip,
              private navParams: NavParams){
    // this.name = 'hao5743';
      this.user = {
        fetching:false,
        data:{} as UserInterface  
      };
  }

  ngOnInit(){
  }

  ionViewWillEnter() {
    console.log('enter');
    this.getUser();
  }

  openLogin(){
    console.log('openlogin');
     let modal = this.modalCtrl.create(LoginPage);
     modal.onDidDismiss(data => {
       this.getUser();
     });
     modal.present();
  }

  getUser(){
    let data = this.dataApi.getLoginUser();
    this.user.data = {} as UserInterface;
    // console.log(data);
    if(data){
      this.user.data = data;
      this.islogin=true;
      //更新缓存的个人信息
      this.dataApi.getUser(this.user.data.loginname).then((res)=>{
        if(res && res.data){
          this.user.data = res.data;
          console.log('loginuser已更新');
          this.dataApi.setLoginUser(res.data);
        }
      })
      this.getUserCollects();
    }else{
      this.islogin=false;
    }
    
  }

  getUserCollects(){
    return this.dataApi.getUserCollects(this.user.data.loginname).then((res)=>{
      if(res && res.data){
        this.collects = res.data;
        // console.log(this.collects);
      } 
    })
  }

  goBack() {
    this.nav.pop();
  }

  goTopic(p?){
    this.nav.push(TopicPage, {
      id: p.id,
      data: p
    });
  }

  logout(){
    this.tip.presentConfirm('确认退出？').then((res)=>{
      if(res){
          this.dataApi.logout();
          this.tip.presentToast('已经退出');
          this.getUser();
      }
    })
  }
 
}

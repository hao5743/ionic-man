import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController,ModalController } from 'ionic-angular';
import { DataApi } from '../../providers/index';
import { MessageInterface } from '../../interfaces/message.interface';
import { TopicPage } from '../topic/topic';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  public state:string = 'unread';
  public isLogin:boolean = false;

  public messagesUnread:MessageInterface[];
  public messagesRead: MessageInterface[];
  public messageCount: number=0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataApi: DataApi,
              private modalCtrl: ModalController,
              private actionSheetCtrl:ActionSheetController
              ) {
              // this.init();
              }

  init(){
    this.messagesRead = [];
    this.messagesUnread = [];
    let lu = this.dataApi.getLoginUser();
    console.log(lu);
    if(lu){
      this.isLogin=true;
      this.getMessages();
      this.getMessageCount();
    }else{
      this.isLogin=false;
    }
  }

  ionViewWillEnter(){
     this.init();
  }

  pullToRefresh(refresher) {
     this.getMessages().then(res=>refresher.complete());
  }

  getMessageCount(){
    this.dataApi.getMessageUnreadCount().then((res)=>{
      this.messageCount = res.data;
    })
  }

  getMessages(){
      return this.dataApi.getMessages().then((res)=>{
        this.messagesRead = res.data.has_read_messages;
        this.messagesUnread = res.data.hasnot_read_messages;
      }).catch((error)=>{
        console.log(error);
      })
  }

  goBack(){
    this.navCtrl.pop();
  }

  goTopic(p){
    this.navCtrl.push(TopicPage,{
      id:p.id
    })
  }

  sendReply(p){
    console.log('reply');
  }

  goUser(p){
    console.log('user');
  }
  
  markAllRead(){
    this.presentActionSheet().then((res)=>{
      if(res){
        this.dataApi.messageReadAll().then((res)=>{
          console.log(res);
          this.getMessages();
        })
      }
    })
  }

  presentActionSheet():Promise<any> {
    return new Promise((resolve,reject)=>{
          let actionSheet = this.actionSheetCtrl.create({
          title: '标记',
          buttons: [
            
            {
              text: '标记全部已读',
              handler: () => {
                resolve(true);
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                resolve(false);
              }
            }
          ]
        });
        actionSheet.present();
    })
   }

  openLogin(){
     let modal = this.modalCtrl.create(LoginPage);
     modal.onDidDismiss(data => {
       this.init();
     });
     modal.present();
  }


}

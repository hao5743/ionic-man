import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataApi } from '../../providers/index';
import { MessageInterface } from '../../interfaces/message.interface';
import { TopicPage } from '../topic/topic'
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  public state:string = 'unread';

  public messagesUnread:MessageInterface[];
  public messagesRead: MessageInterface[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataApi: DataApi
              ) {
                this.messagesRead = [];
                this.messagesUnread = [];
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.getMessages();
  }

  getMessages(){
      return this.dataApi.getMessages().then((res)=>{
        console.log(res);
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
    // this.navCtrl.push(TopicPage,{
    //   id:p.id
    // })
    console.log('topic');
  }

  sendReply(p){
    console.log('reply');
  }

  goUser(p){
    console.log('user');
  }

}

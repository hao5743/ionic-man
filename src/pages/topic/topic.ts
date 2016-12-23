import {Component, OnInit} from '@angular/core';
import {NavController,AlertController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TopicInterface, ReplyInterface } from '../../interfaces/index';
import { DataApi,Api,Config } from '../../common/index';
import { UserPage } from '../user/user'


interface Topic{
    fetching:boolean,
    data:TopicInterface
}

@Component({
  selector: 'page-topic',
  providers: [DataApi, Api, Config],
  templateUrl: 'topic.html'
})

export class TopicPage{
  public topic:Topic;
  public id:string;
  private tabBarElement:any;

  constructor(private dataApi:DataApi,
              private nav:NavController,
              private navParams:NavParams){
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    this.id = this.navParams.get('id');
    this.topic={
        fetching:false,
        data:{} as TopicInterface
    }
    this.topic.data = this.navParams.get('data');
    this.topic.data.replies = [];
  }

  ngOnInit(){
    this.getTopic();
  }

  getTopic(){
    return this.dataApi.getTopic(this.id).then((res)=>{
        this.topic.data = res.data;
        //处理回复列表，来获得树形目录结构
        let replies = this.topic.data.replies;
        let repliesRoot:ReplyInterface[] = [];
        let repliesNotRoot:ReplyInterface[]  = [];
        let answer:any[] = [];
        replies.forEach(e=>{
          if(e.reply_id){repliesNotRoot.push(e)}
          else{repliesRoot.push(e)}
        });
        // console.log(repliesNotRoot,repliesNotRoot.length);
        // console.log(repliesRoot);
        let map_temp = new Map();
        repliesNotRoot.forEach(e=>{
            let keyReply = getKeyReply(e);
            if(keyReply){
              let comments = map_temp.get(keyReply) || [];
              comments.push(e);
              map_temp.set(keyReply, comments);
            }
        })
        answer = repliesRoot.map(e=>{return {data:e, comments:map_temp.get(e)}});
        console.log(answer);
        this.topic.data.replies = answer;
        // 没有根的评论会返回undefined，可能是因为父评论被删除，而子评论没有级联删除导致的
        // 我们这里对于这种评论作删除处理，因为它的父评论被删除，他已经是垃圾评论
        function getKeyReply(reply:ReplyInterface):ReplyInterface{
          if(!reply || !reply.reply_id){return reply}
          else{
            var t = replies.find(e=> e.id === reply.reply_id);
            return getKeyReply(t);
          }
        }

    })
  }

  goBack() {
    this.showTabBar();
    this.nav.pop();
  }

  goUser(name=this.topic.data.author.loginname){
    this.nav.push(UserPage, {
      name:name
    });
  }

  ionViewWillLoad() {
     this.tabBarElement.style.display = 'none';
  }

  showTabBar(){
     this.tabBarElement.style.display = 'flex';
  }

//展示评论
  scrollToReply(){
    console.log('scrollToReply');
  }
//回复
  makeReply(item?){
    console.log('reply',item);
  }
//点赞
  makeUp(item?){
    console.log('up',item);
  }
//收藏
  makeCollect(){
    console.log('collect');
  }

}

import {Component,ViewChild} from '@angular/core';
import {NavController,NavParams,Content,ModalController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TopicInterface, ReplyInterface } from '../../interfaces/index';
import { DataApi,Tip } from '../../providers/index';
import { UserPage,LoginPage } from '../index'

interface Topic{
    fetching:boolean,
    data:TopicInterface
}

@Component({
  selector: 'page-topic',
  providers: [],
  templateUrl: 'topic.html'
})

export class TopicPage{
  public topic:Topic;
  public id:string;
  private tabBarElement:any;
  public loginUserId:string='';

  @ViewChild(Content) content: Content;

  constructor(private dataApi:DataApi,
              private nav:NavController,
              private modalCtrl: ModalController,
              private tip:Tip,
              private navParams:NavParams){
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    this.id = this.navParams.get('id');
    let u:any = this.dataApi.getLoginUserWithId();
    if(u){
       this.loginUserId  = u.id;
    }
   
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
        // console.log(res.data);
        //处理回复列表，来获得树形目录结构
        let replies = this.topic.data.replies;
        let repliesRoot:ReplyInterface[] = [];
        let repliesNotRoot:ReplyInterface[]  = [];
        let answer:any[] = [];
        replies.forEach(e=>{
          e.myup = e.ups.indexOf(this.loginUserId) >=0;
          if(e.reply_id){repliesNotRoot.push(e)}
          else{repliesRoot.push(e)}
        });
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
        // console.log(answer);
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

  ionViewWillUnload() {
    var pre = this.nav.getPrevious().name;
    if(pre == 'HomePage' || pre ==='MePage'){
      this.tabBarElement.style.display = 'flex';
    }
  }

//回到顶端
  scrollToTop(){
    this.content.scrollToTop();
  }

//展示评论
  scrollToReply(){
    console.log('scrollToReply');
    let y = document.getElementById('replyDivider');
    console.log(y,y.offsetTop,y.offsetHeight);
    this.content.scrollTo(0,y.offsetTop,500);
  }

  openLogin(){
   console.log('openlogin');
     let modal = this.modalCtrl.create(LoginPage);
     modal.onDidDismiss(data => {
      //  this.getUser();
     });
     modal.present();
 }

//是否登录
  checkLogin(){
    if(!this.dataApi.getToken()){
        this.tip.presentConfirm('你尚未登录,现在去登录?',{okText:'去登录',cancelText:'以后再说'}).then((res)=>{
          if(res){
            this.openLogin();
          }
        })
      return false;
    }else{
      return true;
    }
  }

  //回复
  makeReply(item?){
    if(!this.checkLogin()){return }
    let at:string='';
    if(item){ 
        at = '@'+item.author.loginname;
    }
    this.tip.presentReplyPrompt(at).then((res)=>{
      if(!res){console.log('canceld')}
      else{
        let content = res.data.trim();
        if(!content){this.handleError('输入不能为空');return ;}
        let obj:any = {};
        if(item){ 
            obj.reply_id = item.id;
            obj.content = '@'+item.author.loginname+' '+content;
        }else{
            obj.content = content;
        }
        let topicId = this.topic.data.id;
        this.dataApi.newReply(topicId, obj).then((res)=>{
          if(!res.type){ this.handleError('回复失败',res.data); }
          else{
            this.tip.presentToast('回复成功');
            this.getTopic();
          }
        }).catch((err)=>{
          this.handleError('回复失败',err);
        })
      }
    })
  }
//点赞
  makeUp(item){
    if(!this.checkLogin()){return }
    if(!item) {return ;}
    this.dataApi.makeUp(item.id).then((res)=>{
      if(!res.type){
        if(res.data && res.data.includes('不能帮自己点赞')){
          this.handleError('不允许给自己点赞哦',res.data);
        }else{this.handleError('点赞失败',res.data);}
      }
      else{
        if(res.data && res.data.action==='up'){
           this.tip.presentToast('点赞成功',{position:'top',duration:800});
            item.myup = true;
            item.ups.push(this.loginUserId);
        }else{
          this.tip.presentToast('取消点赞成功',{position:'top',duration:800});
           item.myup = false;
           item.ups.splice(item.ups.indexOf(this.loginUserId),1);
        }
       
      }
    })
  }
//收藏
  makeCollect(){
    if(!this.checkLogin()){return }
    if(this.topic.data.is_collect){
      this.deCollect();
    }else{
      this.collect();
    }
  }

  collect(){
    this.dataApi.collect(this.topic.data.id).then((res)=>{
      console.log('收藏成功');
      this.topic.data.is_collect = true;
      this.tip.presentToast('收藏成功',{duration:800});
    }).catch((err)=>{
      this.handleError('收藏失败',err);
    })
  }
  
  deCollect(){
    this.dataApi.deCollect(this.topic.data.id).then((res)=>{
      console.log('取消收藏成功');
      this.topic.data.is_collect = false;
      this.tip.presentToast('取消收藏成功',{duration:800});
    }).catch((err)=>{
      this.handleError('取消收藏失败',err);
    })
  }


  handleError(errorMessage:string='未知的错误',errorData?:any){
      console.log(errorData);
      this.tip.presentToast(errorMessage,{duration:1000});
  }

}

import {
  Component,
  ViewChild
} from '@angular/core';
import {
  NavController,
  NavParams,
  Content,
  ModalController
} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {
  TopicInterface,
  ReplyInterface,
  UserInterface
} from '../../interfaces/index';
import {
  DataApi,
  Tip,
  Local,
  Constants
} from '../../providers/index';
import {
  UserPage,
  LoginPage
} from '../index'

interface Topic {
    fetching: boolean,
    data: TopicInterface
}

@Component({
  selector: 'page-topic',
  providers: [],
  templateUrl: 'topic.html'
})

export class TopicPage {
  private topic: Topic = {
    fetching:false,
    data:{} as TopicInterface
  };
  private paramTopic:any;
  private id: string = '';
  private tabBarElement: any;
  private loginUserId: string = '';
  private loginUser: UserInterface;
  @ViewChild(Content) content: Content;

  constructor(private dataApi: DataApi,
    private nav: NavController,
    private modalCtrl: ModalController,
    private tip: Tip,
    private local: Local,
    private navParams: NavParams) {
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    this.init();
  }

  ngOnInit() {
  }

  init(){
    //constructor阶段，不宜执行大量操作，否则会造成切换页面卡顿，仅对基本变量赋值
    this.topic.data.author={ loginname: '', avatar_url: '' };
    this.topic.data.is_collect=false;
    this.topic.data.replies=[];
    this.id = this.navParams.get('id');
    this.paramTopic = this.navParams.get('data');
    //如果有参数topic，获取它
    if(this.paramTopic){
      let t=this.topic.data, p=this.paramTopic;
      t.author=p.author; t.title = p.title; t.tab=p.tab; t.good=p.good;t.top=p.top;
      t.reply_count=p.reply_count; t.visit_count=p.visit_count; t.create_at=p.create_at;
    }
    this.getLoginUser();
  }

  getLoginUser(){
    //获取登录信息
    let u: any = this.dataApi.getLoginUserWithId();
    if (u) {
      this.loginUserId = u.id;
      this.loginUser = this.dataApi.getLoginUser();
    }
  }

  loadCache() {
    return this.local.get(Constants.CACHE_TOPIC_IN_TOPIC_PAGE + this.id).then((data) => {
      //加载content和reply，如果有的话。
      //注意：这一步可能会比较慢，所以我们把它放在didEnter中执行，防止页面切换卡顿
      if(data && this.paramTopic){ 
        this.topic.data = this.paramTopic;
        this.topic.data.replies = data.replies;
      }
      else if(data && !this.paramTopic){
        this.topic.data = data;
      }
      else if(this.paramTopic && !data){
        this.topic.data = this.paramTopic;
        this.topic.data.replies=[];
      }
    });
  }

  ionViewWillLoad() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewDidEnter(){
     this.loadCache().then((res)=>{
       this.getTopic();
    })
  }

  ionViewWillLeave(){
     this.showTabBar();
  }
  
  showTabBar(){
    var pre = this.nav.getPrevious().name;
    if (pre == 'HomePage' || pre === 'MePage' || pre === 'MessagePage') {
      this.tabBarElement.style.display = 'flex';
    }
  }

  getTopic() {
    this.topic.fetching = true;
    return this.dataApi.getTopic(this.id).then((res) => {
      this.topic.fetching = false;
      this.topic.data = res.data;
      this.topic.data.replies = this.transformReply(this.topic.data.replies);
      //缓存更新
      this.local.set(Constants.CACHE_TOPIC_IN_TOPIC_PAGE + this.id, this.topic.data);
    }).catch((err)=>{
      console.error(err);
    })
  }

  //修改replies结构为树形目录
  transformReply(replies: any[]): any[] {
    //将回复分为根回复和非根回复
    let repliesRoot: ReplyInterface[] = [];
    let repliesNotRoot: ReplyInterface[] = [];
    replies.forEach(e => {
      e.myup = e.ups.indexOf(this.loginUserId) >= 0;
      if (e.reply_id) {
        repliesNotRoot.push(e)
      } else {
        repliesRoot.push(e)
      }
    });
    //获取每个非根回复的根
    let map_temp = new Map();
    repliesNotRoot.forEach(e => {
        let keyReply = getKeyReply(e);
        if (keyReply) {
          let comments = map_temp.get(keyReply) || [];
          comments.push(e);
          map_temp.set(keyReply, comments);
        }
      })
      //将回复归入他的根中
    let answer = repliesRoot.map(e => {
      return {
        data: e,
        comments: map_temp.get(e)
      }
    });
    return answer;

    //递归获取根回复
    // 没有根的评论会返回undefined，可能是因为父评论被删除，而子评论没有级联删除导致的
    // 我们这里对于这种评论作删除处理，因为它的父评论被删除，他已经是垃圾评论
    function getKeyReply(reply: ReplyInterface): ReplyInterface {
      if (!reply || !reply.reply_id) {
        return reply
      } else {
        var t = replies.find(e => e.id === reply.reply_id);
        return getKeyReply(t);
      }
    }

  }

  goBack() {
    this.nav.pop();
  }

  goUser(name = this.topic.data.author.loginname) {
    this.nav.push(UserPage, {
      name: name
    });
  }

  //回到顶端
  scrollToTop() {
    this.content.scrollToTop();
  }

  //展示评论
  scrollToReply() {
    console.log('scrollToReply');
    let y = document.getElementById('replyDivider');
    console.log(y, y.offsetTop, y.offsetHeight);
    this.content.scrollTo(0, y.offsetTop, 500);
  }

  openLogin() {
    console.log('openlogin');
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      //  this.getUser();
      this.getLoginUser();
      this.getTopic();
    });
    modal.present();
  }

  //是否登录
  checkLogin() {
    if (!this.dataApi.getToken()) {
      this.tip.presentConfirm('你尚未登录,现在去登录?', {
        okText: '去登录',
        cancelText: '以后再说'
      }).then((res) => {
        if (res) {
          this.openLogin();
        }
      })
      return false;
    } else {
      return true;
    }
  }

  //回复
  makeReply(item ? ) {
      if (!this.checkLogin()) {
        return
      }
      let at: string = '';
      if (item) {
        at = '@' + item.author.loginname;
      }
      this.tip.presentReplyPrompt(at).then((res) => {
        if (!res) {
          console.log('canceld')
        } else {
          let content = res.data.trim();
          if (!content) {
            this.handleError('输入不能为空');
            return;
          }
          let obj: any = {};
          if (item) {
            obj.reply_id = item.id;
            obj.content = '@' + item.author.loginname + ' ' + content;
          } else {
            obj.content = content;
          }
          let topicId = this.topic.data.id;
          this.dataApi.newReply(topicId, obj).then((res) => {
            if (!res.type) {
              this.handleError('回复失败', res.data);
            } else {
              this.tip.presentToast('回复成功');
              this.getTopic();
            }
          }).catch((err) => {
            this.handleError('回复失败', err);
          })
        }
      })
    }
    //点赞
  makeUp(item) {
      if (!this.checkLogin()) {
        return
      }
      if (!item) {
        return;
      }
      if (item.author.loginname === this.loginUser.loginname) {
        this.tip.presentToast('不允许给自己点赞哦', {
          position: 'top',
          duration: 800
        });
        return;
      }
      if (item.myup) {
        this.tip.presentToast('取消点赞成功', {
          position: 'top',
          duration: 800
        });
        item.myup = false;
      } else {
        this.tip.presentToast('点赞成功', {
          position: 'top',
          duration: 800
        });
        item.myup = true;
      }

      this.dataApi.makeUp(item.id).then((res) => {
        if (!res.type) {
          if (res.data && res.data.includes('不能帮自己点赞')) {
            this.handleError('不允许给自己点赞哦', res.data);
          } else {
            this.handleError('点赞失败', res.data);
          }
        } else {
          if (res.data && res.data.action === 'up') {
            item.myup = true;
            item.ups.push(this.loginUserId);
          } else {
            item.myup = false;
            item.ups.splice(item.ups.indexOf(this.loginUserId), 1);
          }
        }
      })
    }
    //收藏
  makeCollect() {
    if (!this.checkLogin()) {
      return
    }
    if (this.topic.data.is_collect) {
      this.deCollect();
    } else {
      this.collect();
    }
  }

  collect() {
    this.topic.data.is_collect = true;
    this.tip.presentToast('收藏成功', {
      duration: 800
    });
    this.dataApi.collect(this.topic.data.id).then((res) => {
      console.log('收藏成功');
    }).catch((err) => {
      this.handleError('收藏失败', err);
    })
  }

  deCollect() {
    this.topic.data.is_collect = false;
    this.tip.presentToast('取消收藏成功', {
      duration: 800
    });
    this.dataApi.deCollect(this.topic.data.id).then((res) => {
      console.log('取消收藏成功');
    }).catch((err) => {
      this.handleError('取消收藏失败', err);
    })
  }

  isCollect(is_collect:any){
    if(typeof is_collect === 'boolean'){
      return is_collect;
    }else{
      return false;
    }
  }


  handleError(errorMessage: string = '未知的错误', errorData ? : any) {
    console.log(errorData);
    this.tip.presentToast(errorMessage, {
      duration: 1000
    });
  }

}

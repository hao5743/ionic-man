import { Component } from '@angular/core';
import { NavParams,NavController,ModalController } from 'ionic-angular';
import  * as inter from '../../interface/index';
import { DataApi, Local, Tip } from '../../provider/index';
import { LoginPage } from '../../page/index';

@Component({
  selector: 'modal-newTopic',
  templateUrl: 'newTopic.html'
})

export class NewTopic {
  public input: inter.TopicInputInterface;
  public index: number;
  public tab: string;
  private islogin: boolean;

  public drafts: inter.TopicInputInterface[] = [];
  constructor(private params: NavParams,
    public nav: NavController,
    public local: Local,
    private dataApi: DataApi,
    private modalCtrl: ModalController,
    private tip: Tip
  ) {
    this.init();

  }

  ngOnInit() {}

  init() {
    this.drafts = this.params.get('drafts');
    this.index = this.params.get('index');
    if (typeof this.index !== 'undefined') {
      this.input = this.drafts[this.index];
    } else {
      this.input = {
        title: '',
        content: '',
        tab: 'share'
      };
    }
    if (this.params.get('tab')) {
      this.input.tab = this.params.get('tab');
    }
    this.checkIsLogin();
  }

  checkIsLogin(){
    let lu = this.dataApi.getLoginUser();
    if(lu){
      this.islogin=true;
    }else{
      this.islogin=false;
    }
  }

  getDrafts() {
    this.dataApi.getDrafts().then(res => {
      if (res && res.data) {
        this.drafts = res.data;
      }
    })
  }

  upload() {
    if(!this.input.title){
        this.tip.presentToast('标题不能为空');
        return ;
    }
    if(!this.input.content){
        this.tip.presentToast('内容不能为空');
        return ;
    }
    if(!this.islogin){
        this.tip.presentConfirm('你尚未登录,现在去登录?', {
          okText: '去登录',
          cancelText: '以后再说'
        }).then((res) => {
          if (res) {
            this.openLogin();
          }
        })
        return ;
    }

    var obj = {
      title: this.input.title,
      tab: this.input.tab,
      content: this.input.content
    }
    this.dataApi.newTopic(obj).then((res) => {
      console.log(res);
      if (!res.type) {
        console.log('no token');
      } else {
        this.tip.presentToast('发布成功');
        this.goBack();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  openLogin() {
    console.log('openlogin');
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      //  this.getUser();
    });
    modal.present();
  }

  saveDraft() {
    if (this.index) {
      this.input.update_at = new Date();
    } else {
      this.input.update_at = new Date();
      this.input.id = new Date().toISOString();
      this.drafts.push(this.input);
    }
    console.log(this.drafts);
    this.dataApi.setDrafts({
      data: this.drafts
    });
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

  cancel() {
    this.goBack();
  }

}

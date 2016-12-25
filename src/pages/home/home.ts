import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { TopicInterface } from '../../interfaces/index';
import { DataApi } from '../../providers/index';
import { TopicPage,LoginPage } from '../index';

interface TopicsInterface {
  fetching:boolean,
  hasMore:boolean,
  data:TopicInterface[]
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private pagination:any={
    page:0,
    limit:20,
    tab:'all',
    mdrender:false
  }
  private topics:TopicsInterface={
    fetching:false,
    hasMore:true,
    data:[]
  }

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              public dataApi: DataApi) {
  }

  ngOnInit() {
    this.getTopics();
  }

  getTopics(){
    let pg = this.pagination;
    console.log(pg.page);
    return this.dataApi.getTopics(pg.page, pg.limit, pg.tab, pg.mdrender).then((res)=>{
      this.topics.data = this.topics.data.concat(res.data);
      if(res.data.length === 0){
        this.topics.hasMore = false;
      }else{
        this.topics.hasMore = true;
        this.pagination.page++;
      }
    })
  }

  refreshTopics(){
    this.topics.data=[];
    this.pagination.page=0;
    return this.getTopics();
  }

  pullToRefresh(refresher) {
     this.refreshTopics().then(res=>refresher.complete());
  }

  doInfinite(infiniteScroll) {
    if (!this.topics.hasMore) return;
    this.getTopics().then(res=>infiniteScroll.complete());
  }

  showInfo(p){
     this.navCtrl.push(TopicPage, {
      id: p.id,
      data: p
    });
  }

  translate(p){
    if(p=='share') return '分享';
    else if(p=='ask') return '问答';
    else if(p=='job') return '招聘';
    else if(p=='all') return '全部';
    else if(p=='good') return '精华';
  }

  setTab(tab){
    if(this.pagination.tab!==tab){
      this.pagination.tab = tab;
    }
    this.refreshTopics();
  }

  ionViewWillEnter() {
  }
  ionViewWillLeave() {
  }

  openLogin(){
    console.log('openlogin');
     let modal = this.modalCtrl.create(LoginPage);
     modal.present();
  }
  
}

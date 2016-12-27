import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserInterface } from '../../interfaces/index';
import { DataApi,Local,Constants } from '../../providers/index';
import { TopicPage } from '../index';

interface User{
    fetching:boolean,
    data:UserInterface
}

@Component({
  selector: 'page-topic',
  providers: [],
  templateUrl: 'user.html'
})

export class UserPage{
  public user:User = {
    fetching:false,
    data:{} as UserInterface
  };
  public name:string;
  public collects:any;
  public state:string = "recent";
  private tabBarElement:any;
  constructor(private dataApi:DataApi,
              private nav:NavController,
              private local:Local,
              private navParams:NavParams){
     this.init();
  }

  init(){
     this.name = this.navParams.get('name');
     this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
     this.user.data={
       recent_topics:[]
     } as UserInterface;
     this.loadCache();

  }

  ionViewDidLoad(){
    this.getUser();
    this.getUserCollects();
  }

  ionViewDidEnter(){

  }

  loadCache(){
      let p1 =  this.local.get(Constants.CACHE_USER_IN_USER_PAGE+this.name).then((data)=>{
          if(data){this.user.data = data;}
      });
      let p2 = this.local.get(Constants.CACHE_USER_COLLECTS_IN_USER_PAGE+this.name).then((data)=>{
        if(data){this.collects = data;}
      });
      return Promise.all([p1,p2]);
  }

  getUser(){
    return this.dataApi.getUser(this.name).then((res)=>{
        this.user.data = res.data;
        this.local.set(Constants.CACHE_USER_IN_USER_PAGE+this.name,res.data);
    }).catch(this.handleError);
  }

  getUserCollects(){
    return this.dataApi.getUserCollects(this.name).then((res)=>{
        this.collects = res.data;
        this.local.set(Constants.CACHE_USER_COLLECTS_IN_USER_PAGE+this.name,res.data);
    }).catch((error)=>{
        this.handleError(error,'获取收藏错误或收藏api不存在');
    });
  }

  goBack() {
    this.nav.pop();
  }

  goTopic(p?){
    console.log('detail',p);
    this.nav.push(TopicPage, {
      id: p.id,
      data: p
    });
  }

   handleError(error:any, message?:string) {
        console.error(error);
        if(message){
            console.error(message);
        }
    }
}

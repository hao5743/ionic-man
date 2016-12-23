import {Component, OnInit} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserInterface } from '../../interfaces/index';
import { DataApi,Api,Config } from '../../common/index';
import { TopicPage } from '../topic/topic';

interface User{
    fetching:boolean,
    data:UserInterface
}

@Component({
  selector: 'page-topic',
  providers: [DataApi, Api, Config],
  templateUrl: 'user.html'
})

export class UserPage{
  public user:User = {
    fetching:false,
    data:{} as UserInterface  
  };
  public name:string;

  public state:string = "recent";  
  private tabBarElement:any;
  constructor(private dataApi:DataApi,
              private nav:NavController,
              private navParams:NavParams){
    this.name = this.navParams.get('name');
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit(){
    this.getUser();
  }

  getUser(){
    return this.dataApi.getUser(this.name).then((res)=>{
        this.user.data = res.data;
        console.log(res.data);
    })
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
 
  ionViewWillLoad() {
     this.tabBarElement.style.display = 'none';
  }

  // ionViewWillUnload() {
  //    this.tabBarElement.style.display = 'flex';
  // }
}

import {Component, OnInit} from '@angular/core';
import {NavController,AlertController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TopicInterface } from '../../interfaces/index';
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
  }

  ngOnInit(){
    this.onPageWillEnter();
    this.getTopic();
  }

  getTopic(){
    return this.dataApi.getTopic(this.id).then((res)=>{
        this.topic.data = res.data;
        console.log(res.data);
    })
  }

  goBack() {
    this.onPageWillLeave();
    this.nav.pop();
  }

  goUser(){
    this.nav.push(UserPage, {
      name:this.topic.data.author.loginname
    });
  }

  onPageWillEnter(){
        this.tabBarElement.style.display = 'none';
  }

    onPageWillLeave()
    {

        this.tabBarElement.style.display = 'flex';

    }

 
}

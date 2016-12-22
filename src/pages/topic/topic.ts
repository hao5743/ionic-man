import {Component, OnInit} from '@angular/core';
import {NavController,AlertController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TopicInterface } from '../../interfaces/index';
import { DataApi,Api,Config } from '../../common/index';


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

  constructor(private dataApi:DataApi,
              private nav:NavController,
              private navParams:NavParams){
    this.id = this.navParams.get('id');
    this.topic={
        fetching:false,
        data:{} as TopicInterface
    }
    this.topic.data = this.navParams.get('data');
  }

  ngOnInit(){
    this.getTopic();
  }

  getTopic(){
    return this.dataApi.getTopic(this.id).then((res)=>{
        this.topic.data = res.data;
    })
  }

  goBack() {
    this.nav.pop();
  }

 
}

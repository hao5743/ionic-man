import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserInterface } from '../../interfaces/index';
import { DataApi } from '../../providers/index';
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
              private navParams:NavParams){
    this.name = this.navParams.get('name');
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit(){
    this.getUser();
    this.getUserCollects();
  }

  getUser(){
    return this.dataApi.getUser(this.name).then((res)=>{
        this.user.data = res.data;
        console.log(res.data);
    })
  }

  getUserCollects(){
    return this.dataApi.getUserCollects(this.name).then((res)=>{
        this.collects = res.data;
        console.log(this.collects);
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
 
}

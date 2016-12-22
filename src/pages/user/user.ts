import {Component, OnInit} from '@angular/core';
import {NavController,AlertController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UserInterface } from '../../interfaces/index';
import { DataApi,Api,Config } from '../../common/index';

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
  constructor(private dataApi:DataApi,
              private nav:NavController,
              private navParams:NavParams){
    this.name = this.navParams.get('name');
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
 
}

import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { NewTopic } from'./newTopic';
import  * as inter from '../../interface/index';
import { DataApi,Config } from '../../provider/index';

@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
  providers: [],
})
export class WritePage {
  public input : inter.TopicInputInterface= {
    title:'',
    content:'',
    tab:'share'
  };

  private config:Config;
  public isLogin:boolean = false;

  //草稿列表
  public drafts : inter.TopicInputInterface[]= [];

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private dataApi:DataApi
              ) {
      this.config = Config.getInstance();
  }

  ngOnInit(){
  }

  ionViewDidEnter() {
    this.getDrafts();
    this.checkIsLogin();
  }

  checkIsLogin(){
    console.log(this.config.token);
    if( this.config.token){
      this.isLogin = true;
    }else{
      this.isLogin=false;
    }
  }

  getDrafts(){
    return this.dataApi.getDrafts().then((res)=>{
      if(res && res.data){
         console.log(res.data);
         this.drafts = res.data ;
      }
    })
  }

  saveDraft(){
    this.dataApi.setDrafts({data:this.drafts});
 }

  openNewType(tab){
   let modal = this.modalCtrl.create(NewTopic, { drafts:this.drafts, tab });
    modal.onDidDismiss(data => {
       this.checkIsLogin();
     });
   modal.present();
  }

  openNewTopic(index?) {
   let modal = this.modalCtrl.create(NewTopic, { drafts:this.drafts, index });
   modal.present();
  }

  deleteTopic(index){
      this.drafts.splice(index,1);
      this.saveDraft();
  }

  pullToRefresh(refresher) {
     this.getDrafts().then(res=>refresher.complete());
  }
}

import { Component } from '@angular/core';
import { NavParams,NavController,ModalController } from 'ionic-angular';
import  * as inter from '../../interfaces/index';
import { DataApi, Local, Tip } from '../../providers/index';
import { LoginPage } from '../../pages/index';

@Component({
  selector: 'modal-newTopic',
  templateUrl:'newTopic.html'
})

export class NewTopic {
  public input : inter.TopicInputInterface ;
  public index:number ;
  public tab:string;
  
 public drafts : inter.TopicInputInterface[] = [];
 constructor(params: NavParams,
            public nav:NavController,
            public local:Local,
            private dataApi:DataApi,
            private modalCtrl: ModalController,
            private tip: Tip
            ) {
    
    this.drafts = params.get('drafts');
    this.index = params.get('index');
    
    if(typeof this.index !=='undefined'){ 
      this.input = this.drafts[this.index];
    }else{
      this.input = {title:'',content:'',tab:'share'};
    }
    if(params.get('tab')){
      this.input.tab = params.get('tab');
    } 
 }

 ngOnInit(){
    // this.getDrafts();
 }
 
 getDrafts(){
   this.dataApi.getDrafts().then(res=>{
     if(res && res.data){
        this.drafts = res.data;
     }
   })
 }

 upload(){
    console.log('upload');
    var obj = {
      title: this.input.title,
      tab: this.input.tab,
      content: this.input.content
    }
    this.dataApi.newTopic(obj).then((res)=>{
      console.log(res);
        if(!res.type){
          console.log('no token');
          this.tip.presentConfirm('你尚未登录,现在去登录?',{okText:'去登录',cancelText:'以后再说'}).then((res)=>{
            if(res){
              this.openLogin();
            }
          })
        }else{
          console.log(res);
          this.tip.presentToast('发布成功');
          this.goBack();
        }
    }).catch((err)=>{
      console.log(err);
    })
 }

 openLogin(){
   console.log('openlogin');
     let modal = this.modalCtrl.create(LoginPage);
     modal.onDidDismiss(data => {
      //  this.getUser();
     });
     modal.present();
 }
 
 saveDraft(){
    if(this.index){
        this.input.update_at = new Date();
    }else{
      this.input.update_at = new Date();
      this.input.id = new Date().toISOString();
      this.drafts.push(this.input);
    }
    console.log(this.drafts);
    this.dataApi.setDrafts({data:this.drafts});
    this.goBack();
 }

 goBack(){
    this.nav.pop();
 }

  cancel(){
    this.goBack();
  }

}


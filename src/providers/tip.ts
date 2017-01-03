import {Injectable} from '@angular/core';
import { ToastController,AlertController,LoadingController } from 'ionic-angular';

/**
 * 经常用到的一些提示插件，比如confirm,toast等
 * 封装在这里，方便程序调用或修改风格
 */
interface confirmOpts{
  okText?:string,
  cancelText?:string
}

interface loadingOpts{
  duration?:number
}

interface toastOpts{
  position?:string,  //middle top bottom
  duration?:number
}

interface promptOpts{
  title:string,
  inputName:string,
  inputPlaceholder:string,
  cancelText?:string,
  okText?:string
}

@Injectable()
export class Tip {
   constructor(private alertCtrl:AlertController,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController
              ){ }

   presentToast(message:string,opts:toastOpts = {}):Promise<any> {
     return new Promise((resolve,reject)=>{
        let toast = this.toastCtrl.create({
          message: message ,
          duration: opts.duration || 1000,
          position: opts.position || 'top'
        })
        toast.onDidDismiss(() => {
          resolve();
        });
        toast.present();
     })
  }

  presentLoading(message,opts:loadingOpts={}):any{
    let loader = this.loadingCtrl.create({
      content: message || "",
      duration: opts.duration || 5000
    });
    loader.present();
    return loader;
    // setTimeout(() => {
    //   loader.dismiss();
    // }, 5000);
  }

   presentConfirm(message:string,opts:confirmOpts={}):Promise<any>{
      return new Promise((resolve,reject)=>{
       let alert = this.alertCtrl.create({
        title: '提示',
        message: message ||'请确认操作',
        buttons: [
          {
            text: opts.cancelText || '取消',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: opts.okText || '退出',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
      })
   }

   presentReplyPrompt(at?:string): Promise<any>{
     return this.presentPrompt({title:'发表回复:',okText:'发送',inputName:'data',inputPlaceholder: at || '回复文章'});
   }

   presentPrompt(opts:promptOpts) : Promise<any>{
       return new Promise((resolve,reject)=>{
          let alert = this.alertCtrl.create({
            title: opts.title || '输入',
            inputs: [
              {
                name: opts.inputName || 'data',
                placeholder: opts.inputPlaceholder || '请输入',
                checked:true
              }
            ],
            buttons: [
              {
                text: opts.cancelText || '取消',
                role: 'cancel',
                handler: data => {
                  resolve(false);
                }
              },
              {
                text: opts.okText|| '确定',
                handler: data => {
                  resolve(data);
                }
              }
            ]
          });
          alert.present();
        })
    }
}

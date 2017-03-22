import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import * as page from '../page/index';
import * as pipe from '../pipe/index';
import * as provider from '../provider/index';
import * as component from '../component/index';
//自动引入index中的组件、管道等，避免重复书写
const mypages = Object.keys(page).map(e => page[e]);
const mypipes = Object.keys(pipe).map(e => pipe[e]);
const myproviders = [...Object.keys(provider).map(e => provider[e]), ];
const mycomponents = Object.keys(component).map(e => component[e]);

@NgModule({
    declarations: [MyApp, ...mypages, ...mycomponents, ...mypipes],
    imports: [IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [...mypages],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, ...myproviders]
})
export class AppModule {}

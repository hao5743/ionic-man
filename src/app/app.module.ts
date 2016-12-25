import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WritePage,HomePage,TopicPage,UserPage,MePage,TabsPage,NewTopic,LoginPage } from '../pages/index';
import { TestPipe,TopicTab,Moment } from '../pipe/index';
import { Api,DataApi,Config,Local,Tip } from '../providers/index';

import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    //pages
    MePage,
    WritePage,
    HomePage,
    TabsPage,
    TopicPage,
    UserPage,
    NewTopic,
    LoginPage,
    //pipes
    TestPipe,
    TopicTab,
    Moment
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MePage,
    WritePage,
    HomePage,
    TabsPage,
    TopicPage,
    UserPage,
    NewTopic,
    LoginPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Config,
    Api,
    Local,
    DataApi,
    Tip,
    Storage
  ]
})
export class AppModule {}

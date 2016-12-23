import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TopicPage } from '../pages/topic/topic';
import { UserPage } from '../pages/user/user';
import { TestPipe,TopicTab,Moment } from '../pipe/index';

@NgModule({
  declarations: [
    MyApp,
    //pages
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TopicPage,
    UserPage,
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TopicPage,
    UserPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

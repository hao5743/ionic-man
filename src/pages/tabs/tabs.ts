import { Component } from '@angular/core';
import { HomePage,MePage,WritePage,MessagePage } from '../index';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = WritePage;
  tab3Root: any = MessagePage;
  tab4Root: any = MePage;

  constructor() {

  }
}

import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {TopicInterface} from '../../interfaces/index';
import {DataApi, Local, Constants} from '../../providers/index';
import {TopicPage, LoginPage} from '../index';
interface TopicsInterface {
    fetching: boolean,
        hasMore: boolean,
        data: TopicInterface[]
}
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    public isIonic:boolean;
    private pagination: any = {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
    }
    private topics: TopicsInterface = {
        fetching: false,
        hasMore: true,
        data: []
    }

    constructor(
        public navCtrl: NavController,
        private modalCtrl: ModalController,
        private local: Local,
        public dataApi: DataApi) {
        //获取缓存数据
        this.loadCache();
        this.isIonic = this.dataApi.isIonic();
    }
    ngOnInit() {
        this.getTopics();
    }
    loadCache() {
        this.local.get(Constants.CACHE_TOPICS_IN_HOME_PAGE).then((res) => {
            // console.log('缓存', res);
            this.topics.data = res;
        }).catch((error) => {
            console.log(error);
        })
    }
    getTopics() {
        let pg = this.pagination;
        return this.dataApi.getTopics(pg.page, pg.limit, pg.tab, pg.mdrender).then((res) => {
            if (pg.page == 1) {
                this.topics.data = [];
            }
            this.topics.data = this.topics.data.concat(res.data);
            if (res.data.length === 0) {
                this.topics.hasMore = false;
            } else {
                this.topics.hasMore = true;
                this.pagination.page++;
            }
            this.local.set(Constants.CACHE_TOPICS_IN_HOME_PAGE, this.topics.data);
        }).catch((error) => {
            console.error(error);
        })
    }
    refreshTopics() {
        this.topics.data = [];
        this.pagination.page = 0;
        return this.getTopics();
    }
    pullToRefresh(refresher) {
        this.refreshTopics().then(res => refresher.complete());
    }
    doInfinite(infiniteScroll) {
        if (!this.topics.hasMore) return;
        this.getTopics().then(res => infiniteScroll.complete());
    }
    showInfo(p) {
        this.navCtrl.push(TopicPage, {
            id: p.id,
            data: p
        });
    }
    translate(p) {
        if (p == 'share') return '分享';
        else if (p == 'ask') return '问答';
        else if (p == 'job') return '招聘';
        else if (p == 'all') return '全部';
        else if (p == 'good') return '精华';
    }
    setTab(tab) {
        if (this.pagination.tab !== tab) {
            this.pagination.tab = tab;
        }
        this.refreshTopics();
    }
    ionViewWillEnter() {}
    ionViewWillLeave() {}
    openLogin() {
        console.log('openlogin');
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
    }
}

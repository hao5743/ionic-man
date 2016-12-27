import { Component, Input } from '@angular/core';
import { TopicInterface } from '../interfaces/index';

@Component({
    selector: 'topic-item',
    template: `
    <ion-item>
       <ion-thumbnail item-right>
        <img src="{{topic.author.avatar_url}}" alt="没有图片">
      </ion-thumbnail>
       <p class="p1-in-item">
        <span class="good" *ngIf='topic.good'>精华</span>
        <span class="top" *ngIf='topic.top'>置顶</span>
        <span class="tab">{{topic.tab | topictab}}</span>
        <span>{{topic.author.loginname}}</span>
        <span style="float: right;">{{topic.last_reply_at | moment:"auto"}}</span>
      </p>
      <h3 class="p-in-item">
        {{topic.title}}
      </h3>
      <!--<p class="p-in-item">{{topic.content}}</p>-->
      <p class="visit_count">
        {{topic.visit_count}}阅读&nbsp;{{topic.reply_count}}回复&nbsp;
        <!--{{topic.create_at | moment:"auto"}}创建-->
      </p>
    </ion-item>
    `,
    styles:[`
     .visit_count{
         color:gray;
         font-size: small;
     }
     .p1-in-item{
        white-space: nowrap;
        overflow: hidden;
        height: 23px;
        line-height: 23px;
    }
    .p-in-item{
        line-height: 23px;
        max-height: 46px;
        min-height: 23px;
        overflow: hidden;
        word-wrap:break-word;
        word-break:break-all;
        white-space: normal;
    }
    `
    ]
})

export class TopicItemComponent {
    @Input()
    topic: TopicInterface;
}

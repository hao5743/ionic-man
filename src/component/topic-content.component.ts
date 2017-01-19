import { Component, Input } from '@angular/core';

@Component({
    selector: 'topic-content',
    template: `
    <div [innerHTML]="content" class="inner-html"></div>
`,
    styles:[`
       .inner-html{
            font-size: 17px;
            color: black;
    }
    `
    ]
})
export class TopicContentComponent {
    @Input()
    content: string;
}

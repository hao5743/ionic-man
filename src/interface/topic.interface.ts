//主题
import {ReplyInterface} from "./reply.interface";
export interface TopicInterface{
    id:string,
    author_id:string,
    tab:string,
    content:string,
    title:string,
    last_reply_at:string,
    good:boolean,
    top:boolean,
    reply_count:number,
    visit_count:number,
    create_at:string,
    author:{
        loginname:string,
        avatar_url:ConstrainDOMString
    },
    replies?:ReplyInterface[],    //可选，查询主题数组时没有
    is_collect?:boolean           //可选
}

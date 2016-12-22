import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Api,Config} from "./index";

@Injectable()
export class DataApi {
  constructor(private http: Http,private api:Api, private config:Config) {}

/**
 *  主题列表
 *  page Number 页数 
 *  tab String 主题分类。目前有 ask share job good 
 *  limit Number 每一页的主题数量 
 *  mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown格式文本。 
 */
  getTopics(page=0,limit=this.config.pageLimit,tab='all',mdrender=true): any{
      return this.api.get('/topics',{page,limit,tab,mdrender})
  }
/**
 *  主题详情 
 *  mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。 
 *  accesstoken String 当需要知道一个主题是否被特定用户收藏时，才需要带此参数。会影响返回值中的 is_collect 值
 */
  getTopic(id):any{
    return this.api.get('/topic/'+id)
  }

/**
* post /topics 新建主题 
* 接收 post 参数 
* accesstoken String 用户的 accessToken 
* title String 标题 
* tab String 目前有 ask share job 
* content String 主体内容 
* 返回值示例 
* {success: true, topic_id: '5433d5e4e737cbe96dcef312'} 
 */
  newTopic(obj):any{
      return this.api.post('/topics',obj);
  }

/**
* post /topics/update 编辑主题 
* 接收 post 参数 
* accesstoken String 用户的 accessToken 
* topic_id String 主题 id 
* title String 标题 
* tab String 目前有 ask share job 
* content String 主体内容 
* 返回值示例 
* {success: true, topic_id: '5433d5e4e737cbe96dcef312'} 
 */
  updateTopic(obj):any{
      return this.api.post('/topics/update',obj);
  }


}


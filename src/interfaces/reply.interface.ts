//回复
export interface ReplyInterface{
  id:string,
  author:{
      loginname:string,
      avatar_url:string
  },
  content:string,
  ups:string[],
  create_at:string,
  reply_id?:any,
  myup?:boolean     //存储我是否点过赞
}

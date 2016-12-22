//用户详情
export interface UserInterface{
    loginname:string,
    avatar_url:string,
    githubUsername:string,
    create_at:string,
    score:number,
    recent_topics:{
        id:string,
        author:{
            loginname:string,
            avatar_url:string
        },
        title:string,
        last_reply_at:string
    }[]
}
//message
export interface MessageInterface{
    id:string,
    type:string,  //at, reply
    has_read:boolean,
    create_at:string
    author:{
        loginname:string,
        avatar_url:string
    },
    topic:{
        id:string,
        title:string
    },
    reply:{
        id:string,
        content:string,
        ups:any[],
        create_at:string
    }
}
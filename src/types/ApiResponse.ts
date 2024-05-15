import { Message } from "@/model/User";

export interface ApiRepsonse{
    success:boolean,
    message:string,
    isAcceptingMessage?:boolean,
    messages?:Array<Message>
}
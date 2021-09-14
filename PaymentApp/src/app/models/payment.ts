import { User } from "./user";

export class Payment{
    _id: String
    user:User
    amount:number
    status:String
    method:String
    createdAt:Date
}
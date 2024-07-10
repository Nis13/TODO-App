export interface User{
    id:number,
    name:string,
    email:string,
    password:string
}

export interface GetUserQuery{
    q?:string;
}

export interface Decoded{
    id:string,
    name:string,
    email:string,
}
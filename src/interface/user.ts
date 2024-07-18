export interface User{
    id:number,
    name:string,
    email:string,
    password:string,
    permissions:string[]
}

export interface GetUserQuery{
    q?:string,
    page?:number,
    size?:number

}

// export interface Decoded{
//     id:string,
//     name:string,
//     email:string,
// }
import { permission } from "process";
import { GetUserQuery, User } from "../interface/user";

const users:User[]=[
    {
        "name": "user 3",
    "email": "abc@gmail.com",
    "password": "$2b$10$AKn0qB51uGY384uKcEB1.OTKM4iBc81qSSHg6Gf.AX7UnRrjIDv8u",
    id: 1,
    permissions: ['admin']

    }
];

export function getUserById(id:number){
    return users.find(({id:userId})=>userId === id);
};

export function createUser(user: User){
    const newUser = {
        ...user,
        id: users[users.length - 1].id + 1,
        permissions: ['user']
      };
    
      users.push(newUser);
      return newUser;
}

export function getUsers(){
    return users;
}

export function getUserByEmail(email:string){
    return users.find(({email:userEmail})=>userEmail=== email);
};
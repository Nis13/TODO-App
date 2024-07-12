import { GetUserQuery, User } from "../interface/user";
import loggerWithNameSpace from "../utilis/logger";


const logger = loggerWithNameSpace("User Model");

let users:User[]=[
    {
    "name": "user 3",
    "email": "abc@gmail.com",
    "password": "$2b$10$AKn0qB51uGY384uKcEB1.OTKM4iBc81qSSHg6Gf.AX7UnRrjIDv8u",
    id: 1,
    permissions: ['admin']

    }
];

export function getUsers(){
    logger.info(`get all users`);
    return users;
}

export function getUserById(id:number){
    logger.info(`get user by id`);
    return users.find(({id:userId})=>userId === id);
};

export function getUserByQuery(query:GetUserQuery){
    const { q } = query;
    if (q){
        return users.find(({id:userId})=>userId === parseInt(q));
    }
};

export function createUser(user: User){
    logger.info(`create user`);
    const newUser = {
        ...user,
        id: users[users.length - 1].id + 1,
        permissions: ['user']
      };
    
      users.push(newUser);
      return newUser;
}

export function getUserByEmail(email:string){
    logger.info(`get user by email`);
    return users.find(({email:userEmail})=>userEmail=== email);
};

export const updateUser = (id: number, updatedUser: User): User => {
    logger.info(`update user by id`);
    let user = users.find(({ id: userId }) => userId === id);
    user = { ...user, ...updatedUser };
    users = [...users.filter(({ id: userId }) => userId !== id), user];
  
    return user;
  };

export function deleteUser(id: number) {
    logger.info(`delete user by id`);
    return (users = users.filter((user) =>user.id !== id));
}

import { permission } from "process";
import { GetUserQuery, User } from "../interface/user";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";


const logger = loggerWithNameSpace("User Model");


export class UserModel extends BaseModel {

    static async create(user:User){
        const userToCreate = {
            name: user.name,
            email: user.email,
            password: user.password,
        };
        const query = await this.queryBuilder().insert(userToCreate).table("users");



        if (query){
            const userPermission = [6,7,8,9,10,11,12,13];
            const userid = await this.queryBuilder()
            .select('id')
            .table("users")
            .where("email",user.email)
            .first()

            for (const permissionId of userPermission){
                await this.queryBuilder().insert({"userId":userid.id,"permissionId":permissionId}).table("userPermission");
            }
        }

        const createdUser = await this.queryBuilder()
        .select('id','name','email')
        .table("users")
        .where("email",user.email)

        return createdUser;

    }

    static async update(id:number, user:User){
        const userToUpdate = {
            name: user.name,
            email: user.email,
            password: user.password,
            updatedAt: new Date(),
        };

        const query = this.queryBuilder().update(userToUpdate).table("users").where({id});

        console.log(query.toString());
        await query;
    }

    static async getUsers(filter:GetUserQuery){
        const { q } = filter;

        const query = this.queryBuilder()
        .select('id','name','email')
        .table("users")
        .limit(filter.size)
        .offset((filter.page - 1) * filter.size);

        if (q){
            query.whereLike("name",`%${q}%`);
        }

        return query;
    }
    static async count(filter:GetUserQuery){
        const { q } = filter;

        const query = this.queryBuilder()
        .count("*")
        .table("users")
        .first();
        
        if (q){
            query.whereLike("name",`%${q}%`);
        }

        return query;
    }

    static async getUserByEmail(email: string) {
        const query = this.queryBuilder().select('*').from("users").where("email", email).first();
        const result = await query;
        // const userPermissions =  this.queryBuilder().select('permission').from("permissions").innerjoin("permissions" , { "userPermissions.permission": "permission.id" })
        return result;
    }

    static async getUserById(id:number){
        const query = this.queryBuilder().select('*').from("users").where("id",id).first();
        const respone = await query;
        console.log(respone);
        const userPermission  = await this.queryBuilder()
        .select('*')
        .from({ p: "permissions" })
        .innerJoin({ u: "users" }, { "p.userId": "u.id" })
        .innerJoin({ up: "userPermission" }, { "p.id": "up.permissionId" })
        .where("u.id",id);
        console.log(userPermission);
        return respone;
    }

    static async deleteUser(id: number) {
        await this.queryBuilder().from("users").where('id', id).delete();
        return { message: 'User deleted successfully' };
    }

    static async authorizeUser(userId:number){
        const userPermissions = await this.queryBuilder()
        .select('permission')
        .from({ p: "permissions" })
        .innerJoin({ up: "userPermission" }, { "p.id": "up.permissionId" })
        .where("up.userId",userId);

        return userPermissions;
    }
};





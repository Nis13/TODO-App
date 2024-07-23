import bcrypt  from 'bcrypt';
import * as UserModel from "../../../model/user";
import sinon from "sinon";
import expect from "expect";
import { createUser, getUserByEmail, getUsers } from "../../../service/user";
import { User } from '../../../interface/user';
import { BadRequestError } from '../../../error/BadRequestError';

describe("User Service Test Suite", () => {
    //get all user test
    describe("getUsers", () => {
      let userModelGetAllUserStub: sinon.SinonStub;
  
      beforeEach(() => {
        userModelGetAllUserStub = sinon.stub(UserModel, "getUsers");
      });
  
      afterEach(() => {
        userModelGetAllUserStub.restore();
      });
  
      it("should return array of users", () => {
        userModelGetAllUserStub.returns([]);
        const output = getUsers();
        console.log(output);
        expect(output).toStrictEqual([]);
      });
    });

    describe("createUser", () => {
        let userModelGetUserByEmailStub: sinon.SinonStub;
        let bcryptHashStub: sinon.SinonStub;
        const user = {
          email: "test@test.com",
          name: "test",
          password: "thisispassword",
        };
        beforeEach(() => {
          userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
          bcryptHashStub = sinon.stub(bcrypt, "hash");
        });
    
        afterEach(() => {
          userModelGetUserByEmailStub.restore();
          bcryptHashStub.restore();
        });
    
        //successful user create
        it("should return a object with message 'User created successfully' on successful user creation", async () => {
          userModelGetUserByEmailStub.returns(undefined);
          bcryptHashStub.resolves("hashedPassword");
    
          const response = await createUser(user as User);
    
          const expectedOutput = {
            message: "User created successfully",
          };
    
          expect(response).toStrictEqual(expectedOutput);
        });

        it("should throw bad request error on 'unsuccessful user create' ", async () => {
            userModelGetUserByEmailStub.returns(user);
            bcryptHashStub.resolves("hashedPassword");
      
            expect(async () => await createUser(user as User)).rejects.toThrowError(
              new BadRequestError("User already exists")
            );
          });
        });

        describe("getUserByEmail", () => {
            let testEmail = "test@test.com";
            let user: User = {
              id: 1,
              name: "test",
              email: testEmail,
              password: "password",
              permissions :['user']
            };
            let userModelGetUserByEmailStub: sinon.SinonStub;
        
            beforeEach(() => {
              userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
            });
        
            afterEach(() => {
              userModelGetUserByEmailStub.restore();
            });
        
            it("should return user if user is found", () => {
              userModelGetUserByEmailStub.returns(user);
        
              const response = getUserByEmail(testEmail);
              expect(response).toStrictEqual(user);
            });
        
            it("should throw undefined if user is not found", () => {
              userModelGetUserByEmailStub.returns(undefined);
        
              const response = getUserByEmail(testEmail);
              expect(response).toBe(undefined);
            });
          });
})



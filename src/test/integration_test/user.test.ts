import express from "express";
import request from "supertest";
import routes from "../../routes/index";
import expect from "expect";

describe("User Integration Test Suite", () => {
    const app = express();
    app.use(express.json());
    app.use(routes);
    let accessToken: string;
  
    before(async () => {
      let userCredential = {
        email: "abc@gmail.com",
        password: "abc123",
      };
      const loginResponse = await request(app)
        .post("/auth/login")
        .send(userCredential);
  
      accessToken = loginResponse.body.data.accessToken;
    });
  
    describe("should create a new user", () => {
      let user = {
        name: "test",
        email: "test@test.com",
        password: "Test@123",
      };
      it("Should create a new user", async () => {
        let expectedOutput = {
          message: "User created successfully",
        };
        const response = await request(app)
          .post("/users/signup")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(user);
  
        console.log(response.body);
        expect(response.body).toStrictEqual(expectedOutput);
      });
    });
  });
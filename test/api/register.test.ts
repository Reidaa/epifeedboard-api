import request from "supertest";
import app from "../../src/app";

describe("POST /register", () => {
    const data = {
        "email": "test.email@gmail.com",
        // missing username
        "password": "test"
    };
    it("should return 400 Bad request", () => {
        return request(app)
            .post("/register")
            .send(data)
            .expect(400);
    });
});

describe("POST /register", () => {
    const data = {
        "email": "test.email@gmail.com",
        "username": "test",
        "password": "test"
    };
    it("should return 201 created", () => {
        return request(app)
            .post("/register")
            .send(data)
            .expect(409);
    });
});

describe("POST /register", () => {
    const data = {
        "email": "test.email@gmail.com",
        "username": "test",
        "password": "test"
    };
    it("should return 409 conflict", () => {
        return request(app)
            .post("/register")
            .send(data)
            .expect(409);
    });
});


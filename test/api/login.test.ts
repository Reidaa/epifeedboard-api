import request from "supertest";
import app from "../../src/app";

describe("POST /login", () => {
    const data = {
        "username": "test",
        // missing username
        "password": "test2"
    };
    it("should return 401 Unauthorized", () => {
        return request(app)
            .post("/login")
            .send(data)
            .expect(401);
    });
});

describe("POST /login", () => {
    const data = {
        "username": "test",
        "password": "test"
    };
    it("should return 200 OK", () => {
        return request(app)
            .post("/login")
            .send(data)
            .expect(200);
    });
});

describe("POST /login", () => {
    const data = {
        "username": "test1",
        "password": "test"
    };
    it("should return 401 Unauthorized", () => {
        return request(app)
            .post("/login")
            .send(data)
            .expect(401);
    });
});


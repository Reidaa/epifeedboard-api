import request from "supertest";
import app from "../../src/app";

describe("POST /user", () => {
    const data = {
        "username": "test",
        // missing username
        "id": "test2"
    };
    it("should return 500 internal error", () => {
        return request(app)
            .get("/user")
            .send(data)
            .expect(500);
    });
});

describe("POST /user", () => {
    const data = {
        "username": "test",
        "id": 4
    };
    it("should return 200 OK", () => {
        return request(app)
            .get("/user")
            .send(data)
            .expect(200);
    });
});

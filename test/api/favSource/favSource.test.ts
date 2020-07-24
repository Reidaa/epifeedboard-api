import request from "supertest";
import app from "../../../src/app";

describe("POST /favSource", () => {
    const data = {
        // missing category
    };

    it("should return 401 BAD REQUEST", () => {
        return request(app)
            .post("/favSource")
            .send(data)
            .expect(401);
    });
});

describe("POST /favSource", () => {
    const data = {
        // missing category
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTk0MDc5NTg0fQ.MZk8bg3O3ic_mV9I1YOyagPcSUboo41fa6YvpVlSe2g";

    it("should return 400 BAD REQUEST", () => {
        return request(app)
            .post("/favSource")
            .set("Authorization", "Bearer " + token)
            .send(data)
            .expect(400);
    });
});

describe("POST /favSource", () => {
    const data = {
        "source": "test",
        "status": "like"
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTk0MDc5NTg0fQ.MZk8bg3O3ic_mV9I1YOyagPcSUboo41fa6YvpVlSe2g";

    it("should return 200 OK", () => {
        return request(app)
            .post("/favSource")
            .set("Authorization", "Bearer " + token)
            .send(data)
            .expect(200);
    });
});

describe("POST /favSource", () => {
    const data = {
        "source": "test",
        "status": "dislike"
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTk0MDc5NTg0fQ.MZk8bg3O3ic_mV9I1YOyagPcSUboo41fa6YvpVlSe2g";

    it("should return 200 OK", () => {
        return request(app)
            .post("/favSource")
            .set("Authorization", "Bearer " + token)
            .send(data)
            .expect(200);
    });
});
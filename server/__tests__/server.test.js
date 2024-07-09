const { text } = require("express");
const request = require("supertest");
//const io = require("socket.io-client");
//const mongoose = require("mongoose");

const baseURL = `https://${process.env.EXPO_PUBLIC_HOST}`;

const testUser = {
  firstName: "test",
  lastName: "testov",
  email: "test@test.com",
  password: "test",
  gender: "male",
};
let testUserID;

const testUser2 = {
  firstName: "test2",
  lastName: "testov2",
  email: "test2@test.com",
  password: "test2",
  gender: "male",
};
let testUserID2;

const testUser3 = {
  firstName: "test3",
  lastName: "testov3",
  email: "test3@test.com",
  password: "test3",
  gender: "male",
};
let testUserID3;

describe("Server Tests", () => {
  it("should respond with Hello World on GET /", async () => {
    const res = await request(baseURL).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello World!");
  });

  it("should respond with 404 on non-existing route", async () => {
    const res = await request(baseURL).get("/non-existing-route");
    expect(res.statusCode).toEqual(404);
  });

  it("should response with error message on creating exists user", async () => {
    const res = await request(baseURL)
      .post("/register")
      .send({ email: "", password: "" });
    expect(res.body.data).toBe("User already exists");
  });

  it("should create new test user", async () => {
    const res = await request(baseURL).post("/register").send(testUser);
    expect(res.body.status).toBe("ok");
    testUserID = res.body.data.id;
  });

  it("should create new test user", async () => {
    const res = await request(baseURL).post("/register").send(testUser2);
    expect(res.body.status).toBe("ok");
    testUserID2 = res.body.data.id;
  });

  it("should create new test user", async () => {
    const res = await request(baseURL).post("/register").send(testUser3);
    expect(res.body.status).toBe("ok");
    testUserID3 = res.body.data.id;
  });

  it("should delete user successfully", async () => {
    const res = await request(baseURL)
      .post("/delete")
      .send({ id: testUserID3 });
    expect(res.body.status).toBe("ok");
  });

  it("should update user successfully", async () => {
    const res = await request(baseURL)
      .post(`/update/${testUserID2}`)
      .send({
        age: 69,
        trip_planning: {
          country: "TestCountry",
          startDate: "2024-07-01",
          endDate: "2024-07-02",
        },
      });
    expect(res.body.status).toBe("ok");
  });

  it("should do not update user with invalid id", async () => {
    const res = await request(baseURL)
      .post("/update/1671a400bc5e767ef65082d1")
      .send({ age: 69 });
    expect(res.body.data).toBe("User not found");
  });

  it("should get user by id", async () => {
    const res = await request(baseURL).get(`/user/${testUserID}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should not get user by invalid id", async () => {
    const res = await request(baseURL).get("/user/1671a400bc5e767ef65082d1");
    expect(res.body.msg).toBe("User not found");
  });

  it("should login successfully", async () => {
    const res = await request(baseURL)
      .post("/login")
      .send({ email: testUser.email, password: testUser.password });
    expect(res.body.status).toBe("ok");
  });

  it("should not login with invalid password", async () => {
    const res = await request(baseURL)
      .post("/login")
      .send({ email: testUser.email, password: "invalid" });
    expect(res.body.data).toBe("Incorrect password");
  });

  it("should not login with invalid email", async () => {
    const res = await request(baseURL)
      .post("/login")
      .send({ email: "invalid", password: testUser.password });
    expect(res.body.data).toBe("User does not exist");
  });

  it("should search user by trip planning", async () => {
    const res = await request(baseURL).post("/search").send({
      country: "TestCountry",
      startDate: "2024-07-01",
      endDate: "2024-07-02",
      userId: testUserID,
    });
    expect(res.body.status).toBe("ok");
  });

  it("should do not find user by trip planning", async () => {
    const res = await request(baseURL).post("/search").send({
      country: "TestCountry2",
      startDate: "2024-07-01",
      endDate: "2024-07-02",
      userId: testUserID2,
    });
    expect(res.body.data).toBe("Users not found");
  });

  it("should get error on search with invalid data", async () => {
    const res = await request(baseURL).post("/search").send({
      country: 101,
    });
    expect(res.body.data).toBe("Users not found");
  });

  it("should add review successfully", async () => {
    const res = await request(baseURL)
      .post(`/add_review/${testUserID}`)
      .send({
        review: {
          name: "test2",
          age: 69,
          location: "TestCountry",
          rating: 5,
          text: "Test review",
          leftBy: testUserID2,
        },
      });
    expect(res.body.status).toBe("ok");
  });

  it("should not add review with invalid id", async () => {
    const res = await request(baseURL)
      .post("/add_review/1671a400bc5e767ef65082d1")
      .send({
        review: {
          name: "test2",
          age: 69,
          location: "TestCountry",
          rating: 5,
          text: "Test review",
          leftBy: testUserID2,
        },
      });
    expect(res.body.data).toBe("User not found");
  });

  it("should get reviews by user id", async () => {
    const res = await request(baseURL).get(`/get_reviews/${testUserID}`);
    expect(res.statusCode).toEqual(200);
  });

  it("should not get reviews by invalid user id", async () => {
    const res = await request(baseURL).get(
      "/get_reviews/1671a400bc5e767ef65082d1"
    );
    expect(res.body.data).toBe("User not found");
  });

  it("should not to get messages", async () => {
    const res = await request(baseURL)
      .get("/messages")
      .query({ senderId: testUserID, receiverId: testUserID2 });
    expect(res.body.data).toBe("Chat not found");
  });

  it("should not find chat users for non-existing user ID", async () => {
    const nonExistingUserId = "60f8f0f0f0f0f0f0f0f0f0f0";
    const res = await request(baseURL).get(`/chat_users/${nonExistingUserId}`);
    expect(res.body.status).toBe("ok");
  });

  it("should return an error if messages not found", async () => {
    const invalidMessages = ["60f8f0f0f0f0f0f0f0f0f0f0"]; // Несуществующие ID сообщений
    const res = await request(baseURL)
      .post("/mark_as_read")
      .send({ messages: invalidMessages });
    expect(res.body.status).toBe("ok");
  });

  it("should create a match", async () => {
    const res = await request(baseURL)
      .post("/create_match")
      .send({ user1Id: testUserID, user2Id: testUserID2 });
    expect(res.body.status).toBe("ok");
  });

  it("should not create a match if record already exists", async () => {
    const res = await request(baseURL)
      .post("/create_match")
      .send({ user1Id: testUserID, user2Id: testUserID2 });
    expect(res.body.data).toBe("Match record already exists");
  });

  it("should update match status", async () => {
    const res = await request(baseURL).post("/update_match").send({
      user1Id: testUserID,
      user2Id: testUserID2,
      clickedBy: testUserID,
    });
    expect(res.body.status).toBe("ok");
  });

  it("should not update match status", async () => {
    const res = await request(baseURL).post("/update_match").send({
      user1Id: testUserID,
      user2Id: "1671a400bc5e767ef65082d1",
      clickedBy: testUserID,
    });
    expect(res.body.status).toBe("error");
  });

  it("should check if letsgo button is clicked", async () => {
    const res = await request(baseURL)
      .post("/check_letsgo_btn")
      .send({ user1Id: testUserID, user2Id: testUserID2 });
    expect(res.body.status).toBe("ok");
  });

  it("should not check if letsgo button if match not found", async () => {
    const res = await request(baseURL)
      .post("/check_letsgo_btn")
      .send({ user1Id: testUserID, user2Id: "1671a400bc5e767ef65082d1" });
    expect(res.body.status).toBe("error");
  });

  it("should check if both users clicked the letsgo button", async () => {
    const res = await request(baseURL)
      .post("/check_both_clicked")
      .send({ user1Id: testUserID, user2Id: testUserID2 });
    expect(res.body.status).toBe("ok");
  });

  it("should not check if both users clicked the letsgo button if match not found", async () => {
    const res = await request(baseURL)
      .post("/check_both_clicked")
      .send({ user1Id: testUserID, user2Id: "1671a400bc5e767ef65082d1" });
    expect(res.body.status).toBe("error");
  });
});

// После тестов можно удалить созданного пользователя
afterAll(async () => {
  await request(baseURL).post("/delete").send({ id: testUserID });
  await request(baseURL).post("/delete").send({ id: testUserID2 });
});

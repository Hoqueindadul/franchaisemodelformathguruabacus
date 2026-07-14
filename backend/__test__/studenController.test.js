import { register, login, logout } from "../controlers/student.controler.js";
import Students from "../models/student.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookies from "../jwt/authToken.js";

jest.mock("../models/student.model.js");
jest.mock("bcrypt");
jest.mock("../jwt/authToken.js");

describe("Auth Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("register()", () => {
    it("should return 400 if required fields are missing", async () => {
      req.body = { email: "test@test.com" };
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "All fields are required",
      });
    });

    it("should return 400 if user already exists", async () => {
      req.body = {
        firstName: "John",
        lastName: "Doe",
        role: "student",
        phone: "1234567890",
        email: "existing@test.com",
        password: "password123",
      };

      Students.findOne.mockResolvedValue({ email: "existing@test.com" });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Phone or Email already registered",
      });
    });

    it("should register a user successfully", async () => {
      req.body = {
        firstName: "John",
        lastName: "Doe",
        role: "student",
        phone: "1234567890",
        email: "new@test.com",
        password: "password123",
      };

      Students.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword123");
      Students.prototype.save = jest.fn().mockResolvedValue(true);

      // Updated to plural to match your controller
      createTokenAndSaveCookies.mockResolvedValue("mockedToken");

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "User registered successfully" }),
      );
    });
  });
});

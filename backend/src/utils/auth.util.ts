import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Action } from "routing-controllers";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-me";

// 1. Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// 2. Compare a password with a hash
export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashed);
};

// 3. Generate a JWT Token
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
};


export const authorizationChecker = async (action: Action): Promise<boolean> => {
  const token = action.request.headers["authorization"]?.split(" ")[1];

  if (!token) return false;

  try {
    const secret = process.env.JWT_SECRET || "super-secret-key-change-me";
    const decoded = jwt.verify(token, secret);
    action.request.user = decoded; 
    return true;
  } catch (error) {
    return false;
  }
};

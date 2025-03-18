import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(useValue, salt);
};

export const compareString = async (userPassword, password) => {
  return await bcrypt.compare(userPassword, password);
};

//JSON WEBTOKEN

export function createJWT(id) {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }
  try {
    return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.error("Error creating JWT:", error);
    throw new Error("Failed to generate JWT");
  }
}


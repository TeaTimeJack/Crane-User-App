import { dbneon } from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (
  email,
  password,
  first_name,
  last_name,
  phone_number,
  role
) => {
  const trx = await dbneon.transaction();
  try {
    const hashPassword = await bcrypt.hash(password + "", 10);

    const [user] = await trx("users").insert(
      {
        email: email.toLowerCase(),
        password_hash: hashPassword,
        first_name: first_name.toLowerCase(),
        last_name: last_name.toLowerCase(),
        phone_number: phone_number,
        role,
      },
      ["email", "id", "first_name", "last_name", "phone_number", "role"]
    );

    await trx.commit();
  } catch (err) {
    await trx.rollback();
    console.log("the error=", err);
    throw err;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await dbneon("users")
      .select(
        "id",
        "email",
        "password_hash",
        "first_name",
        "last_name",
        "phone_number",
        "role"
      )
      .where({ email: email.toLowerCase() })
      .first();
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserByUserID = async (id) => {
  try {
    const user = await dbneon("users")
      .select(
        "id",
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "role"
      )
      .where({ id })
      .first();
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const users = await dbneon("users").select(
      "id",
      "email",
      "first_name",
      "last_name",
      "phone_number",
      "role"
    );
    return users;
  } catch (error) {
    throw error;
  }
};

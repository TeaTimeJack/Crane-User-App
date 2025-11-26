import { dbneon } from "../config/db.js";
import bcrypt from "bcrypt";

export const registerUser = async (userInfoRegister, licenseInfoRegister) => {
  const { email, password, first_name, last_name, phone_number, role } =
    userInfoRegister;
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
        role: role,
      },
      ["email", "id", "first_name", "last_name", "phone_number", "role"]
    );

    if (licenseInfoRegister !== null) {
      const {
        license_number,
        certification,
        license_max_load,
        start_date,
        end_date,
      } = licenseInfoRegister;
      const [license] = await trx("licenses").insert(
        {
          user_id: user.id,
          license_number,
          certification,
          license_max_load,
          start_date,
          end_date,
        },
        [
          "licenses_id",
          "user_id",
          "license_number",
          "certification",
          "license_max_load",
          "start_date",
          "end_date",
        ]
      );
    }

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
      .select("id", "email", "first_name", "last_name", "phone_number", "role")
      .where({ id })
      .first();
    return user;
  } catch (error) {
    throw error;
  }
};

export const getLicenseByUserID = async (id) => {
  try {
    const userWithLicense = await dbneon("users")
      .select(
        "licenses.licenses_id",
        "licenses.user_id",
        "licenses.license_number",
        "licenses.certification",
        "licenses.license_max_load",
        "licenses.start_date",
        "licenses.end_date"
      )
      .leftJoin("licenses", "users.id", "licenses.user_id")
      .where("users.id", id)
      .first();

    return userWithLicense;
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

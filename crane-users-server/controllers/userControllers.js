import {
  registerUser,
  getUserByEmail,
  getUsers,
  getUserByUserID,
  getLicenseByUserID,
} from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const validateData = (data) => {
  Object.values(data).forEach((value) => {
    if (!value) {
      data = null;
      return data;
    }
  });
  return data;
};

export const register = async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    role,
    license_number,
    certification,
    license_max_load,
    start_date,
    end_date,
  } = req.body;
  const userInfoRegister = {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    role,
  };
  const licenseInfoRegister = {
    license_number,
    certification,
    license_max_load,
    start_date,
    end_date,
  };
  const licenseInfoRegisterValidated = validateData(licenseInfoRegister);
  try {
    const user = await registerUser(
      userInfoRegister,
      licenseInfoRegisterValidated
    );

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.code === "23505") {
      res.status(404).json({ message: `Email ${email} already exists...` });
    }
    res.status(500).json({ message: "internall error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: `User not found` });
      return;
    }

    const match = await bcrypt.compare(password + "", user.password_hash);
    if (!match) {
      res.status(404).json({ message: `Wrong password` });
      return;
    }

    const SECRET = process.env.ACCESS_TOKEN_SECRET;

    // generate accsess token for 1 day
    const accessToken = jwt.sign(
      {
        userid: user.id,
        email: user.email,
        userfirstName: user.first_name,
        userLastName: user.last_name,
        userPhoneNumber: user.phone_number,
        userRole: user.role,
      },
      SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("apptoken", accessToken, {
      httpOnly: true,
      // JSON: true,
      maxAge: 86400 * 1000, //same as 1 day
    });

    res.status(200).json({
      message: "login succesfulllly",
      user: {
        userid: user.id,
        email: user.email,
        userfirstName: user.first_name,
        userLastName: user.last_name,
        userPhoneNumber: user.phone_number,
        userRole: user.role,
      },
      token: accessToken,
    });
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

export const users = async (req, res) => {
  try {
    // console.log(req.user.userid);
    // console.log(req.user.email);
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

export const userInfo = async (req, res) => {
  try {
    console.log(req.user.userid);
    console.log(req.user.email);
    const theUserInfo = await getUserByUserID(req.user.userid);
    res.json(theUserInfo);
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

export const userLicense = async (req, res) => {
  try {
    const theUserInfo = await getUserByUserID(req.user.userid);
    if (!theUserInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    if (theUserInfo.role === "guest") {
      res
        .status(404)
        .json({ message: "The User's Role is Guest - he has no license" });
    }
    const theUserLicenses = await getLicenseByUserID(theUserInfo.id);
    res.json(theUserLicenses);
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

export const logOut = (req, res) => {
  res.clearCookie("apptoken");
  req.cookies["apptoken"] = null;
  delete req.cookies["apptoken"];
  req.user = null;
  delete req.user;

  res.sendStatus(200);
};

export const verifyAuth = (req, res) => {
  const { userid, email } = req.user;
  const { ACCESS_TOKEN_SECRET } = process.env;

  /* Generate new token */

  const netAccessToken = jwt.sign({ userid, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("apptoken", netAccessToken, {
    maxAge: 86400 * 1000, //same as 1 day
    httpOnly: true,
  });

  res.status(200).json({
    message: "New Access Token",
    user: { userid, email },
    token: netAccessToken,
  });
};

export const getUserInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByUserID(id);
    res.json(user);
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

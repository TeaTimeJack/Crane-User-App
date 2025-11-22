import { registerUser, getUserByEmail, getUsers } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from 'dotenv'

config();

export const register = async (req, res) => {
  const { email, password, firstName, lastName, phoneNum } = req.body;
  try {
    const user = await registerUser(email, password);
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

    const match = await bcrypt.compare(password + "", user.password);
    if (!match) {
      res.status(404).json({ message: `Wrong password` });
      return;
    }

    const SECRET = process.env.ACCESS_TOKEN_SECRET;

    // generate accsess token for 1 day
    const accessToken = jwt.sign(
      { userid: user.id, email: user.email, userfirstName: user.first_name, userLastName: user.last_name, userPhoneNumber: user.phone_number},
      SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("apptoken", accessToken, {
      httpOnly: true,
      maxAge: 86400 * 1000, //same as 1 day
    });

    res.status(200).json({
      message: "login succesfulllly",
      user: {  userid: user.id, email: user.email, userfirstName: user.first_name, userLastName: user.last_name, userPhoneNumber: user.phone_number },
      token: accessToken,
    });
  } catch (error) {
    console.log("error=>", error);
    res.status(500).json({ message: "internall error" });
  }
};

export const users = async (req, res) => {
  try {
    console.log(req.user.userid);
    console.log(req.user.email);

    const users = await getUsers();
    res.json(users);
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

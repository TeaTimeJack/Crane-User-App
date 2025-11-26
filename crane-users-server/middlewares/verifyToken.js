import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const { ACCESS_TOKEN_SECRET } = process.env;

export const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.apptoken || req.headers["apptoken"]; //const token = req.cookie.['appToken']
  // console.log("THis is a Cookie: ", req.cookies);

  if (!token) {
    res.status(401).json({ message: "Unauthorized user" });
    return;
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Forbiden user" });
      return;
    }

    // console.log("decoded:", decoded);
    req.user = decoded;

    next();
  });
};

import { DecodedToken } from "../interfaces";

const jwt = require("jsonwebtoken")

const {JWT_SECRET} = process.env
export const verifyJWT = (token:string):Promise<DecodedToken> => new Promise((res, rej) => jwt.verify(token, JWT_SECRET, (err:Error, decoded:DecodedToken) => {
    if (err)
        res({user_id: null, birthday: null, status: err.message})
    else 
        res(decoded);
}));

export const generateJWT = (payload:Object):Promise<String> => new Promise((res, rej) =>
jwt.sign(
  payload,
  JWT_SECRET,
  { expiresIn: '30 min' }, //value is a string (expressing the time ) or a number (in seconds)
  (err:Error, token:String) => {
    if (err) rej(err); //reject
    res(token); //sets response
  }
)
);


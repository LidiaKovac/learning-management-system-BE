
import jwt, { Secret } from "jsonwebtoken"
import { config } from "dotenv"
config()
const { JWT_SECRET } = process.env
export const verifyJWT = (token: string): Promise<DecodedToken> => new Promise((res, rej) => jwt.verify(token, JWT_SECRET as Secret, (err, decoded) => {
  if (err)
    res({ user_id: null, birthday: null, status: err.message })
  else
    res(decoded as DecodedToken);
}));

export const generateJWT = (payload: Object): Promise<string> => new Promise((res, rej) =>

  jwt.sign(payload, JWT_SECRET as Secret, { expiresIn: "30 min" }, (err, token) => {
    if (err) rej(err)
    else res(token as string)
  })
);


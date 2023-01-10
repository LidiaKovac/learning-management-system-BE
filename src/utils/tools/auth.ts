import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env
export const verifyJWT = (token: string): Promise<DecodedToken> => new Promise((res, rej) => jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
  if (err)
    res({ user_id: null, birthday: null, status: err.message })
  else
    res(decoded as DecodedToken);
}));

export const generateJWT = (payload: Object): Promise<String> => new Promise((res, rej) =>
  jwt.sign(
    payload,
    JWT_SECRET as string,
    { expiresIn: '30 min' }, //value is a string (expressing the time ) or a number (in seconds)
    (err: Error | null, token: String | undefined) => {
      if (err) rej(err); //reject
      res(token as string); //sets response
    }
  )
);


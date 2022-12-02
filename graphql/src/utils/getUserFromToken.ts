import jwt from 'jsonwebtoken';

export const getUserFromToken = (token: string) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SIGNATURE || '') as {
      userId: number;
    };
    return user;
  } catch (err) {
    return null;
  }
};
import { User, Prisma } from '@prisma/client';
import { Context } from '../..';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface SignupArgs {
  name: string;
  bio: string;
  credentials: {
    email: string;
    password: string;
  };
}

interface SigninArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (
    _: any,
    { name, bio, credentials }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;

    if (!validator.isEmail(email)) {
      return {
        userErrors: [
          {
            message: 'Invalid email',
          },
        ],
        token: null,
      };
    }

    if (!validator.isLength(password, { min: 5 })) {
      return {
        userErrors: [
          {
            message: 'Password must be at least 5 characters long',
          },
        ],
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: 'Name and bio are required',
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    await prisma.profile.create({
      data: {
        bio,
        userId: newUser.id,
      },
    });

    return {
      userErrors: [],
      token: jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        process.env.JWT_SIGNATURE || '',
        {
          expiresIn: 3600000,
        }
      ),
    };
  },
  signin: async (
    _: any,
    { credentials }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErrors: [{ message: 'Invalid credentials' }],
        token: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        userErrors: [{ message: 'Invalid credentials' }],
        token: null,
      };
    }

    return {
      userErrors: [],
      token: jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        process.env.JWT_SIGNATURE || '',
        {
          expiresIn: 3600000,
        }
      ),
    };
  },
};

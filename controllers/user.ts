import { User } from '../db/entities/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dataSource from '../db/dataSource.js';
import express from 'express';
const insertUser = (payload: User) => {
    return dataSource.manager.transaction(async transaction => {
      const newUser = User.create(payload);
      await transaction.save(newUser);
  });
}

const login = async (email: string, password: string) => {
try {
    const user = await User.findOneBy({
    email
    });

    const passwordMatching = await bcrypt.compare(password, user?.password || '');

    if (user && passwordMatching) {
    const token = jwt.sign(
        {
        email: user.email,
        userName: user.username
        },
        process.env.SECRET_KEY || '',
        {
        expiresIn: "30m"
        }
    );

    return token;
    } else {
    throw ("Invalid Username or password!");
    }
} catch (error) {
    throw ("Invalid Username or password!");
}
}

export { insertUser, login }
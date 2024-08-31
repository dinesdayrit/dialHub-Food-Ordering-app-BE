import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  //3. return user object to client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    //1. check if use exist
    if (existingUser) {
      return res.status(200).send();
    }
    //2. create use if not exist
    const newUser = new User(req.body);
    await newUser.save();

    //3. return user object to client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export default {
  createCurrentUser,
};

import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import { Category, CategoryModel } from "../models/category.js";

async function singup(req: Request, res: Response) {
  try {
    const { name, userName, mail, birthDate, password, role, category } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    if (await UserModel.findOne({ userName: userName })) {
      res
        .status(406)
        .send({ message: "There is already a user with the same username." });
      return;
    }
    const categories: Category[] | null = await CategoryModel.find({
      name: category
    });
    console.log(categories)

    const newUser = new UserModel({
      name: name,
      userName: userName,
      mail: mail,
      birthDate: birthDate,
      password: encryptedPassword,
      categories: categories,
      role: role,
    });

    const SECRET = process.env.JWT_SECRET;

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, userName: savedUser.userName, role: savedUser.role },
      SECRET!,
      {
        expiresIn: 86400, //24 hours
      }
    );
    console.log(savedUser);

    res.status(201).send({ message: `User singed up`, token });
    return;
  } catch (e) {
    res.status(500).send({ message: `Server error: ${e}` });
  }
}

async function singin(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;

    const user: User | null = await UserModel.findOne({ userName: userName });
    if (!user) {
      res.status(404).send({ message: `Username does not exist` });
      return;
    }

    // const salt = await bcrypt.genSalt(10);
    // const encryptedPassword = await bcrypt.hash(password, salt);

    if (!(await bcrypt.compare(password as string, user.password as string))) {
      res.status(404).send({ message: `Wrong password. Try again` });
      return;
    }

    const SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role },
      SECRET!,
      {
        expiresIn: 86400, //24 hours
      }
    );

    res.status(200).send({ message: "singin", token });
  } catch (e) {
    res.status(500).send({ message: `Server error: ${e}` });
  }
}

let router = express.Router();

router.post("/singup", singup);
router.post("/singin", singin);

export default router;

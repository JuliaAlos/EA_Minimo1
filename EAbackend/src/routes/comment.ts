import express, { Request, Response } from "express";
import { Schema } from "mongoose";
import { CommentModel } from "../models/comment.js";
import { UserModel, User } from "../models/user.js";

async function getAllComments(req: Request, res: Response) {
    try {
        await CommentModel.find().populate("user", "userName").sort("-createdAt").then(async (comments) => {
            res.status(200).send(comments);
        })
            .catch((error) => {
                res.status(400).send({ message: `Error get all comments: ${error}` });
            });
    } catch (e) {
        res.status(500).send({ message: `Server error: ${e}` });
    }
}

async function newComment(req: Request, res: Response) {
    try {
        const { userID, message } = req.body;
        const user = await UserModel.findById(userID)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: "User not found." });
                }
                return user;
            })
            .catch((error) => {
                return res.status(400).send({ message: `Error post comment: ${error}` });
            });

        const newComment = new CommentModel({
            user: user,
            message: message
        });
        await newComment.save().then((comment) => {
            res.status(200).send(res);
        }).catch((error) => {
            res.status(400).send({ message: `Error subscribe to club ${error}` });
        });

    } catch (e) {
        res.status(500).send({ message: `Server error: ${e}` });
    }
}

async function editComment(req: Request, res: Response) {
    try {
        const { idComment } = req.params;
        const { message } = req.body;

        await CommentModel.findByIdAndUpdate(idComment, { message: message, edited: true }).then(comment => {
            if (comment == null) {
                return res.status(404).send({ message: "Comment not found" });
            }
            res.status(200).send({ message: "Updated" });
        }).catch(error => {
            res.status(400).send({ message: `Error ${error}` });
        });
    } catch (e) {
        res.status(500).send({ message: `Server error: ${e}` });
    }
}

async function likeComment(req: Request, res: Response) {
    try {
        const { idComment } = req.params;
        const comment = await CommentModel.findById(idComment)
            .then((comment) => {
                if (comment) {
                    console.log("Estou en like" + comment)
                    return comment;
                }
                res.status(400).send({ message: `not found` });
            })
            .catch((error) => {
                res
                    .status(400)
                    .send({ message: `Error: ${error}` });
            });
        let likes = 0;
        const myInt: any = comment?.likes.toString();
        likes = parseInt(myInt) + 1;

        await CommentModel.findByIdAndUpdate(idComment, { likes: likes }).then(comment => {
            if (comment == null) {
                return res.status(404).send({ message: "Comment not found" });
            }
            res.status(200).send({ message: "Updated" });
        }).catch(error => {
            res.status(400).send({ message: `Error ${error}` });
        });
    } catch (e) {
        res.status(500).send({ message: `Server error: ${e}` });
    }
}

async function deleteComment(req: Request, res: Response) {
    try {
        const { idComment } = req.params;
        await CommentModel.findByIdAndDelete(idComment)
            .then((comment) => {
                if (comment) {
                    return res.status(200).send({ message: "Deleted!" });
                }
                res.status(404).send({ message: "The comment doesn't exist!" });
            })
            .catch((error) => {
                res.status(400).send({ message: `Error delete comment ${error}` });
            });
    } catch (e) {
        res.status(500).send({ message: `Server error: ${e}` });
    }
}


let router = express.Router();

router.get("/", getAllComments);
router.post("/", newComment);
router.put("/:idComment", editComment);
router.put("/like/:idComment", likeComment);
router.delete("/:idComment", deleteComment);
export default router;

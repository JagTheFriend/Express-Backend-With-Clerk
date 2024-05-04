import type { Request, Response } from "express";
import prisma from "../prismaClient";

export class CommentController {
  public async getComments(req: Request, res: Response) {
    const commentData = await prisma.comment.findMany({
      where: {
        postId: req.body.postId,
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ message: "get-comments", data: commentData });
  }

  public async createComment(req: Request, res: Response) {
    await prisma.comment.create({
      data: {
        body: req.body.body,
        authorId: req.body.authorId,
        postId: req.body.postId,
      },
    });
    return res.status(200).json({ message: "create-comment" });
  }

  public async deleteComment(req: Request, res: Response) {
    await prisma.comment.delete({
      where: {
        id: req.body.id,
        AND: {
          postId: req.body.postId,
          authorId: req.body.authorId,
        },
      },
    });
    return res.status(200).json({ message: "delete-comment" });
  }

  public async updateComment(req: Request, res: Response) {
    await prisma.comment.update({
      where: {
        id: req.body.id,
        AND: {
          postId: req.body.postId,
          authorId: req.body.authorId,
        },
      },
      data: {
        body: req.body.body,
      },
    });
    return res.status(200).json({ message: "update-comment" });
  }
}

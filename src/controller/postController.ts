import type { Request, Response } from "express";
import prisma from "../prismaClient";

export class PostController {
  public async getPosts(_req: Request, res: Response) {
    const posts = await prisma.post.findMany({ take: 10 });
    return res.status(200).json({ message: "get-posts", data: posts });
  }

  public async createPost(req: Request, res: Response) {
    await prisma.post.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        authorId: req.body.authorId,
      },
    });
    return res.status(200).json({ message: "create-post" });
  }

  public async deletePost(req: Request, res: Response) {
    await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "delete-post" });
  }

  public async updatePost(req: Request, res: Response) {
    await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });
    return res.status(200).json({ message: "update-post" });
  }
}

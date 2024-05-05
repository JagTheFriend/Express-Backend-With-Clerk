import type { RequireAuthProp } from "@clerk/clerk-sdk-node";
import type { Request, Response } from "express";
import prisma from "../prismaClient";

export class PostController {
  public async getPosts(_req: Request, res: Response) {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        comments: {
          take: 10,
          orderBy: { createdAt: "desc" },
          select: {
            authorId: true,
            body: true,
            createdAt: true,
            id: true,
            updatedAt: true,
            post: false,
            postId: false,
          },
        },
      },
    });
    return res.status(200).json({ message: "get-posts", data: posts });
  }

  public async createPost(req: RequireAuthProp<Request>, res: Response) {
    await prisma.post.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        authorId: req.auth.userId,
      },
    });
    return res.status(200).json({ message: "create-post" });
  }

  public async deletePost(req: RequireAuthProp<Request>, res: Response) {
    await prisma.post.delete({
      where: {
        id: req.body.id,
        AND: {
          authorId: req.auth.userId,
        },
      },
    });
    return res.status(200).json({ message: "delete-post" });
  }

  public async updatePost(req: RequireAuthProp<Request>, res: Response) {
    await prisma.post.update({
      where: {
        id: req.body.id,
        AND: {
          authorId: req.auth.userId,
        },
      },
      data: {
        title: req.body.title,
        body: req.body.body,
        published: req.body.published === "true",
      },
    });
    return res.status(200).json({ message: "update-post" });
  }
}

import { faker } from "@faker-js/faker";
import type { Request, Response } from "express";
import prisma from "../prismaClient";

export class PostController {
  public async getPosts(_req: Request, res: Response) {
    const posts = await prisma.post.findMany({ take: 10 });
    return res.status(200).json({ message: "get-posts", data: posts });
  }

  public async createPost(_req: Request, res: Response) {
    await prisma.post.create({
      data: {
        title: faker.hacker.phrase(),
        body: faker.lorem.paragraphs(10),
        authorId: faker.string.uuid(),
      },
    });
    return res.status(200).json({ message: "create-post" });
  }

  public async deletePost(req: Request, res: Response) {
    const postId = req.params.id;
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return res.status(200).json({ message: "delete-post" });
  }

  public async updatePost(req: Request, res: Response) {
    const postId = req.params.id;
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: faker.hacker.phrase(),
        body: faker.lorem.paragraphs(10),
      },
    });
    return res.status(200).json({ message: "update-post" });
  }
}

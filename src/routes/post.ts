import { Router } from "express";
import { PostController } from "../controller/postController";
import type { Routes } from "../interface";

export class PostRoute implements Routes {
  public router = Router();
  public post = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/get-posts", this.post.getPosts);
    this.router.post("/create-post", this.post.createPost);
    this.router.post("/delete-post/:id", this.post.deletePost);
    this.router.post("/update-post/:id", this.post.updatePost);
  }
}

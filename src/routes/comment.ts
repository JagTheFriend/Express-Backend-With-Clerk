import { Router } from "express";
import { CommentController } from "../controller/commentController";
import type { Routes } from "../interface";

export class CommentRoute implements Routes {
  public router = Router();
  public comment = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/get-comments/:id", this.comment.getComments);
    this.router.post("/create-comment", this.comment.createComment);
    this.router.post("/delete-comment", this.comment.deleteComment);
    this.router.post("/update-comment", this.comment.updateComment);
  }
}

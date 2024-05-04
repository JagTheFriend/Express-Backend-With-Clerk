import { Router } from "express";
import type { Routes } from "../interface";

export class CommentRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/create-comment");
    this.router.post("/delete-comment/:id");
    this.router.post("/update-comment/:id");
  }
}

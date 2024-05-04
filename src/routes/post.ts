import { Router } from "express";
import type { Routes } from "../interface";

export class PostRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/get-posts");
    this.router.post("/create-post");
    this.router.post("/delete-post/:id");
    this.router.post("/update-post/:id");
  }
}

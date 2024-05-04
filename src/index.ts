import {
  ClerkExpressRequireAuth,
  type RequireAuthProp,
} from "@clerk/clerk-sdk-node";
import cors from "cors";
import "dotenv/config"; // To read CLERK_SECRET_KEY
import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";

const port = process.env.PORT || 3000;
const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

app.post("/create-post", (req: Request, res: Response) => {
  res.status(201).json({ message: "Post created!" });
});

app.get("/get-post/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Post retrieved!" });
});

app.post("/update-post/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Post updated!" });
});

app.delete("/delete-post/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Post deleted!" });
});

app.get("/get-post-comments/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Comment retrieved!" });
});

app.post("/create-comment", (req: Request, res: Response) => {
  res.status(200).json({ message: "Comment created!" });
});

app.post("/update-comment/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Comment updated!" });
});

app.delete("/delete-comment/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Comment deleted!" });
});

app.use(ClerkExpressRequireAuth());

// Use the strict middleware that raises an error when unauthenticated
app.get("/protected-route", (req: RequireAuthProp<Request>, res: Response) => {
  res.json(req.auth);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(401).json({ message: "Unauthenticated!" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

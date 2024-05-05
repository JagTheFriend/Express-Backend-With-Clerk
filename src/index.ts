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
import { CommentRoute } from "./routes/comment";
import { PostRoute } from "./routes/post";

const port = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(ClerkExpressRequireAuth());

const routes = [new PostRoute(), new CommentRoute()];
for (const route of routes) {
  app.use("/", route.router);
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

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

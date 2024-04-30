import express from "express";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

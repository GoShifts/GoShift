import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("success");
});

const port = 8000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

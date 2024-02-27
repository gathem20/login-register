import express from "express";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

const users = [];
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => email == data.email);
    if (findUser) {
      res.status(400).send("the user name and password cannot be used !");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashPassword });
    res.status(201).send("Seccessfully!");
    console.log(users);
  } catch {
    res.status(500).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find((data) => email == data.email);
    if (!findUser) {
      res.status(400).send("wrong email or password!");
    }
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (passwordMatch) {
      res.status(200).send("Logged in successfully!");
    } else {
      res.status(400).send("wrong email or password!");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(port, () => {
  console.log("server started on port 3000");
});

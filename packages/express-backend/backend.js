import express from "express";
import cors from "cors";
import userServices from "./user-services.js"; 
import bcrypt from 'bcrypt'
const app = express();
const port = 8000;

const loginData = []

app.use(cors());

app.use(express.json());



app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("Sign up email:", email);
    const existingUser = await userServices.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).send("User already exists");
    }
    const createdUser = await userServices.addUser({ email, password });
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error during registration");
  }
});


app.post("/login", async (req, res) => {
  try{
    const {username: email, password} = req.body;
  
  // Debug statements
  console.log("Received username: ", username)
  console.log("Received Password: ", password)
  
  const createdUser = await userServices.findUserByEmail({email});
  if (!createdUser){
    return res.status(404).send("User not in the database");
  }
  const isFound = await bcrypt.compare(password, user.password);
  if (!isFound) {
    return res.status(401).send("Not valid")
  }

  res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

app.get("/login", async (req, res) => {
  res.json(loginData)
});


/* NOTE: These functions aren't being used but we might want them later

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null){
    res.status(404).send("Resource not found.");
  } else {
    res.send({users_list: result});
 }
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const userToDelete =  await userServices.findUserById(id);
  if (userToDelete === undefined || userToDelete === null){
    res.status(404).send("User not found.");
  } else {
    const deletedUser = await userServices.deleteUser(id)
    if (deletedUser) res.status(204).send("User deleted.")
  }
});
*/

app.get("/", (req, res) => {
  res.send("Add /login to this URL for a list of usernames and passwords!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

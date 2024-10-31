import express from "express";
import cors from "cors";
import userServices from "./user-services.js"; //Might use this later

const app = express();
const port = 8000;

const loginData = []

app.use(cors());

app.use(express.json());

app.post("/login", async (req, res) => {
  const {username, password} = req.body;

  // Debug statements
  console.log("Received username: ", username)
  console.log("Received Password: ", password)
  
  const newUser = { username, password, timestamp: new Date()}; 
  loginData.push(newUser)
  if (newUser) res.status(201).send(loginData);
  else res.status(500).end();
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

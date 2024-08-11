//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Users/routes.js
import * as dao from "./dao.js";
let currentUser = null; //global variable to store the current user


export default function UserRoutes(app) {
  //create a new user
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  
  //delete a user
  const deleteUser = async (req, res) => { 
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  //find all users
  const findAllUsers = async (req, res) => {
    const { role,name  } = req.query;
    if (role) {
    const users = await dao.findUsersByRole(role);
    res.json(users);
    return;
  }
  if (name) {
    const users = await 
      dao.findUsersByPartialName(name);
    res.json(users);
    return;
  }
    const users = await dao.findAllUsers();
    res.json(users);
    //return;
  };

  //find a user by id
  const findUserById = async (req, res) => { 
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.json(user);
  };

  //update a user
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await
      dao.updateUser(userId, req.body);
    res.json(status);
  };

  //sign up new user
  const signup = async (req, res) => { };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    currentUser = await dao.findUserByCredentials(username, password);
    res.json(currentUser);
};
  const signout = (req, res) => { };
  const profile = async (req, res) => { };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

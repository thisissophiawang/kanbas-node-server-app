//Users/sophiawang/2024/summer/webdev/su2/kanbas-node-server-app/Users/routes.js
import * as dao from "./dao.js";
//let currentUser = null; 


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
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  //sign in user
  const signin = async (req, res) => {
    console.log("signin");
    console.log(req.body);
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    console.log(currentUser)    
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later. From server" });
    }
};

  //sign out user
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };


  //get the current user profile
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };


  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  //app.get("/api/users/profile", profile);
  app.get("/api/users/:userId", findUserById);

}

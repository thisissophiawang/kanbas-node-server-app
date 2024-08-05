const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const moduleObj = {
  id: 101,
  name: "Web Development",
  description: "Learning to build web applications using modern frameworks",
  course: "CS50",
};

let todos = [
  { id: 1, title: "Task 1", completed: false, description: "This is task 1" },
  { id: 2, title: "Task 2", completed: true, description: "This is task 2" },
  { id: 3, title: "Task 3", completed: false, description: "This is task 3" },
  { id: 4, title: "Task 4", completed: true, description: "This is task 4" },
];

const Lab5 = (app) => {
  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });

  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  // Ensure this DELETE endpoint is correct and available
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });

  app.put("/labs/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    res.sendStatus(200);
  });

  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === 'true';
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/a5/assignment/title", (req, res) => {
    res.send(assignment.title);
  });

  app.get("/lab5/module", (req, res) => {
    res.json(moduleObj);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.send(moduleObj.name);
  });

  app.get("/lab5/module/update/:newName", (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  });

  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5!!");
  });

  app.get("/lab5/hello", (req, res) => {
    res.send("Hello World!");
  });

  // Home endpoint
  app.get("/lab5", (req, res) => {
    res.send("Welcome to Lab 5!!");
  });

  app.get("/lab5/add/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`);
  });

  app.get("/lab5/subtract/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const difference = a - b;
    res.send(`The difference between ${a} and ${b} is ${difference}`);
  });

  app.get("/a5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });

  app.post("/a5/todos", (req, res) => {
    const { title, completed } = req.body;
    const newTodo = { id: new Date().getTime(), title, completed };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.put("/labs/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.map(t => t.id === parseInt(id) ? { ...t, ...req.body } : t);
    res.sendStatus(200);
  });
};

export default Lab5;

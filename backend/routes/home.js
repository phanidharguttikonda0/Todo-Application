const { Router } = require("express");
const router = Router();
const TodoApp = require("../db/Todos");
const {
  todoCheck,
  authorizationCheck,
  usernameCheck,
  ObjecIdCheck,
} = require("../middleware/Todos");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  return res.json({ users: await TodoApp.find({}) });
});

router.post(
  "/add-todo",
  todoCheck,
  authorizationCheck,
  usernameCheck,
  async (req, res) => {
    try {
      const result = await TodoApp.findOneAndUpdate(
        { username: req.username },
        {
          $push: {
            todos: {
              title: req.body.title,
              description: req.body.description,
            },
          },
        },
        {
          new: true,
          projection: { todos: { $slice: -1 } }, // returns the newly added document
        }, // This ensures the updated document is returned
      );
      console.log(`Newly added document was ${result}`);
      if (result !== null)
        return res
          .status(201)
          .json({ message: "sucessfully added", value: result });
    } catch (err) {
      return res.json({ message: "Internal Server Error", value: false });
    }

    return res.json({
      message: "something weird happend check the code",
      value: false,
    });
  },
);

router.post(
  "/start-todo/:todoId",
  authorizationCheck,
  usernameCheck,
  ObjecIdCheck,
  async (req, res, next) => {
    // here we are going to check whether the todo was in the status not started
    const result = await TodoApp.findOne(
      { username: req.username, "todos._id": req.params.todoId },
      { "todos.$": 1 },
    );
    console.log(result);
    if (result === null)
      return res.json({ message: "todo not found to start", value: false });
    if (result.todos[0].startTime === null) return next();
    return res.json({ message: "Already the todo was started", value: false });
  },
  async (req, res) => {
    // here we are going to add the start time and change status to Doing
    try {
      const time = Date.now().toLocaleString().replaceAll(",", "");
      const result = await TodoApp.updateOne(
        { username: req.username, "todos._id": req.params.todoId },
        {
          $set: {
            "todos.$.startTime": Number(time),
            "todos.$.status": "Doing",
          },
        },
      );
      if (result.modifiedCount === 0)
        return res.json({ message: "Not updated due to error", value: false });
      return res
        .status(201)
        .json({ message: "Started the Time", value: Number(time) });
    } catch (err) {
      console.log(`The error was ${err}`);
      return res.json({ message: "Internal Server Error" });
    }
  },
);

router.get(
  "/current-todos",
  authorizationCheck,
  usernameCheck,
  async (req, res) => {
    try {
      const result = await TodoApp.findOne(
        { username: req.username },
        {
          todos: {
            $filter: {
              input: "$todos",
              as: "todo",
              cond: { $ne: ["$$todo.status", "Done"] },
            },
          },
        },
      );

      console.log(result.todos);
      const doingTodos = [];
      const pendingTodos = [];

      result.todos.map((element) => {
        if (element.status === "Doing")
          doingTodos.push({
            title: element.title,
            status: element.status,
            _id: element._id,
          });
        else
          pendingTodos.push({
            title: element.title,
            status: element.status,
            _id: element._id,
          });
      });

      res.status(200).json({
        message: "got it",
        value: { doingTodos: doingTodos, pendingTodos: pendingTodos },
      });
    } catch (err) {
      console.log(`The error was ${err}`);
      return res.json({ message: "internal server error", value: false });
    }
  },
);

router.get(
  "/todo/:todoId",
  authorizationCheck,
  usernameCheck,
  ObjecIdCheck,
  async (req, res) => {
    try {
      const result = await TodoApp.findOne(
        { username: req.username, "todos._id": req.params.todoId },
        { todos: { $elemMatch: { _id: req.params.todoId } }, _id: 0 },
      );

      if (result && result.todos.length > 0) {
        return res.status(200).json({
          message: "Todo found",
          value: {
            description: result.todos[0].description,
            startTime: result.todos[0].startTime,
            endTime: result.todos[0].endTime,
          },
        });
      } else {
        return res.json({ message: "Todo not found" });
      }
    } catch (err) {
      console.log(`The error was ${err}`);
      return res.json({ message: "Internal server Error" });
    }
  },
);

router.get(
  "/completed-todos",
  authorizationCheck,
  usernameCheck,
  async (req, res) => {
    try {
      const result = await TodoApp.findOne(
        { username: req.username },
        {
          todos: {
            $filter: {
              input: "$todos",
              as: "todo",
              cond: { $eq: ["$$todo.status", "Done"] },
            },
          },
        },
      );

      console.log(result);

      const completedTodos = result.todos.map((element) => ({
        title: element.title,
      })); // as status is done there is no need to pass it

      res.status(200).json({ message: "got it", value: completedTodos });
    } catch (err) {
      console.log(`The error was ${err}`);
      return res.json({ message: "internal server error", value: false });
    }
  },
);

router.delete(
  "/delete-todo/:todoId",
  authorizationCheck,
  usernameCheck,
  ObjecIdCheck,
  async (req, res) => {
    try {
      const result = await TodoApp.updateOne(
        { username: req.username, "todos._id": req.params.todoId },
        {
          $pull: { todos: { _id: req.params.todoId } },
        },
      );
      if (result.modifiedCount === 0)
        return res.json({ message: "todo item not found", value: false });
      return res
        .status(200)
        .json({ message: "sucessfully deleted", value: true });
    } catch (err) {
      console.log(`The error was ${err}`);
      return res.json({ message: "Internal Server Error", value: false });
    }
  },
);

router.patch(
  "/update-todo/:todoId",
  authorizationCheck,
  usernameCheck,
  ObjecIdCheck,
  async (req, res, next) => {
    // we need to check whether the todo id has status not started yet or not
    try {
      const result = await TodoApp.findOne(
        { username: req.username, "todos._id": req.params.todoId },
        { "todos.$": 1 },
      );
      if (result.todos[0].status !== "not yet started") {
        return res.json({
          message: "not applicable to update this task",
          value: false,
        });
      }
      return next();
    } catch (err) {
      console.log(`Error was ${err}`);
      return res.json({ message: "Internal Server Error", value: false });
    }
  },
  todoCheck,
  async (req, res) => {
    // note : we need to send both the title and description , if user has changed only one
    // then the client need to pass the same description
    try {
      const result = await TodoApp.updateOne(
        { username: req.username, "todos._id": req.params.todoId },
        {
          $set: {
            "todos.$.title": req.body.title,
            "todos.$.description": req.body.description,
          },
        },
      );
      if (result.modifiedCount === 0)
        return res.json({
          message: "not updated due to some error",
          value: false,
        });
      return res
        .status(201)
        .json({ message: "sucessfully updated", value: true });
    } catch (err) {
      console.log(`error was ${err}`);
      return res.json({ message: "Internal Server Error", value: false });
    }
  },
);

router.post(
  "/mark-as-done/:todoId",
  authorizationCheck,
  usernameCheck,
  ObjecIdCheck,
  async (req, res, next) => {
    const result = await TodoApp.findOne(
      { username: req.username, "todos._id": req.params.todoId },
      { "todos.$": 1 },
    );
    if (
      result &&
      result.todos[0].startTime !== null &&
      result.todos[0].endTime === null
    ) {
      return next();
    }
    return res.json({ message: "you can't mark it as done", value: false });
  },
  async (req, res) => {
    // here we are going to add the endDate and change status to Done
    try {
      console.log(1);
      const time = Date.now().toLocaleString().replaceAll(",", "");
      const result = await TodoApp.updateOne(
        { username: req.username, "todos._id": req.params.todoId },
        {
          $set: {
            "todos.$.endTime": Number(time),
            "todos.$.status": "Done",
          },
        },
      );
      if (result.modifiedCount === 0)
        return res.json({ message: "not updated", value: false });
      return res
        .status(201)
        .json({ message: "Sucessfully marked as done", value: Number(time) });
    } catch (err) {
      console.log(`The error was ${err}`);
      return res.json({ message: "Internal Server Error", value: false });
    }
  },
);

module.exports = router;

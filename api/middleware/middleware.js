const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const timeStamp = new Date().toLocaleString();
  console.log(`${method} to '${url}' at ${timeStamp}`);
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then((isValidUser) => {
      if (isValidUser) {
        req.user = isValidUser;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  if (
    !req.body.name ||
    typeof req.body.name !== "string" ||
    !req.body.name.trim()
  ) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text || !req.body.text.trim()) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost };

const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now());
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById()
    .then((isValid) => {
      console.log(isValid);
      if (isValid) {
        req.user = isValid;
        next();
      } else {
        next({ message: "user not found", status: 404 });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost };

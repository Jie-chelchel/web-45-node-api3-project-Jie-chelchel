const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const router = express.Router();
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {});
});

router.put("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something went wrong!",
  });
});

module.exports = router;

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
      res.json(user);
    })
    .catch((err) => {});
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body).then((user) => {
    res.json(user);
  });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id).then((record) => {
    res.json(req.user);
  });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id).then((posts) => res.json(posts));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Posts.update(req.params.id, req.body).then((change) => {
    res.json(req.body);
  });
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something went wrong!",
  });
});

module.exports = router;

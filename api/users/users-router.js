const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const router = express.Router();
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

router.get("/", (req, res, next) => {
  Users.get()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:id", validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then((record) => {
      res.json(req.user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) => {
      next(err);
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  Posts.update(req.params.id, req.body)
    .then((record) => {
      Posts.insert({ ...req.body, user_id: req.params.id }).then((newPost) =>
        res.json(newPost)
      );
    })
    .catch((err) => {
      next(err);
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

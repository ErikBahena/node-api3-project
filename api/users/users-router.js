const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const UsersModel = require("./users-model");
const PostsModel = require("../posts/posts-model");

// The middleware functions also need to be required
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  UsersModel.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "couldn't get all the users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res) => {
  UsersModel.insert(req.body)
    .then((newUser) => res.status(201).json(newUser))
    .catch(() => {
      res
        .status(500)
        .json({ message: "couldn't save new user to the database" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  UsersModel.update(req.params.id, req.body)
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch(() => {
      res
        .status(500)
        .json({ message: "couldn't update the information on the database" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  UsersModel.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(() =>
      res.status(500).json({ messag: "couldn't remove from database" })
    );
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

  UsersModel.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() =>
      res.json({ message: "couldn't get user posts from database" })
    );
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  PostsModel.insert(req.body).then((newPost) => {
    res.status(200).json(newPost);
  });
});

// do not forget to export the router

module.exports = router;

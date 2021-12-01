const { getById } = require("../users/users-model");

function logger(req, res, next) {
  console.log(req.method, req.path, req.timestamp);
  next();
}

async function validateUserId(req, res, next) {
  const user = await getById(req.params.id);

  if (user) {
    req.user = user;
    next();
  }

  if (!user) res.status(404).json({ message: "user not found" });
}

function validateUser(req, res, next) {
  if (!req.body.name || !req.body.name.trim()) {
    res.status(400).json({ message: "missing required name field" });
  }

  if (req.body.name.trim()) next();
}

function validatePost(req, res, next) {
  if (!req.body.text || !req.body.text.trim()) {
    res.status(400).json({ message: "missing required text field" });
  }

  if (req.body.text.trim()) next();
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };

const router = require("express").Router();

const { login } = require("../controllers/authController");
const { checkBody } = require("../utils/helpers");

router.post("/login", checkBody(["email"]), login);

module.exports = router;

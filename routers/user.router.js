const { Router } = require("express");
const router = Router();

const { home, signup, signin } = require("../controllers/user.controller");

router.get("/", home);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;

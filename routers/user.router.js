const { Router } = require("express");
const router = Router();

const { home, signup } = require("../controllers/user.controller");

router.get("/", home);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;

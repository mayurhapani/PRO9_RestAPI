const { Router } = require("express");
const router = Router();

const { getUser, signup, signin, deleteUser } = require("../controllers/user.controller");

router.get("/getUser", getUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/deleteUser/:id", deleteUser);

module.exports = router;

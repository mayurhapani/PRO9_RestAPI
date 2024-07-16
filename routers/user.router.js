const { Router } = require("express");
const router = Router();

const { getUser, signup, signin, editUser, deleteUser } = require("../controllers/user.controller");

router.get("/getUser", getUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/editUser/:id", editUser);
router.get("/deleteUser/:id", deleteUser);

module.exports = router;

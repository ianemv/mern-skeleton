import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();
router.route("/api/users").get(userCtrl.list)
router.route("/api/users").post(userCtrl.create);
router.route("/api/users/:userId")
		.get(authCtrl.requireSignin, userCtrl.read)
		.put(authCtrl.requireSignin, userCtrl.update)
		.delete(authCtrl.requireSignin, userCtrl.remove);
router.param('userId', userCtrl.userByID);

const app = express();

export default router;

const { Router } = require("express");
const {
  GetUser,
  Signup,
  Login,
  deleteUser,
} = require("../controller/user.controller");
const { decode } = require("../middlewares/decodeJwt");
const userRouter = Router();

userRouter.get("/", GetUser);
userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.delete("/:id", decode, isSuperAdmin, deleteUser);
module.exports = { userRouter };
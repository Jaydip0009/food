const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../model/user')

const Signup = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
        return res.status(403).json({ msg: "user already registered" });
    } else {
        let hash = await bcrypt.hash(password, 10);
        req.body.password = hash;
        user = await User.create(req.body);
        let data = {
            email: user.email,
            id: user.id,
            role: user.role,
            username: user.username,
        };
        let token = await jwt.sign(data, "private-key");
        return res.status(201).json({
            msg: "user created",
            token: token,
        });
    };
}
const Login = async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: "user not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(404).json({ msg: "invalid password " });
    }
    let data = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
        isActive: user.isActive,
    };
    let token = await jwt.sign(data, "private-key");
    return res.status(200).json({
        msg: "user loggedIn",
        token: token,
    });
};

const GetUser = async (req, res) => {
    let users = await User.find();
    res.status(200).json(users);
};

const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let user = await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "user deleted", user });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ msg: "error deleting user", error });
    }
};

module.exports = { Signup, Login, GetUser, deleteUser };
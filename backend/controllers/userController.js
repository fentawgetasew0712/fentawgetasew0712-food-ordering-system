import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import { Op } from "sequelize";

// login user
const loginUser = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await userModel.findOne({
            where: {
                [Op.or]: [{ email: identifier }, { username: identifier }]
            }
        });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user.id); // In Sequelize id is usually used unless specified
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res) => {
    const { username, firstName, lastName, email, password, phone, address } = req.body;
    try {
        const emailExists = await userModel.findOne({ where: { email } });
        if (emailExists) {
            return res.json({ success: false, message: "Email already exists" })
        }

        const usernameExists = await userModel.findOne({ where: { username } });
        if (usernameExists) {
            return res.json({ success: false, message: "Username already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address,
            cartData: {}
        });

        const token = createToken(user.id)
        res.json({ success: true, token });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// get user profile
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findByPk(req.body.userId, {
            attributes: { exclude: ['password'] }
        });
        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// update user profile
const updateProfile = async (req, res) => {
    const { firstName, lastName, phone, address } = req.body;
    try {
        await userModel.update({
            firstName,
            lastName,
            phone,
            address
        }, {
            where: { id: req.body.userId }
        });
        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// change password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await userModel.findByPk(req.body.userId);
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Old password does not match" });
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "New password should be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userModel.update({ password: hashedPassword }, {
            where: { id: req.body.userId }
        });
        res.json({ success: true, message: "Password Changed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { loginUser, registerUser, getProfile, updateProfile, changePassword }

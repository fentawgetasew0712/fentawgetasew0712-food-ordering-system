import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

// login user
const loginUser = async (req, res) => {
    const { identifier, password } = req.body; // identifier can be email or username
    try {
        const user = await userModel.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id);
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
        // checking if user already exists
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
            return res.json({ success: false, message: "Email already exists" })
        }

        const usernameExists = await userModel.findOne({ username });
        if (usernameExists) {
            return res.json({ success: false, message: "Username already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }

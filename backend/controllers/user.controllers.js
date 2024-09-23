import userModel from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    let userFound;

    try {
        userFound = await userModel.findOne({ userName });
    } catch (error) {
        console.log(error.message);
    }

    if (userFound === null) {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({ userName, email, password: hashPassword });
            await newUser.save();

            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ "message": "Error while registering user" });
        }
    }

    res.status(400).json({ "message": "Username already taken" });

}

export const loginUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const userDoc = await userModel.findOne({ userName });
        if (userDoc !== null) {
            const passOK = await bcrypt.compare(password, userDoc.password);
            if (passOK) {

                jwt.sign({ userName, id: userDoc._id }, process.env.SECRET, {}, (err, token) => {
                    if (err) {
                        console.log(err.message);
                    }
                    res.status(200).cookie('token', token).json({ id: userDoc._id, userName: userDoc.userName });
                })
            } else {
                res.status(400).json({ "message": "incorrect password" });
            }
        } else {
            res.status(400).json({ "message": "username not found!" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "message": "user not found" });
    }
}

export const validateProfile = (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.SECRET, {}, (err, info) => {
        if (err) console.log(err.message);

        res.json(info);
    })
}

export const logout = (req, res) => {
    res.cookie('token', '').json("ok");
}
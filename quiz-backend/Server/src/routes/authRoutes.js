import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken, generateJwtToken, generateRefreshToken } from '../middleware/authMiddleware.js';
// import { userRegistrationSchema } from '../schemas/user.schema.js';
import { User } from '../models/user.model.js';
// import sendMail from '../utils/email.js'; 
import dotenv from "dotenv";

dotenv.config();

const app = express();
const router = express.Router();
app.use(bodyParser.json());

const signUpQue = [];
let signUpIsLocked = false;
let currentSignUp = [];

router.post('/signup', async (req, res) => {
    res.clearCookie("G_ENABLED_IDPS");
    const userReq = req.body
    if (signUpIsLocked) {
            signUpQue.push(userReq);
    }
    else{
        signUpIsLocked = true;
        currentSignUp.push(userReq);
        const result = await signUp(userReq);
        res.json(result);
    }

    while (signUpQue.length > 0) {
        const next_data = signUpQue.shift();
        const result_qued = await signUp(next_data);
        res.json(result_qued);
    }

    signUpIsLocked = false;

    
    async function signUp(userData){
        try {
            // const userData = userRegistrationSchema.parse(req.body);
            const existingUser = await User.findOne({ email: userData.lMail });
    
            if (Object.values(userData).includes("")) {
                return { err: "Fill all details" };
            }
    
            else if (existingUser) {
                return { err: 'email already has an account associated with it, please login' };
            }
    
            else{
                const hash = await bcrypt.hash(userData.lPassword, 10);

                const newUser = await User.create({
                    username: userData.lName,
                    email: userData.lMail,
                    password: hash,
                });

        
                // await sendMail(userData.lName, userData.lMail);
    
                return { redirect: 'login' };
    
            }
    
        }
        catch (error) {
            console.error('Signup error:', error);
            res.status(400).json({ error: error.errors || 'Invalid data' });
        }
    }
});


router.post('/login', async (req, res) => {
    res.clearCookie("G_ENABLED_IDPS");

    try {
        // const userData = userLoginSchema.parse(req.body);
        const userData = req.body;

        const user = await User.findOne({ email: userData.email });

        // Empty field check
        if (Object.values(userData).includes("")) {
            return res.json({ err: "Fill all details" });
        }

        // No user or team found
        else if (!user ) {
            return res.json({ err: "Invalid Details" });
        }

        else{
            bcrypt.compare(userData.password, user.password, (err, result) => {
                if (result) {
                    const accessToken = generateJwtToken({ _id: user._id });
                    const refreshToken = generateRefreshToken({ _id: user._id });
                    res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" });
                    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });
                    res.json({ redirect: "quiz" });
    
                } else {
                    console.error(err);
                    res.json({ err: "Invalid Details" });
                }
            });
        }

        // Password comparison
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ error: error.errors || 'Invalid data' });
    }
    
});

router.get("/checkAuth", authenticateToken, (req, res) => {
    res.json({ authenticated: true });
});

router.post("/logout", (req, res) => {
    // Clear the authentication token or session here
    // For example, if you are using JWT tokens, you can clear the token from the client-side by deleting the cookie
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logout successful" });
    
});

export default router;
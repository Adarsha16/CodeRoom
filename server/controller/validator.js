import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

import bcrypt from "bcryptjs";

/////////Comparing with regex only///////
const emailValidation = (email) => {

    try {

        if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            return true;
        } else {
            return false;
        }

    } catch (error) {

        console.log("Internal Server Error : Email Validation process", error)

    }
}

///////////Creating JWT token////////

const createJWT = (user) => {

    return jwt.sign(


        //payload
        {
            username: user.username,
            email: user.email,
            github: user.github
        },
        //secret key
        process.env.JWT_SECRET,
        //lifetime
        {
            expiresIn: process.env.JWT_LIFETIME
        }

    )
};



///////////////Hashing password for register///////////////////

const bcryptHash = async (password) => {


    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);

}

////////////Password verify for login ////////////////////////

const verifyBcryptHash = async (password, password_hash) => {

    return await bcrypt.compare(password, password_hash);
}





export { emailValidation, createJWT, bcryptHash, verifyBcryptHash };
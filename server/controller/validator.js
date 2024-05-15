import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

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


export { emailValidation, createJWT };
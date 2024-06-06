
import jwt from "jsonwebtoken"

const authentication = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization || req.headers.Authorization;

        const token = authHeader?.startsWith('Bearer') && authHeader.split(" ")[1];

        if (!token) {
            res.status(403).json({ "Error": "No token provided" })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload) {
            res.status(400).json({ "error : ": "Internal server error, cannot get payload || Bad Token Provided" });
        }

        req.user = payload;
        next();

    } catch (error) {

        console.log(error);

    }

}

export { authentication }
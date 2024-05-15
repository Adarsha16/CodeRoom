
import jwt from "jsonwebtoken"

const authentication = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        const token = authHeader?.startsWith('Bearer') && authHeader.split(" ")[1];

        if (!token) {
            res.status(403).json({ "Error": "Bad token provided" })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload) {
            res.status(400).json({ "error : ": "Internal server error, cannot get payload" });
        }

        console.log("payload from middleware", payload);

        req.user = payload;
        next();

    } catch (error) {

        console.log(error);

    }

}

export { authentication }
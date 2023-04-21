import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "access_token", (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid token",
                });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
}

export default authenticate;
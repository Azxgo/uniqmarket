import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return next();

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next();
        req.user = {username: decoded.username};
        next();
    })
}

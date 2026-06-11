import { v4 as uuidv4 } from "uuid";

export const cartSessionMiddleware = (req, res, next) => {
    if (req.user) {
        req.cartSessionId = null;
        return next();
    }

    let sessionId = req.cookies.cart_session_id;

    if (!sessionId) {
        sessionId = uuidv4();

        res.cookie("cart_session_id", sessionId, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
    }

    req.cartSessionId = sessionId;

    next();
};
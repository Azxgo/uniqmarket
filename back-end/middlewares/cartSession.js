import {v4 as uuidv4} from "uuid"

export const cartSessionMiddleware = (req, res, next) => {
    if (!req.cookies.cart_session_id && !req.user) {
        const sessionId = uuidv4();
        res.cookie("cart_session_id", sessionId, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "strict"
        });
        req.cartSessionId = sessionId;
    } else {
        req.cartSessionId = req.cookies.cart_session_id;
    }
    next();
}
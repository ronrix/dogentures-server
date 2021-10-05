import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";
import { sendRefreshToken, createRefreshToken } from "../auth";

export const refreshToken = async (req: Request, res: Response) => {
    //  instead of using req.header.cookies we can install cookieParser to get the cookie pretty easily [req.cookies]
    //  so instead of this doing on the below we can just do this
    // req.cookies
    const token = req.headers.cookie?.split("=")[1];

    console.log(token);

    // 407: authentication is required
    if (!token)
        return res.status(407).json({ ok: false, msg: "not authenticated" });

    let payload: any = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
        // 401: not authenticated
        return res.json(401).json({ ok: false, msg: error });
    }

    // get the user from the token, and update the tokenVersion to invalidate the old tokens
    const user = await User.findOne({ id: payload?.userId });
    // 404: user not found
    if (!user)
        return res
            .json(404)
            .json({ ok: false, msg: "no user found with token" });

    if (user.tokenVersion !== payload.tokenVersion) {
        // 401: token version not authenticated
        return res.status(401).json({ ok: false, msg: "not authenticated" });
    }

    // refresh the refresh token
    sendRefreshToken(res, createRefreshToken(user));

    // on success
    // send the refresh token, might get stored on localStorage on the client side
    return res.json({ okay: true, accessToken: token });
};

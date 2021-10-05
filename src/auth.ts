import { Response } from "express"; // a type
import { sign } from "jsonwebtoken"; // sign > for token, (data for payload, secret, {options: expiration and etc })
import { Profile } from "./entity/Profile"; 
import { User } from "./entity/User";
//import { ObjectId } from "mongodb";

export const createAccessToken = (user: Profile | any) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1d",
    });
};

export const createRefreshToken = (user: User) => {
    return sign({ userId: user?.id },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d",
        });
};

export const sendRefreshToken = (res: Response, token: string) => {
    return res.cookie("session-auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    });
};

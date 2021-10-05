import { verify } from "jsonwebtoken"; // verify > (token: from cookie, secret)
import { MiddlewareFn } from "type-graphql";
import { Context } from "./Context";
import { Profile } from "./entity/Profile";

import {getRepository} from 'typeorm';
//import {ObjectId} from 'mongodb';

//
export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
    // repository entity
 //   const profileEntity = getRepository(Profile);

    const authorization = context.req.headers["authorization"];
    const cookie = context.req.cookies["some_cookie_name"];

    if (!authorization && !cookie) {
        throw new Error("not authenticated");
    }

    const token = authorization!.split(" ")[1];

    try {
        // get authorization: bearer token
        if(authorization && token !== 'null') {
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

            const users = await getRepository(Profile).find(); 

            let exists = false;

            users.forEach(user => {
                if(String(user.id) === String(payload?.userId)) exists = true;
            });

            if (!exists) throw "not authenticated";
            context.payload = payload as any;

        } else {
            throw "no access token";
        }

        if(cookie){
                const payload: any = verify(cookie, process.env.REFRESH_TOKEN_SECRET!);
                const users = await Profile.find(); 

                let exists = false;

                users.forEach(user => {
                    if(String(user.id) === String(payload?.userId)) exists = true;
                });

                if (!exists) throw "not authenticated";
                context.payload = payload as any;
        }

    } catch(error) {
        console.log("error: ", error);
        return error;
    }

    // go onto the next middleware or in our case query
    return next();
};

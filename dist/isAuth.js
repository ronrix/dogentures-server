"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Profile_1 = require("./entity/Profile");
const typeorm_1 = require("typeorm");
const isAuth = async ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    const cookie = context.req.cookies["some_cookie_name"];
    if (!authorization && !cookie) {
        throw new Error("not authenticated");
    }
    const token = authorization.split(" ")[1];
    try {
        if (authorization && token !== 'null') {
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const users = await typeorm_1.getRepository(Profile_1.Profile).find();
            let exists = false;
            users.forEach(user => {
                if (String(user.id) === String(payload === null || payload === void 0 ? void 0 : payload.userId))
                    exists = true;
            });
            if (!exists)
                throw "not authenticated";
            context.payload = payload;
        }
        else {
            throw "no access token";
        }
        if (cookie) {
            const payload = jsonwebtoken_1.verify(cookie, process.env.REFRESH_TOKEN_SECRET);
            const users = await Profile_1.Profile.find();
            let exists = false;
            users.forEach(user => {
                if (String(user.id) === String(payload === null || payload === void 0 ? void 0 : payload.userId))
                    exists = true;
            });
            if (!exists)
                throw "not authenticated";
            context.payload = payload;
        }
    }
    catch (error) {
        console.log("error: ", error);
        return error;
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map
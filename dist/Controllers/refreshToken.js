"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entity/User");
const auth_1 = require("../auth");
const refreshToken = async (req, res) => {
    var _a;
    const token = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1];
    console.log(token);
    if (!token)
        return res.status(407).json({ ok: false, msg: "not authenticated" });
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        return res.json(401).json({ ok: false, msg: error });
    }
    const user = await User_1.User.findOne({ id: payload === null || payload === void 0 ? void 0 : payload.userId });
    if (!user)
        return res
            .json(404)
            .json({ ok: false, msg: "no user found with token" });
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json({ ok: false, msg: "not authenticated" });
    }
    auth_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
    return res.json({ okay: true, accessToken: token });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=refreshToken.js.map
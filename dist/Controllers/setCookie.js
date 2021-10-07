"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = exports.setCookie = void 0;
const setCookie = (req, res) => {
    console.log(req.cookies);
    let options = {
        path: '/',
        maxAge: 1000 * 60 * 15,
        httpOnly: true,
    };
    res.cookie('cookieName', 'cookieValue', options);
    res.send('');
};
exports.setCookie = setCookie;
const getCookie = (req, res) => {
    console.log(req.cookies);
    res.status(200).json({ "cookie": req.cookies });
};
exports.getCookie = getCookie;
//# sourceMappingURL=setCookie.js.map
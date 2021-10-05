import { Request, Response } from "express";

export const setCookie = (req: Request, res: Response) => {

    // read cookies
    console.log(req.cookies) 

    let options = {
        path: '/',
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        //signed: true // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('cookieName', 'cookieValue', options) // options is optional
    res.send('')
}

export const getCookie = (req: Request, res: Response) => {
    console.log(req.cookies);
    res.status(200).json({ "cookie": req.cookies });
}

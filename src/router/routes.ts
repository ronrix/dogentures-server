import express, {Request, Response} from "express";
import {getCookie, setCookie} from '../Controllers/setCookie';
// import multer from "multer";
// import { mkdirSync } from "fs";
// import { updateProfilePhoto } from "../Controllers/updateProfilePhoto";

// import { refreshToken } from "../Controllers/refreshToken";

// // logic to store photo/image of profile
// const profileStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const path = `images/profile/${req.body.user}`;
//         mkdirSync(path, { recursive: true });
//         return cb(null, path);
//     },
//     filename: function (req, file, cb) {
//         const { originalname } = file;
//         const date = Date.now();
//         cb(null, date + "%" + originalname);
//     },
// });

// const profileUpload = multer({ storage: profileStorage });

const router = express.Router();

// router.post("/refresh_token", refreshToken);
// // update profile photo
// router.post(
//     "/uploadProfile",
//     profileUpload.single("profile"),
//     updateProfilePhoto
// );
//
router.get('/', (req: Request,res: Response) => {
    res.send("dogentures");
});
router.get('/set_cookie', setCookie);
router.get('/get_cookie', getCookie);

export default router;

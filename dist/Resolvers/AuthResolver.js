"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const bcryptjs_1 = require("bcryptjs");
const auth_1 = require("../auth");
const LoginResType_1 = require("../ObjecTypes/LoginResType");
const RegisterResType_1 = require("../ObjecTypes/RegisterResType");
const Profile_1 = require("../entity/Profile");
const graphql_upload_1 = require("graphql-upload");
const path_1 = require("path");
const fs_1 = require("fs");
const typeorm_1 = require("typeorm");
let AuthResolver = class AuthResolver {
    constructor() {
        this.userEntity = typeorm_1.getMongoRepository(User_1.User);
        this.profileEntity = typeorm_1.getMongoRepository(Profile_1.Profile);
    }
    async login(email, password, { res }) {
        console.log("logging in");
        const user = await this.userEntity.findOne({ email: email });
        try {
            if (!user)
                throw "invalid user";
            const valid = await bcryptjs_1.compare(password, user.password);
            if (!valid)
                throw "username or password is incorrect";
            await this.profileEntity.update({ id: user.id }, { online: true });
        }
        catch (e) {
            return {
                msg: e,
                ok: false,
            };
        }
        const token = auth_1.createRefreshToken(user);
        res.cookie("session-auth", token, { httpOnly: true });
        const profileToken = await this.profileEntity.findOne({
            name: user.email.split("@")[0],
        });
        console.log(profileToken);
        return {
            accessToken: auth_1.createAccessToken(profileToken),
            ok: true,
        };
    }
    async logout(id) {
        try {
            await this.profileEntity.update({ id }, { online: false });
        }
        catch (err) {
            return false;
        }
        return true;
    }
    async register(email, password, name, bdate, { createReadStream, filename }, { res }) {
        const isAlreadyAUser = await this.userEntity.findOne({ email });
        if (isAlreadyAUser)
            return { ok: false, msg: "email is already in use" };
        const hashedPassword = await bcryptjs_1.hash(password, 12);
        const path = path_1.join(__dirname, `../images/profile/${name}`);
        if (!fs_1.existsSync(path))
            fs_1.mkdirSync(path, { recursive: true });
        let user;
        try {
            await this.userEntity.insert({
                email,
                password: hashedPassword,
            });
            user = await this.userEntity.findOne({ email });
            await new Promise((resolve, reject) => {
                createReadStream()
                    .pipe(fs_1.createWriteStream(path_1.join(__dirname, `../images/profile/${name}/${filename}`)))
                    .on("finish", async () => {
                    await this.profileEntity.insert({
                        name,
                        bdate,
                        user,
                        avatar: filename,
                    });
                    resolve(true);
                })
                    .on("error", () => reject(false));
            });
        }
        catch (err) {
            return res.status(500).json({ ok: false, msg: err });
        }
        res.cookie("session-auth", auth_1.createRefreshToken(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
        });
        const profile = await this.profileEntity.findOne({ name });
        return {
            accessToken: auth_1.createAccessToken(user),
            ok: true,
            avatar: profile === null || profile === void 0 ? void 0 : profile.avatar,
            name: profile === null || profile === void 0 ? void 0 : profile.name,
            online: profile === null || profile === void 0 ? void 0 : profile.online,
        };
    }
};
__decorate([
    type_graphql_1.Mutation(() => LoginResType_1.LoginResponse),
    __param(0, type_graphql_1.Arg("email", () => String)),
    __param(1, type_graphql_1.Arg("password", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => RegisterResType_1.RegisterResponse),
    __param(0, type_graphql_1.Arg("email", () => String)),
    __param(1, type_graphql_1.Arg("password", () => String)),
    __param(2, type_graphql_1.Arg("name", () => String)),
    __param(3, type_graphql_1.Arg("bdate", () => Date)),
    __param(4, type_graphql_1.Arg("file", () => graphql_upload_1.GraphQLUpload)),
    __param(5, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Date, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
AuthResolver = __decorate([
    type_graphql_1.Resolver()
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=AuthResolver.js.map
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
exports.SetCookie = void 0;
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../auth");
const Profile_1 = require("../entity/Profile");
let CookieRes = class CookieRes {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CookieRes.prototype, "cookie", void 0);
CookieRes = __decorate([
    type_graphql_1.ObjectType()
], CookieRes);
let SetCookie = class SetCookie {
    async setCookie({ res }, name) {
        const user = await Profile_1.Profile.findOne({ where: { name: name } });
        const token = auth_1.createRefreshToken(user.user);
        const cookie = res.cookie('session_auth', token, { httpOnly: true });
        return { cookie };
    }
};
__decorate([
    type_graphql_1.Mutation(() => CookieRes),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SetCookie.prototype, "setCookie", null);
SetCookie = __decorate([
    type_graphql_1.Resolver()
], SetCookie);
exports.SetCookie = SetCookie;
//# sourceMappingURL=SetCookie.js.map
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
exports.VerifyToken = void 0;
const type_graphql_1 = require("type-graphql");
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth_1 = require("../isAuth");
let VerifyTokenRes = class VerifyTokenRes {
};
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], VerifyTokenRes.prototype, "ok", void 0);
VerifyTokenRes = __decorate([
    type_graphql_1.ObjectType()
], VerifyTokenRes);
let VerifyToken = class VerifyToken {
    verifyToken(token) {
        try {
            jsonwebtoken_1.verify(String(token), process.env.ACCESS_TOKEN_SECRET);
        }
        catch (e) {
            console.log("error: ", e);
            return { ok: false };
        }
        return { ok: true };
    }
};
__decorate([
    type_graphql_1.Query(() => VerifyTokenRes),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('token', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VerifyToken.prototype, "verifyToken", null);
VerifyToken = __decorate([
    type_graphql_1.Resolver()
], VerifyToken);
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=VerifyToken.js.map